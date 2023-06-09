import Logger from "@/lib/game/utils/Logger";
import tileSetUrl from "@/assets/images/ship/ship-tilemap.png";
import GenerationShip from "@/lib/game/ship/GenerationShip";
import {createDefaultSystemsStatusInfo, systemsStatusStore} from "@/lib/storage/SystemsStatusStore";
import {createDefaultResourcesInfo, resourcesStore} from "@/lib/storage/ResourcesStore";
import {createDefaultTotalEnergyInfo, totalEnergyStore} from "@/lib/storage/TotalEnergyStore";
import {createDefaultSubSystemsUpgradesInfo, subSystemsUpgradesStore} from "@/lib/storage/SubSystemsUpgradesStore";
import {createDefaultJourneyProgressInfo, journeyProgressStore} from "@/lib/storage/JourneyProgressStore";
import {activeDecisionStore, createDefaultActiveDecisionInfo} from "@/lib/storage/ActiveDecisionStore";
import {activeZoneStore, createDefaultActiveZoneInfo} from "@/lib/storage/ActiveZoneStore";
import {createDefaultLogsInfo, logsStore} from "@/lib/storage/LogsStore";
import StorageWrapper from "@/lib/game/stores/StorageWrapper";
import StoryTellerController from "@/lib/game/controllers/StoryTellerController";
import type BaseController from "@/lib/game/base/BaseController";
import JourneyController from "@/lib/game/controllers/JourneyController";
import ResourcesController from "@/lib/game/controllers/ResourcesController";
import ResourcesManager from "@/lib/game/managers/ResourcesManager";
import SystemsManager from "@/lib/game/managers/SystemsManager";
import GameEvent, {type GameEventInit} from "@/lib/game/events/entities/GameEvent";

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
    private _isPaused = true;
    private _tickInterval?: number | NodeJS.Timer;
    private _tickDuration = 100;
    private _tickCounter = 0;

    private _controllers: BaseController[] = [];

    constructor() {
        this._initializeEngine();
        this._initializeControllers();

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
            () => null,
            () => null,
            () => null,
            () => null,
            tileSetUrl
        );
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

    /**
     * Assign an event to the active game.
     * @param eventResolvable Event to assign. Might be an already initialized event or an event init object.
     */
    public assignEvent(eventResolvable: GameEventInit | GameEvent) {
        if (!(eventResolvable instanceof GameEvent)) {
            eventResolvable = new GameEvent(Object.assign(eventResolvable, {game: this}));
        }

        // Create after the current tick is finished.
        requestAnimationFrame(() => {
            activeDecisionStore.set({
                decision: eventResolvable as GameEvent
            });
            this.pause();
        });
    }

    public startNewGame() {
        activeDecisionStore.set(createDefaultActiveDecisionInfo());
        activeZoneStore.set(createDefaultActiveZoneInfo());
        journeyProgressStore.set(createDefaultJourneyProgressInfo());
        logsStore.set(createDefaultLogsInfo());
        resourcesStore.set(createDefaultResourcesInfo());
        subSystemsUpgradesStore.set(createDefaultSubSystemsUpgradesInfo());
        systemsStatusStore.set(createDefaultSystemsStatusInfo());
        totalEnergyStore.set(createDefaultTotalEnergyInfo());

        this._tickCounter = 0;
        this.resume();
    }

    public endGame(isSuccess: boolean) {
        this.pause();
        location.hash = isSuccess ? '#won' : '#lost';
    }
}