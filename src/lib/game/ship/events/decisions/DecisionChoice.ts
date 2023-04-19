import type Game from "@/lib/game/Game";

export interface DecisionChoiceInit {
    text: string;
    run: (game: Game) => any
}

export interface GameDecisionChoiceInit extends DecisionChoiceInit {
    game: Game;
}

export default class DecisionChoice {
    private readonly _game: Game;
    private readonly _text: string;
    private readonly _executeCallback: (game: Game) => any

    constructor(init: GameDecisionChoiceInit) {
        this._game = init.game;
        this._text = init.text;
        this._executeCallback = init.run;
    }

    public execute() {
        this._executeCallback(this._game);
    }
}