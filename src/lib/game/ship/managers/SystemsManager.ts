import BaseManager from "@/lib/game/ship/base/BaseManager";
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

    public destroy(key: Key) {
        this._changes[key] = this._changes[key] || {};
        this._changes[key].active = false;

        return this;
    }

    public repair(key: Key) {
        this._changes[key] = this._changes[key] || {};
        this._changes[key].active = true;

        return this;
    }

    public repairCost(key: Key, cost: Partial<ResourcesInfo>) {
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

    private _isChanged() {
        return Object.keys(this._changes).length > 0;
    }

    public save() {
        if (!this._isChanged()) {
            return;
        }

        this._store.update((v) => this._deepAssign(v, this._changes));
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
}