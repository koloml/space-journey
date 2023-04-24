import BaseController from "@/lib/game/base/BaseController";
import type Game from "@/lib/game/Game";
import GameEventsPool from "@/lib/game/events/entities/GameEventsPool";
import {mainEventsPool} from "@/lib/game/events/pools/MainEventsPool";
import type BaseZone from "@/lib/game/base/BaseZone";
import AsteroidsZone from "@/lib/game/zones/AsteroidsZone";
import {activeDecisionStore} from "@/lib/storage/ActiveDecisionStore";

export default class StoryTellerController extends BaseController {
    private readonly _eventPools: GameEventsPool[] = [];
    private _lastEventTick: number | null = null;
    private _activeZone: BaseZone | null = null;
    private _nextEventTick: number | null = null;

    constructor(game: Game) {
        super(game);

        this._eventPools.push(
            new GameEventsPool(game, mainEventsPool)
        );
    }

    onTick() {
        this._attemptToCreateEvent();
    }

    /**
     * Attempt to create a new event. If a new event is created, the game will be paused and decision window will be
     * shown.
     */
    _attemptToCreateEvent() {
        if (!this._nextEventTick) {
            this._nextEventTick = this._game.ticksPassed + rand(...StoryTellerController._eventsIntervalInTicks);
            return;
        }

        if (this._game.ticksPassed < this._nextEventTick) {
            return;
        }

        this._nextEventTick = null;
        this._lastEventTick = this._game.ticksPassed;
        const event = this._eventPools[rand(0, this._eventPools.length - 1)]
            .pickRandomEvent();

        activeDecisionStore.set({
            decision: event
        });

        this._game.pause();
    }

    /**
     * Interval in ticks between events.
     */
    static _eventsIntervalInTicks = [100, 200];
}