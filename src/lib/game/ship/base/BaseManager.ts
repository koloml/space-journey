import type Game from "@/lib/game/Game";

export default abstract class BaseManager {
    protected _game: Game;

    protected constructor(game: Game) {
        this._game = game;
    }

    abstract save();
}