import BaseShipModule from "@/lib/game/ship/base/BaseShipModule";
import GameParticleEmitter from "@/lib/littlejs/GameParticleEmitter";
import type GameObject from "@/lib/littlejs/GameObject";

export default class ThrustersModule extends BaseShipModule {
    tileIndex = 48;
    tileSize = vec2(32, 32);
    size = vec2(32, 32);

    _particleEmitters: GameParticleEmitter[] = [];

    constructor(init) {
        super(init);

        const emitSizePrimary = 5;
        const emitSizeSecondary = 3;

        const emitRatePrimary = 600;
        const emitRateSecondary = 200;

        const colorPrimary = new Color(0.443, 0.482, 0.612, 0.7);
        const colorSecondary = new Color(0.259, 0.282, 0.421, 0.5);

        this._particleEmitters = new Array(3)
            .fill(null)
            .map((_, index) => {
                const isPrimary = index === 0;
                const color = isPrimary ? colorPrimary : colorSecondary;
                const colorTransparent = new Color(color.r, color.g, color.b, 0);

                return new GameParticleEmitter({
                    game: this.game,
                    position: vec2(0, 0),
                    emitConeAngle: .5,
                    emitSize: isPrimary ? emitSizePrimary : emitSizeSecondary,
                    emitRate: isPrimary ? emitRatePrimary : emitRateSecondary,
                    speed: isPrimary ? 0.5 : 0.3,
                    renderOrder: -1,
                    colorStartA: color,
                    colorStartB: color,
                    colorEndA: colorTransparent,
                    colorEndB: colorTransparent,
                    randomness: 0.9,
                    sizeStart: 1,
                    sizeEnd: 1
                });
            });

        this._particleEmitters.forEach((emitter, index) => {
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
        })
    }

    private static enginesOffset = 6;
}