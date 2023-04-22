import BaseShipModule from "@/lib/game/ship/base/BaseShipModule";
import type {SystemsStatusInfo} from "@/lib/storage/SystemsStatusStore";

export default class ShieldModule extends BaseShipModule {
    protected _baseTileIndex = 3;
    protected _hasDamageTiles = false;
    protected _system: keyof SystemsStatusInfo = 'shield';

    tileIndex = 3;
    size = vec2(80, 144);
    tileSize = vec2(80, 144);
    renderOrder = -1;

    protected _onStateChange() {
        const isDisabled = this._isBroken || !this._isEnabled;

        this.color = isDisabled
            ? ShieldModule._hiddenColor
            : ShieldModule._visibleColor;
    }

    private static readonly _hiddenColor = new Color(0, 0, 0, 0);
    private static readonly _visibleColor = new Color(1, 1, 1, 1);
}