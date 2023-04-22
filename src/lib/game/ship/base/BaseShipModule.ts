import type {SystemsStatusInfo} from "@/lib/storage/SystemsStatusStore";
import BaseDamageableObject from "@/lib/game/ship/base/BaseDamageableObject";

export default class BaseShipModule extends BaseDamageableObject {
    protected _system?: keyof SystemsStatusInfo;
    protected _isBroken = false;
    protected _isEnabled = true;

    tileIndex = this._baseTileIndex;

    constructor(init) {
        super(init);
    }

    /**
     * Additionally subscribe to the systems status changes, so we could update the module state.
     */
    protected _listenStateChanges() {
        super._listenStateChanges();

        // Subscribing to the systems status changes.
        this.game.systems.store.subscribe(systems => {
            if (!this._system)
                return;

            this._isBroken = !systems[this._system].active;
            this._isEnabled = systems[this._system].energy > 0;
            this._onStateChange();
        });
    }

    /**
     * Refresh the tile index of the current module depending on the current state. Minimum offset is 0, maximum is 3.
     * States 0-3 are shown depending on the percentage of the hull (100% is 0, 0% is 3), if module itself is broken,
     * the offset is 3.
     * @private
     */
    protected _onStateChange() {
        super._onStateChange();

        if (!this._hasDamageTiles) {
            return;
        }

        if (this._isBroken) {
            this.tileIndex = this._baseTileIndex + this._maxDamageTileIndex;
            return;
        }
    }
}