import Logger from "@/lib/game/utils/Logger";

export interface GameInit {
}

export default class Game {
    private _logger = new Logger(this);

    constructor(init: GameInit = {}) {
        this._logger.log("Game created. " + Math.random().toString(36));

        canvasFixedSize = vec2(156, 139);

        engineInit(
            () => this._onInit(),
            () => this._onUpdate(),
            () => this._onUpdatePost(),
            () => this._onRender(),
            () => this._onRenderPost()
        )
    }

    private _onInit() {

    }

    private _onUpdate() {

    }

    private _onUpdatePost() {

    }

    private _onRender() {

    }

    private _onRenderPost() {

    }

    get logger() {
        return this._logger;
    }

    get distance() {
        return Date.now();
    }
}