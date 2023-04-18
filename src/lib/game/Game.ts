import Logger from "@/lib/game/utils/Logger";
import tileSetUrl from "@/assets/images/ship/ship-tilemap.png";
import GenerationShip from "@/lib/game/ship/GenerationShip";
import {systemsStatusStore} from "@/lib/storage/SystemsStatusStore";
import {journeyProgressStore} from "@/lib/storage/JourneyProgressStore";

export default class Game {
    private _logger = new Logger(this);
    private _ship?: GenerationShip;
    private _systemsStore = systemsStatusStore;
    private _journeyStore = journeyProgressStore;

    private _isPaused = false;
    private _tickInterval?: number | NodeJS.Timer;
    private _tickDuration = 100;

    constructor() {
        this._logger.log("Game created. " + Math.random().toString(36));

        canvasFixedSize = vec2(153, 142);
        cameraScale = 1;

        engineInit(
            () => this._onInit(),
            () => this._onUpdate(),
            () => this._onUpdatePost(),
            () => this._onRender(),
            () => this._onRenderPost(),
            tileSetUrl
        );

        this._tickInterval = setInterval(() => this._onTick(), this._tickDuration);
    }

    private _onInit() {
        this._ship = new GenerationShip({game: this});
    }

    private _onUpdate() {

    }

    private _onUpdatePost() {

    }

    private _onRender() {

    }

    private _onRenderPost() {

    }

    private _onTick() {

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

    get systems() {
        return this._systemsStore;
    }

    get journey() {
        return this._journeyStore;
    }
}