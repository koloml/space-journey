import GameEventChoice, {type GameEventChoiceInit} from "@/lib/game/events/entities/GameEventChoice";
import type Game from "@/lib/game/Game";

export interface GameEventInit {
    text: string;
    choices?: (GameEventChoice | GameEventChoiceInit)[];
}

export interface ClassGameEventInit extends GameEventInit {
    game: Game;
}

export default class GameEvent {
    private readonly _game: Game;
    private readonly _choices: GameEventChoice[] = [];

    private readonly _text: string;

    constructor(init: ClassGameEventInit) {
        this._text = init.text;
        this._choices = (init.choices || [])
            .map(
                choiceResolvable => choiceResolvable instanceof GameEventChoice
                    ? choiceResolvable
                    : new GameEventChoice(Object.assign({game: this._game}, choiceResolvable))
            );
    }

    get text() {
        return this._text;
    }

    get choices() {
        return this._choices;
    }
}