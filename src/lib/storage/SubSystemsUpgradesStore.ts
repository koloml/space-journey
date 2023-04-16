import {writable} from "svelte/store";

export interface SubSystemsUpgradesInfo {
    medical: number;
    radar: number;
}

export const subSystemsUpgradesStore = writable<SubSystemsUpgradesInfo>({
    medical: 0,
    radar: 0
});