import Logger from "@/lib/game/utils/Logger";
import tileSetUrl from "@/assets/images/ship/ship-tilemap.png";
import GenerationShip from "@/lib/game/ship/GenerationShip";

export default class Game {
    private _logger = new Logger(this);
    private _ship?: GenerationShip;

    constructor() {
        this._logger.log("Game created. " + Math.random().toString(36));

        canvasFixedSize = vec2(156, 134);
        cameraScale = 1;

        engineInit(
            () => this._onInit(),
            () => this._onUpdate(),
            () => this._onUpdatePost(),
            () => this._onRender(),
            () => this._onRenderPost(),
            tileSetUrl
        )
    }

    private _onInit() {
        this._ship = new GenerationShip({
            game: this,
            position: vec2(0, 0)
        });
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

    get ship(): GenerationShip {
        if (!this._ship) {
            throw new Error("Ship is not initialized yet!");
        }

        return this._ship;
    }
}