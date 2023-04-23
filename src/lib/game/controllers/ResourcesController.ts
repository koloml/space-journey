import BaseController from "@/lib/game/base/BaseController";

export default class ResourcesController extends BaseController {
    constructor(game) {
        super(game);

        this._game.resources.subscribeForChanges(changes => this._onResourcesChanged(changes));
    }

    onTick() {
        this._generateEnergy();
    }

    /**
     * Generate additional energy from generator.
     * @private
     */
    private _generateEnergy() {
        const generatorState = this._game.systems.get('generator');

        if (!generatorState.active || !generatorState.energy) {
            return;
        }

        let energyProgress = this._game.energy.get('energyProgress') + generatorState.energy;

        this._game.energy.update(store => {
            store.energyProgress = energyProgress;

            if (store.energyProgress >= store.energyProgressMax) {
                if (store.totalEnergy >= store.maxUnusedEnergy) {
                    store.energyProgress = store.energyProgressMax;
                    return store;
                }

                store.energyProgress = 0;
                store.totalEnergy += 1;
            }

            return store;
        });
    }

    private _onResourcesChanged(changes) {
        // TODO Make a special message with the icons and amount of resources changed.
        this._game.logger.log("Resources changed: " + JSON.stringify(changes));
    }
}