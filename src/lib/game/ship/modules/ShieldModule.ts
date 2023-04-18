import BaseShipModule from "@/lib/game/ship/base/BaseShipModule";

export default class ShieldModule extends BaseShipModule {
    tileIndex = 3;
    size = vec2(80, 144);
    tileSize = vec2(80, 144);
    renderOrder = -1;
}