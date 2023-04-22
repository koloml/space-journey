import BaseShipModule from "@/lib/game/ship/base/BaseShipModule";
import ExhaustEmitter from "@/lib/game/ship/modules/thrusters/ExhaustEmitter";
import SecondaryExhaustEmitter from "@/lib/game/ship/modules/thrusters/SecondaryExhaustEmitter";
import type {SystemsStatusInfo} from "@/lib/storage/SystemsStatusStore";

export default class ThrustersModule extends BaseShipModule {
    protected _baseTileIndex = 48;
    protected _system: keyof SystemsStatusInfo = 'thrusters';

    tileIndex = this._baseTileIndex;
    tileSize = vec2(32, 32);
    size = vec2(32, 32);

    private readonly _exhaustEmitters: ExhaustEmitter[] = [];

    constructor(init) {
        super(init);

        this._exhaustEmitters = new Array(3)
            .fill(null)
            .map((_, index) => {
                const isPrimary = index === 0;

                return isPrimary
                    ? new ExhaustEmitter({game: this.game, position: vec2(0, 0)})
                    : new SecondaryExhaustEmitter({game: this.game, position: vec2(0, 0)});
            });

        this._exhaustEmitters.forEach((emitter, index) => {
            this.addChild(
                emitter as any,
                vec2(
                    index === 0
                        ? 0
                        : index === 1
                            ? -ThrustersModule.enginesOffset
                            : ThrustersModule.enginesOffset,
                    -10
                ),
                PI
            );
        });

        this.game.systems.store.subscribe(systems => this._onSystemsUpdated(systems));
    }

    /**
     * Update the exhaust emitters based on the current system status.
     * @param systems Systems status.
     * @private
     */
    private _onSystemsUpdated(systems: SystemsStatusInfo) {
        // This method might be called before the exhaust emitters are initialized.
        if (!this._exhaustEmitters)
            return;

        const thrusters = systems.thrusters;
        const damageOffset = this.tileIndex - this._baseTileIndex;

        this._exhaustEmitters.forEach((emitter, index) => {
            emitter.scale(thrusters.energy / thrusters.maxEnergy);
            emitter.toggle(thrusters.active && this._exhaustEmitters.length - index > damageOffset);
        })
    }

    /**
     * Update the module and the exhaust emitters.
     * @override This method is overridden in order for both exhaust emitters and the module itself to be updated.
     * @protected
     */
    protected _onStateChange() {
        super._onStateChange();

        // Trigger an update of the exhaust emitters.
        this._onSystemsUpdated(this.game.systems.store.values);
    }

    get exhaust() {
        return this._exhaustEmitters;
    }

    private static readonly enginesOffset = 6;
}