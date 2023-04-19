import Logger from "@/lib/game/utils/Logger";
import tileSetUrl from "@/assets/images/ship/ship-tilemap.png";
import GenerationShip from "@/lib/game/ship/GenerationShip";
import {systemsStatusStore} from "@/lib/storage/SystemsStatusStore";
import {journeyProgressStore} from "@/lib/storage/JourneyProgressStore";
import {resourcesStore} from "@/lib/storage/ResourcesStore";
import {totalEnergyStore} from "@/lib/storage/TotalEnergyStore";

export default class Game {
    private _logger = new Logger(this);
    private _ship?: GenerationShip;
    private _systemsStore = systemsStatusStore;
    private _journeyStore = journeyProgressStore;
    private _resourcesStore = resourcesStore;
    private _energyStore = totalEnergyStore;

    private _distanceTraveled = 0;
    private _isPaused = false;
    private _tickInterval?: number | NodeJS.Timer;
    private _tickDuration = 100;

    constructor() {
        this._initializeEngine();

        this._tickInterval = setInterval(() => this._onTick(), this._tickDuration);

        this._journeyStore.subscribe(store => {
            this._distanceTraveled = parseFloat(store.distance.toPrecision(2));
        });

        this._logger.log("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, blanditiis consectetur et excepturi facilis necessitatibus odio officia placeat quam ut. Alias autem corporis fugiat nesciunt quaerat, quam repudiandae veniam veritatis!");
    }

    /**
     * Configure and start up the LittleJS engine.
     * @private
     */
    private _initializeEngine() {
        // This is fixed position and camera scale, so everything will be rendered with pixel-perfect precision.
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
        return this._distanceTraveled;
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

    get resources() {
        return this._resourcesStore;
    }

    get energy() {
        return this._energyStore;
    }
}