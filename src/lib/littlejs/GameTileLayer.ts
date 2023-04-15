import type Game from "@/lib/game/Game";

export interface GameTileLayerInit {
    game: Game;
    position: Vector2;
    size?: Vector2;
    tileSize?: Vector2;
    scale?: Vector2;
    renderOrder?: number;
}

export default class GameTileLayer extends TileLayer {
    protected _game: Game;

    constructor(init: GameTileLayerInit) {
        super(
            init.position,
            init.size,
            init.tileSize,
            init.scale,
            init.renderOrder
        );

        this._game = init.game;
    }
}