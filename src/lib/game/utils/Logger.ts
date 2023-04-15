import type Game from "@/lib/game/Game";
import {logsStore} from "@/lib/storage/LogsStore";

export default class Logger {
    private _game: Game;

    constructor(game: Game) {
        this._game = game;
    }

    public log(message: string) {
        logsStore.update(logs => {
            logs.push({
                timestamp: this._game.distance.toString(36),
                text: message,
            });

            return logs;
        });
    }
}