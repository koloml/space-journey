import BaseManager from "@/lib/game/base/BaseManager";
import type Game from "@/lib/game/Game";
import type {SystemsStatusInfo, SystemStatus} from "@/lib/storage/SystemsStatusStore";
import type StorageWrapper from "@/lib/game/stores/StorageWrapper";
import type {ResourcesInfo} from "@/lib/storage/ResourcesStore";

export default class SystemsManager<Key extends keyof SystemsStatusInfo> extends BaseManager<SystemsStatusInfo> {
    private _changes: Partial<SystemsStatusInfo<Partial<SystemStatus>>> = {};

    constructor(game: Game, store: StorageWrapper<SystemsStatusInfo>) {
        super(game);

        this._store = store;
    }

    public get(key: Key): SystemsStatusInfo[Key] {
        return this._store.get(key);
    }

    /**
     * Destroy the selected system.
     * @param key
     */
    public destroy(key: Key) {
        this._changes[key] = this._changes[key] || {};
        this._changes[key].active = false;

        return this;
    }

    /**
     * Destroy a random system.
     */
    public destroyRandom() {
        const activeSystems = Object.keys(this._store.values)
            .filter(key => this._store.get(key as keyof SystemsStatusInfo).active);

        if (!activeSystems.length)
            return this;

        const randomKey = activeSystems[Math.floor(Math.random() * activeSystems.length)] as Key;
        return this.destroy(randomKey);
    }

    public repair(key: Key) {
        this._withdrawResourcesForRepair(this.store.get(key).repairCost);

        this._changes[key] = this._changes[key] || {};
        this._changes[key].active = true;

        return this;
    }

    public setRepairCost(key: Key, cost: Partial<ResourcesInfo>) {
        this._changes[key] = this._changes[key] || {};
        this._changes[key].repairCost = cost;

        return this;
    }

    public energy(key: Key, energy: number) {
        this._changes[key] = this._changes[key] || {};
        this._changes[key].energy = energy;

        return this;
    }

    public maxEnergy(key: Key, maxEnergy: number) {
        this._changes[key] = this._changes[key] || {};
        this._changes[key].maxEnergy = maxEnergy;

        return this;
    }

    /**
     * Discharge energy from the system and from the total energy store.
     * @param key System key.
     * @param amount Amount of energy to discharge. Default is 1.
     * @return True if there was enough energy to discharge, false otherwise. Energy will be discharged anyway.
     */
    public discharge(key: Key, amount = 1) {
        const hadEnoughEnergy = this.get(key).energy < amount;
        const amountToDischarge = Math.min(this.get(key).energy, amount);

        this.energy(key, this.get(key).energy - amountToDischarge);

        // Discharge energy from the total energy store.
        this._game.energy.update(energy => {
            energy.totalEnergy -= amountToDischarge;
            return energy;
        });

        return hadEnoughEnergy;
    }

    private _isChanged() {
        return Object.keys(this._changes).length > 0;
    }

    public save() {
        if (!this._isChanged()) {
            return;
        }

        const energyChange = this._calculateEnergyWithdrawal();

        this._store.update((v) => this._deepAssign(v, this._changes));

        if (energyChange < 0) {
            this._game.energy.update(energy => {
                energy.totalEnergy += energyChange;
                return energy;
            });
        }

        this._changes = {};
    }

    private _deepAssign(target: any, source: any) {
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object) {
                Object.assign(source[key], this._deepAssign(target[key], source[key]));
            }
        }

        Object.assign(target || {}, source);
        return target;
    }

    /**
     * Withdraw the resources from the storage for the repair. This method will not update the storage info, make sure
     * to call the save method afterward.
     * @param repairCost Cost of the repair.
     * @private
     */
    private _withdrawResourcesForRepair(repairCost: Partial<ResourcesInfo>) {
        Object.entries(repairCost).forEach(([resource, amount]) => {
            this._game.resources.modify(resource as keyof ResourcesInfo, -amount);
        });
    }

    /**
     * Calculate the amount of energy to withdraw from total energy store.
     * @private
     */
    private _calculateEnergyWithdrawal() {
        let energyChange = 0;

        Object.entries(this._changes).forEach(([key, system]) => {
            const systemBefore = this.get(key as Key);

            if ('active' in system) {
                if (systemBefore.active !== system.active) {
                    let energy;

                    if ('energy' in system) {
                        energy = system.energy;
                    } else {
                        energy = systemBefore.energy;
                    }

                    energyChange -= energy;

                    system.energy = 0;
                }
            }
        });

        return energyChange;
    }
}