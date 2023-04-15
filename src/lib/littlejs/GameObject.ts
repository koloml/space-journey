import type Game from "@/lib/game/Game";

export interface GameObjectInit {
    game: Game;
    position?: Vector2;
    size?: Vector2;
    tileIndex?: number;
    tileSize?: Vector2;
    angle?: number;
    color?: Color;
    renderOrder?: number;
}

/**
 * Base game object with more comfortable constructor.
 *
 * @see {@link EngineObject} for more information about the properties.
 */
export default class GameObject extends EngineObject {
    protected game: Game;

    constructor(init: GameObjectInit) {
        super(
            init.position,
            init.size,
            init.tileIndex,
            init.tileSize,
            init.angle,
            init.color,
            init.renderOrder
        );

        this.game = init.game;
    }
}