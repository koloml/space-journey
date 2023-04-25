import BaseController from "@/lib/game/base/BaseController";
import type Game from "@/lib/game/Game";
import GameEventsPool from "@/lib/game/events/entities/GameEventsPool";
import {neutralEventsPool} from "@/lib/game/events/pools/NeutralEventsPool";
import {negativeEventsPool} from "@/lib/game/events/pools/NegativeEventsPool";
import {positiveEventsPool} from "@/lib/game/events/pools/PositiveEventsPool";

export default class StoryTellerController extends BaseController {
    private readonly _eventPools: GameEventsPool[] = [];
    private _lastEventTick: number | null = null;
    private _nextEventTick: number | null = null;

    constructor(game: Game) {
        super(game);

        this._eventPools.push(
            new GameEventsPool(game, neutralEventsPool),
            new GameEventsPool(game, negativeEventsPool),
            new GameEventsPool(game, positiveEventsPool),
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
        const event = this._eventPools[randInt(0, this._eventPools.length)]
            .pickRandomEvent();

        if (!event) {
            // If there is no event out there, then just skip this tick.
            return;
        }

        this._game.assignEvent(event);
    }

    /**
     * Interval in ticks between events.
     */
    static _eventsIntervalInTicks = [10, 100];
}