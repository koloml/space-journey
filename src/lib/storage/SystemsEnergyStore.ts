import {writable} from "svelte/store";

export interface SystemsEnergyInfo {
    farms: number;
    defence: number;
    propulsion: number;
    generator: number;
}

export const systemsEnergyStore = writable<SystemsEnergyInfo>({
    farms: 2,
    defence: 1,
    propulsion: 0,
    generator: 1
});