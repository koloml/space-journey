import type Game from "@/lib/game/Game";

export interface GameControllerInit {
    game: Game;
}

export default class GameController {
    protected _game: Game;

    constructor(init: GameControllerInit) {
        this._game = init.game;
    }

    public _onInit(): void {
        // Nothing implemented.
    }

    public _onUpdate(): void {
        // Nothing implemented.
    };

    public _onUpdatePost(): void {
        // Nothing implemented.
    }

    public _onRender(): void {
        // Nothing implemented.
    }

    public _onRenderPost(): void {
        // Nothing implemented.
    }
}