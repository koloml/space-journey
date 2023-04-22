import BaseShipModule from "@/lib/game/ship/base/BaseShipModule";
import type {SystemsStatusInfo} from "@/lib/storage/SystemsStatusStore";

export default class GeneratorModule extends BaseShipModule {
    protected _baseTileIndex = 60;
    protected _system: keyof SystemsStatusInfo = 'generator';

    tileIndex = this._baseTileIndex;
    tileSize = vec2(32, 32);
    size = vec2(32, 32);
}