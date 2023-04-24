import Logger from "@/lib/game/utils/Logger";
import tileSetUrl from "@/assets/images/ship/ship-tilemap.png";
import GenerationShip from "@/lib/game/ship/GenerationShip";
import {systemsStatusStore} from "@/lib/storage/SystemsStatusStore";
import {journeyProgressStore} from "@/lib/storage/JourneyProgressStore";
import {resourcesStore} from "@/lib/storage/ResourcesStore";
import {totalEnergyStore} from "@/lib/storage/TotalEnergyStore";
import {subSystemsUpgradesStore} from "@/lib/storage/SubSystemsUpgradesStore";
import StorageWrapper from "@/lib/game/stores/StorageWrapper";
import StoryTellerController from "@/lib/game/controllers/StoryTellerController";
import type BaseController from "@/lib/game/base/BaseController";
import JourneyController from "@/lib/game/controllers/JourneyController";
import ResourcesController from "@/lib/game/controllers/ResourcesController";
import ResourcesManager from "@/lib/game/managers/ResourcesManager";
import SystemsManager from "@/lib/game/managers/SystemsManager";
import {activeDecisionStore} from "@/lib/storage/ActiveDecisionStore";

export default class Game {
    private _logger = new Logger(this);
    private _ship?: GenerationShip;
    private _systemsStore = new SystemsManager(this, new StorageWrapper(systemsStatusStore));
    private _journeyStore = new StorageWrapper(journeyProgressStore);
    private _resourcesManager = new ResourcesManager(this, new StorageWrapper(resourcesStore));
    private _energyStore = new StorageWrapper(totalEnergyStore);
    private _upgradesStore = new StorageWrapper(subSystemsUpgradesStore);
    private _decisionStore = new StorageWrapper(activeDecisionStore);

    private _distanceTraveled = 0;
    private _isPaused = false;
    private _tickInterval?: number | NodeJS.Timer;
    private _tickDuration = 100;
    private _tickCounter = 0;

    private _controllers: BaseController[] = [];

    constructor() {
        this._initializeEngine();
        this._initializeControllers();
        this._initializeTicks();

        this._journeyStore.subscribe(store => {
            this._distanceTraveled = parseFloat(store.traveled.toPrecision(2));
        });
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

    private _initializeTicks() {
        this._tickInterval = setInterval(() => this._onTick(), this._tickDuration);
    }

    private _initializeControllers() {
        this._controllers.push(
            new JourneyController(this),
            new ResourcesController(this),
            new StoryTellerController(this),
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
        this._tickCounter++;

        this._controllers.forEach(controller => controller.onTick());
    }

    get logger() {
        return this._logger;
    }

    get distance() {
        return this._distanceTraveled;
    }

    get ticksPassed() {
        return this._tickCounter;
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
        return this._resourcesManager;
    }

    get energy() {
        return this._energyStore;
    }

    get upgrades() {
        return this._upgradesStore;
    }

    get decision() {
        return this._decisionStore;
    }

    public pause() {
        clearInterval(this._tickInterval as number);
        this._tickInterval = null;
    }

    public resume() {
        if (this._tickInterval) {
            clearInterval(this._tickInterval as number);
        }

        this._tickInterval = setInterval(() => this._onTick(), this._tickDuration);
    }
}