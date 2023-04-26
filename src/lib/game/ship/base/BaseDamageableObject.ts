import GameObject from "@/lib/littlejs/GameObject";

export default class BaseDamageableObject extends GameObject {
    /**
     * Is this object contains different tiles for the damaged states.
     * @protected
     */
    protected _hasDamageTiles = true;
    /**
     * Base tile index for the object.
     * @protected
     */
    protected _baseTileIndex = -1;
    /**
     * Maximum damage tile index for the object.
     * @protected
     */
    protected _maxDamageTileIndex = 3;
    /**
     * Current hull state of the ship. Value from 0 to 100. Is getting updated from the resources store.
     * @protected
     */
    protected _shipHull = 100;

    tileIndex = this._baseTileIndex;

    constructor(init) {
        super(init);

        // Wait for all the code in child classes to be executed and only subscribe to the hull changes on the next
        // frame.
        requestAnimationFrame(() => this._listenStateChanges());
    }

    /**
     * Subscribe to the resources store and listen for the hull changes.
     * @protected
     */
    protected _listenStateChanges() {
        // Subscribing to the hull resource changes.
        this.game.resources.store.subscribe(resources => {
            this._shipHull = resources.hull;
            this._onStateChange();
        });
    }

    /**
     * Refresh the tile index of the current module depending on the current state. Minimum offset is 0, maximum is
     * {@link _maxDamageTileIndex}.
     * @protected
     */
    protected _onStateChange() {
        if (!this._hasDamageTiles) {
            return;
        }

        const offset = Math.floor((1 - Math.min(this._shipHull, 100) / 100) * this._maxDamageTileIndex);

        this.tileIndex = this._baseTileIndex + offset;
    }

}