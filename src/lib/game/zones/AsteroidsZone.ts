import BaseZone from "@/lib/game/base/BaseZone";
import asteroidsLayer5 from "@/assets/images/background/zones/asteroids/layer-5.png";
import asteroidsLayer6 from "@/assets/images/background/zones/asteroids/layer-6.png";
import GameEventsPool from "@/lib/game/events/entities/GameEventsPool";

export default class AsteroidsZone extends BaseZone {
    readonly background = [asteroidsLayer5, asteroidsLayer6];
    readonly backgroundShitRates = [6, 8];
    readonly eventsPool = new GameEventsPool(this._game, [])
}