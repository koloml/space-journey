import GameParticleEmitter from "@/lib/littlejs/GameParticleEmitter";

export default class ExhaustEmitter extends GameParticleEmitter {
    emitConeAngle = .5;
    renderOrder = -1;
    randomness = 0.9;
    sizeStart = 1;
    sizeEnd = 1;

    // Base vales for changeable properties
    baseEmitSize = 5;
    baseEmitRate = 600;
    baseSpeed = 0.5;

    // Primary exhaust properties
    emitSize = this.baseEmitSize;
    emitRate = this.baseEmitRate;
    speed = this.baseSpeed;
    colorStartA = new Color(0.443, 0.482, 0.612, 0.7);
    colorStartB = new Color(0.443, 0.482, 0.612, 0.7);
    colorEndA = new Color(0.443, 0.482, 0.612, 0);
    colorEndB = new Color(0.443, 0.482, 0.612, 0);

    private _rate = 1;
    private _isActive = true;

    /**
     * Scale the exhaust emitter's overall intensity by the given rate. Scaling will be performed based on the base
     * values and not the current ones.
     * @param rate The rate to scale the exhaust emitter by.
     */
    public scale(rate: number = this._rate) {
        this._rate = rate;

        this.emitSize = Math.round(this.baseEmitSize * this._rate);
        this.emitRate = this.baseEmitRate * this._rate * +this._isActive;
        this.speed = this.baseSpeed * this._rate;
    }

    public toggle(state: boolean) {
        this._isActive = state;

        this.scale();
    }
}