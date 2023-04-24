import type GameEventsPool from "@/lib/game/events/entities/GameEventsPool";
import type Game from "@/lib/game/Game";

export default class BaseZone {
    protected _game: Game;

    readonly background: string[];
    readonly backgroundShitRates: number[];
    readonly eventsPool: GameEventsPool;

    constructor(game: Game) {
        this._game = game;
    }

}