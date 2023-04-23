import BaseManager from "@/lib/game/ship/base/BaseManager";
import type StorageWrapper from "@/lib/game/stores/StorageWrapper";
import type {ResourcesInfo} from "@/lib/storage/ResourcesStore";
import type Game from "@/lib/game/Game";

type ResourceChangeListener = (changes: Partial<ResourcesInfo>) => any;

export default class ResourcesManager extends BaseManager<ResourcesInfo> {
    private _changes: Partial<ResourcesInfo> = {};
    private _changesListeners = new Set<ResourceChangeListener>();

    constructor(game: Game, storage: StorageWrapper<ResourcesInfo>) {
        super(game);
        this._store = storage;
    }

    /**
     * Get the exact amount of resource currently cached by store wrapper.
     * @param key Key of the resource.
     * @return The amount of resource.
     */
    public get<Key extends keyof ResourcesInfo>(key: Key): ResourcesInfo[Key] {
        return this._store.get(key);
    }

    /**
     * Set the exact amount of resource. This will override any previous changes made to the resource.
     * @param key Key of the resource.
     * @param value The value to set.
     * @param isRaw If true, the value will be saved as is, without any modifications.
     */
    public set<Key extends keyof ResourcesInfo>(key: Key, value: ResourcesInfo[Key], isRaw = false) {
        value = this._modifyChange(key, value, isRaw);
        this._changes[key] = value;

        return this;
    }

    /**
     * Modify the amount of resource by the given value. Modifications made by this method will be processed by systems
     * upgrades and other factors.
     * @param key The resource key.
     * @param modifyBy The value to modify the resource by.
     * @param isRaw If true, the value will be saved as is, without any modifications.
     */
    public modify<Key extends keyof ResourcesInfo>(key: Key, modifyBy: ResourcesInfo[Key], isRaw = false) {
        const currentValue = this._changes[key] ? this._changes[key] : this.get(key);
        this._changes[key] = this._modifyChange(key, currentValue + modifyBy, isRaw);

        return this;
    }

    /**
     * Modify the result amount of resource after the change is saved. This will allow systems to reduce the amount of
     * resources needed for repair based on upgrades or amount of crew being injured.
     * @param key The resource key.
     * @param value The value after modification is applied.
     * @param raw If true, the value will be saved as is, without any modifications.
     * @returns New value after modification is applied.
     * @private
     */
    private _modifyChange<Key extends keyof ResourcesInfo>(key: Key, value: ResourcesInfo[Key], raw = false): ResourcesInfo[Key] {
        if (raw)
            return value;

        const valueBefore = this.get(key);
        let changeBy = value - valueBefore;

        switch (key) {
            case "crew":
                const medicalUpgrade = this._game.upgrades.get('medical');
                changeBy = Math.round(changeBy / medicalUpgrade + 1);
                break;
        }

        return valueBefore + changeBy;
    }

    /**
     * Check if there are any changes to save.
     * @private
     */
    private _hasChanges() {
        return Object.keys(this._changes).length > 0;
    }

    /**
     * Save changes to the store.
     */
    public save() {
        if (!this._hasChanges()) {
            return;
        }

        Array.from(this._changesListeners).forEach(listener => listener(this._changes));
        this._store.update((v) => Object.assign(v, this._changes));

        this._changes = {};
    }

    /**
     * Subscribe for changes to the resources. This callback will be called every time the resources are changed.
     * @param listener The callback to call.
     */
    public subscribeForChanges(listener: ResourceChangeListener) {
        this._changesListeners.add(listener);
    }

    /**
     * Unsubscribe from changes to the resources.
     * @param listener Original function passed to subscribeForChanges.
     */
    public unsubscribeFromChanges(listener: ResourceChangeListener) {
        this._changesListeners.delete(listener);
    }
}