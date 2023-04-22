import BaseShipModule from "@/lib/game/ship/base/BaseShipModule";
import type {SystemsStatusInfo} from "@/lib/storage/SystemsStatusStore";

export default class FarmsModule extends BaseShipModule {
    protected _baseTileIndex = 144;
    protected _system: keyof SystemsStatusInfo = 'farms';

    tileIndex = this._baseTileIndex;
    tileSize = vec2(32, 16);
    size = vec2(32, 16);
}