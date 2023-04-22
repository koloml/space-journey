import BaseController from "@/lib/game/base/BaseController";

export default class ResourcesController extends BaseController {
    constructor(game) {
        super(game);

        this._game.resources.subscribeForChanges(changes => this._onResourcesChanged(changes));
    }

    onTick() {

    }

    private _onResourcesChanged(changes) {
        // TODO Make a special message with the icons and amount of resources changed.
        this._game.logger.log("Resources changed: " + JSON.stringify(changes));
    }
}