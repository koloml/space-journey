import ExhaustEmitter from "@/lib/game/ship/modules/thrusters/ExhaustEmitter";

export default class SecondaryExhaustEmitter extends ExhaustEmitter {
    baseEmitSize = 3;
    baseSpeed = 0.3;
    baseEmitRate = 300;

    // Secondary exhaust properties
    emitSize = this.baseEmitSize;
    emitRate = this.baseEmitRate;
    speed = this.baseSpeed;
    colorStartA = new Color(0.259, 0.282, 0.421, 0.5);
    colorStartB = new Color(0.259, 0.282, 0.421, 0.5);
    colorEndA = new Color(0.259, 0.282, 0.421, 0);
    colorEndB = new Color(0.259, 0.282, 0.421, 0);
}