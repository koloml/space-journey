import type Game from "@/lib/game/Game";
import {activeDecisionStore} from "@/lib/storage/ActiveDecisionStore";

export interface GameEventChoiceInit {
    text: string;
    run: (game: Game) => any
}

export interface ClassGameEventChoiceInit extends GameEventChoiceInit {
    game: Game;
}

export default class GameEventChoice {
    private readonly _game: Game;
    private readonly _text: string;
    private readonly _executeCallback: (game: Game) => any

    constructor(init: ClassGameEventChoiceInit) {
        this._game = init.game;
        this._text = init.text;
        this._executeCallback = init.run;
    }

    public execute() {
        this._executeCallback(this._game);

        this._saveChangesWhenNeeded();
        this._clearEvent();
    }

    private _saveChangesWhenNeeded() {
        this._game.resources.save();
        this._game.systems.save();
    }

    get text() {
        return this._text;
    }

    private _clearEvent() {
        activeDecisionStore.set({
            decision: null
        });

        this._game.resume();
    }
}