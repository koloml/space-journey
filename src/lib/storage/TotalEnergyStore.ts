import {writable} from "svelte/store";

export interface TotalEnergyInfo {
    totalEnergy: number;
    maxUnusedEnergy: number;
    energyProgress: number;
}

export const totalEnergyStore = writable<TotalEnergyInfo>({
    totalEnergy: 16,
    maxUnusedEnergy: 16,
    energyProgress: 0
})