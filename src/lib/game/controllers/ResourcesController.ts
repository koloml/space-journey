import BaseController from "@/lib/game/base/BaseController";
import type {ResourcesInfo} from "@/lib/storage/ResourcesStore";

export default class ResourcesController extends BaseController {
    constructor(game) {
        super(game);

        this._game.resources.subscribeForChanges(changes => this._onResourcesChanged(changes));
    }

    onTick() {
        this._generateEnergy();
        this._handleFoodChanges();
        this._handleCrewChanges();
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

    /**
     * Handle food consumption by the crew and new food generation by the farms.
     * @private
     */
    private _handleFoodChanges() {
        if (this._game.ticksPassed % 5 !== 0) {
            return;
        }

        const farms = this._game.systems.get('farms');
        const amountOfCrew = this._game.resources.get('crew');
        const foodConsumption = Math.round(amountOfCrew / 50);
        const foodProduction = +farms.active * farms.energy * 2;

        this._game.resources.store.update(store => {
            store.food += foodProduction - foodConsumption;
            store.food = Math.max(0, store.food);

            if (store.food > 100) {
                store.food -= 1;
            }

            return store;
        });
    }

    /**
     * Handle the crew changes onboard the ship. If there is not enough food, the crew will start to die.
     * If there is less the 2/3 of the food reserves, the crew will start to deteriorate.
     * @private
     */
    private _handleCrewChanges() {
        if (this._game.ticksPassed % 5 !== 0) {
            return;
        }

        const amountOfCrew = this._game.resources.get('crew');

        if (amountOfCrew <= 0) {
            return;
        }

        const food = this._game.resources.get('food');
        const minimumFoodRequirements = Math.round(amountOfCrew * .3);

        this._game.resources.store.update(store => {
            if (food < minimumFoodRequirements) {
                store.crew -= 1;
                return store;
            }

            if (this._game.ticksPassed % 15 === 0 && store.crew < 100) {
                store.crew += 1;
            }

            if (store.crew > 100 && this._game.ticksPassed % 30 === 0) {
                store.crew -= 1;
            }

            return store;
        });
    }

    /**
     * Print the information about the changes in key resources. Message will be displayed in the following format:
     * "Gain 10 food, 5 energy, 1 crew, lost 1 hull.". If there is no changes, the message will not be displayed.
     * Gain displayed first, and after that the lost. Resources will be grouped by the change.
     * @param updatedValues Values of the resources that were changed and their new value. These values are not saved
     * in the store yet, so difference can be calculated using the existing values.
     * @private
     */
    private _onResourcesChanged(updatedValues: Partial<ResourcesInfo>) {
        const losses = [];
        const gains = [];

        Object.keys(updatedValues).forEach((key: keyof ResourcesInfo) => {
            const updatedValue = updatedValues[key];
            const currentValue = this._game.resources.get(key);

            if (updatedValue === currentValue) {
                return;
            }

            if (updatedValue > currentValue) {
                gains.push(`+${updatedValue - currentValue} ${key}`);
            }

            if (updatedValue < currentValue) {
                losses.push(`${currentValue - updatedValue} ${key}`);
            }
        });

        if (gains.length === 0 && losses.length === 0) {
            return;
        }

        let message = '';

        if (gains.length > 0) {
            message += `Gain ${gains.join(', ')}. `;
        }

        if (losses.length > 0) {
            message += `Lost ${losses.join(', ')}. `;
        }

        this._game.logger.log(message.trim());
    }
}