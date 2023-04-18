import BaseShipModule from "@/lib/game/ship/base/BaseShipModule";

export default class GeneratorModule extends BaseShipModule {
    tileIndex = 60;
    tileSize = vec2(32, 32);
    size = vec2(32, 32);

    constructor(init) {
        super(init);
    }
}