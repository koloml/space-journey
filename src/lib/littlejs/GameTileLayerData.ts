import type Game from "@/lib/game/Game";

export interface GameTileLayerDataInit {
    game: Game;
    tile?: number;
    direction?: number;
    mirror?: boolean;
    color?: Color;
}

export default class GameTileLayerData extends TileLayerData {
    protected _game: Game;

    constructor(init: GameTileLayerDataInit) {
        super(
            init.tile,
            init.direction,
            init.mirror,
            init.color
        );

        this._game = init.game;
    }
}