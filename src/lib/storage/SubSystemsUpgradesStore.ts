import {writable} from "svelte/store";

export interface SubSystemsUpgradesInfo {
    medical: number;
    radar: number;
    repair: number
}

export const createDefaultSubSystemsUpgradesInfo = (): SubSystemsUpgradesInfo => ({
    medical: 0,
    radar: 0,
    repair: 0
});

export const subSystemsUpgradesStore = writable<SubSystemsUpgradesInfo>(
    createDefaultSubSystemsUpgradesInfo()
);