import GameObject from "@/lib/littlejs/GameObject";
import FarmsModule from "@/lib/game/ship/modules/FarmsModule";
import GeneratorModule from "@/lib/game/ship/modules/GeneratorModule";
import ThrustersModule from "@/lib/game/ship/modules/ThrustersModule";

export default class GenerationShip extends GameObject {
    public tileSize = vec2(48, 128);
    public tileIndex = 0;
    public size = vec2(48, 128);

    private readonly _farms: FarmsModule;
    private readonly _generator: GeneratorModule;
    private readonly _thrusters: ThrustersModule;

    constructor(init) {
        super(init);

        this._generator = new GeneratorModule({game: this.game});
        this._farms = new FarmsModule({game: this.game});
        this._thrusters = new ThrustersModule({game: this.game});

        this.addChild(this._generator, vec2(0, 17));
        this.addChild(this._farms, vec2(0, -31));
        this.addChild(this._thrusters, vec2(0, -51));
    }

    update() {
        super.update();
    }
}