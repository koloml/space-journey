import BaseController from "@/lib/game/base/BaseController";
import type Game from "@/lib/game/Game";
import GameEventsPool from "@/lib/game/events/entities/GameEventsPool";
import {mainEventsPool} from "@/lib/game/events/pools/MainEventsPool";

export default class StoryTellerController extends BaseController {
    private readonly _eventPools: GameEventsPool[] = [];
    private _lastEventTick: number | null = null;

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