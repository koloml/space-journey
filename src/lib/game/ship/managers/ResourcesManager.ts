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

    public get<Key extends keyof ResourcesInfo>(key: Key): ResourcesInfo[Key] {
        return this._store.get(key);
    }

    public set<Key extends keyof ResourcesInfo>(key: Key, value: ResourcesInfo[Key], isRaw = false) {
        value = this._onChange(key, value, isRaw);
        this._changes[key] = value;

        return this;
    }

    public modify<Key extends keyof ResourcesInfo>(key: Key, modifyBy: ResourcesInfo[Key], isRaw = false) {
        const currentValue = this._changes[key] ? this._changes[key] : this.get(key);
        this._changes[key] = this._onChange(key, currentValue + modifyBy, isRaw);

        return this;
    }

    private _onChange<Key extends keyof ResourcesInfo>(key: Key, value: ResourcesInfo[Key], raw = false): ResourcesInfo[Key] {
        let changeBy = value - this.get(key);

        switch (key) {
            case "crew":
                changeBy = this._game.upgrades.get('medical')
                break;
        }

        return changeBy;
    }

    private _hasChanges() {
        return Object.keys(this._changes).length > 0;
    }

    public save() {
        if (!this._hasChanges()) {
            return;
        }

        Array.from(this._changesListeners).forEach(listener => listener(this._changes));
        this._store.update((v) => Object.assign(v, this._changes));

        this._changes = {};
    }

    public subscribeForChanges(listener: ResourceChangeListener) {
        this._changesListeners.add(listener);
    }

    public unsubscribeFromChanges(listener: ResourceChangeListener) {
        this._changesListeners.delete(listener);
    }
}