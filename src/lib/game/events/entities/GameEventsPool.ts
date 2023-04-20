import GameEvent, {type GameEventInit} from "@/lib/game/events/entities/GameEvent";
import type Game from "@/lib/game/Game";

export default class GameEventsPool {
    private readonly _game: Game;
    private readonly _events: GameEvent[] = [];

    constructor(game: Game, events: GameEventInit[]) {
        this._game = game;
        this._events = events.map(event => new GameEvent(Object.assign(event, {game})));
    }

    public pickRandomEvent() {
        return this._events[Math.floor(Math.random() * this._events.length)];
    }
}