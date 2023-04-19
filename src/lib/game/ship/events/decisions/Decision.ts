import DecisionChoice, {type DecisionChoiceInit} from "@/lib/game/ship/events/decisions/DecisionChoice";
import type Game from "@/lib/game/Game";

export interface DecisionInit {
    text: string;
    choices?: (DecisionChoice | DecisionChoiceInit)[];
}

export interface GameDecisionInit extends DecisionInit {
    game: Game;
}

export default class Decision {
    private readonly _game: Game;
    private readonly _choices: DecisionChoice[] = [];

    constructor(init: GameDecisionInit) {
        this._choices = (init.choices || [])
            .map(
                choiceResolvable => choiceResolvable instanceof DecisionChoice
                    ? choiceResolvable
                    : new DecisionChoice(Object.assign({game: this._game}, choiceResolvable))
            );
    }

    get choices() {
        return this._choices;
    }
}