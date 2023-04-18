import type Game from "@/lib/game/Game";

export interface ParticleEmitterInit {
    game: Game,
    position: Vector2,
    angle?: number,
    emitSize?: number,
    emitTime?: number,
    emitRate?: number,
    emitConeAngle?: number,
    tileIndex?: number,
    tileSize?: number,
    colorStartA?: Color,
    colorStartB?: Color,
    colorEndA?: Color,
    colorEndB?: Color,
    particleTime?: number,
    sizeStart?: number,
    sizeEnd?: number,
    speed?: number,
    angleSpeed?: number,
    damping?: number,
    angleDamping?: number,
    gravityScale?: number,
    particleConeAngle?: number,
    fadeRate?: number,
    randomness?: number,
    collideTiles?: boolean,
    additive?: boolean,
    randomColorLinear?: boolean,
    renderOrder?: number
}

export default class GameParticleEmitter extends ParticleEmitter {
    protected _game: Game;

    constructor(init: ParticleEmitterInit) {
        super(
            init.position, init.angle, init.emitSize, init.emitTime, init.emitRate, init.emitConeAngle, init.tileIndex,
            init.tileSize, init.colorStartA, init.colorStartB, init.colorEndA, init.colorEndB, init.particleTime,
            init.sizeStart, init.sizeEnd, init.speed, init.angleSpeed, init.damping, init.angleDamping,
            init.gravityScale, init.particleConeAngle, init.fadeRate, init.randomness, init.collideTiles, init.additive,
            init.randomColorLinear, init.renderOrder
        );

        this._game = init.game;
    }
}