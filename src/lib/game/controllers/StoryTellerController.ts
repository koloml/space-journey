import BaseController from "@/lib/game/base/BaseController";
import type Game from "@/lib/game/Game";
import GameEventsPool from "@/lib/game/events/entities/GameEventsPool";
import {mainEventsPool} from "@/lib/game/events/pools/MainEventsPool";
import type BaseZone from "@/lib/game/base/BaseZone";
import AsteroidsZone from "@/lib/game/zones/AsteroidsZone";

export default class StoryTellerController extends BaseController {
    private readonly _eventPools: GameEventsPool[] = [];
    private _lastEventTick: number | null = null;
    private _activeZone: BaseZone | null = null;

    constructor(game: Game) {
        super(game);

        this._eventPools.push(
            new GameEventsPool(game, mainEventsPool)
        );
    }

    onTick() {
        // TODO Decide when to run the event
    }
}