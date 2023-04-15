import {logsStore} from "@/lib/storage/logs";

export interface GameInit {
}

export default class Game {
    private _logsStore = logsStore;

    constructor(init: GameInit = {}) {

    }
}