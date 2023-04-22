import type Game from "@/lib/game/Game";
import type StorageWrapper from "@/lib/game/stores/StorageWrapper";

export default abstract class BaseManager<StoreType> {
    protected readonly _game: Game;
    protected _store: StorageWrapper<StoreType>;

    protected constructor(game: Game) {
        this._game = game;
    }

    abstract save();

    get store() {
        return this._store;
    }
}