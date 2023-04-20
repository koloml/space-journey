import type Game from "@/lib/game/Game";

export default class BaseController {
    protected readonly _game: Game;

    constructor(game: Game) {
        this._game = game;
    }

    public onTick() {
        // Doing nothing, can be overridden in child classes
    }
}