import type {Writable} from "svelte/store";

/**
 * A wrapper class for a svelte store. This class will help you to get values from the store, without having to
 * subscribe to the store yourself.
 */
export default class StorageWrapper<WritableType> {
    /**
     * The values currently cached by the class.
     * @private
     */
    private _values: WritableType;
    /**
     * The store to wrap.
     * @private
     */
    private _store: Writable<WritableType>;

    /**
     * Create a new storage wrapper. This class will help you to get values from the store, without having to subscribe
     * to the store yourself.
     * @param store
     */
    constructor(store: Writable<WritableType>) {
        this._store = store;
        this._store.subscribe(values => {
            this._values = values;
        });
    }

    /**
     * Get all the values currently cached by the class. If you change any values using this object, you should call the
     * update for the values manually.
     */
    public get values() {
        return this._values;
    }

    /**
     * Get a value from the store by the key. This will return the value from the cache, and not from the actual store.
     * It's not recommended to change the values of the objects directly, but if you do, you should call the update
     * method manually.
     * @param key The key of the value to get.
     * @return The value from the store.
     */
    public get<Key extends keyof WritableType>(key: Key): WritableType[Key] {
        return this._values[key];
    }

    /**
     * Set a value in the store. This method is similar to the set method of the svelte store. This method will trigger
     * an update for the store.
     * @param callback The callback to call and get the new values.
     */
    public update(callback: (values: WritableType) => WritableType) {
        this._store.update(callback);
    }

    /**
     * Subscribe to changes in the store. This method is similar to the subscribe method of the svelte store.
     * @param callback The callback to call when the store is updated.
     */
    public subscribe(callback: (values: WritableType) => void) {
        this._store.subscribe(callback);
    }

    /**
     * Manually trigger an update for the values. This is useful if you change the values directly, and want to trigger
     * an update for the store.
     */
    public triggerUpdate() {
        this.update(values => this._values);
    }
}