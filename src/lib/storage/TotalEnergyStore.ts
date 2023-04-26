import {writable} from "svelte/store";

export interface TotalEnergyInfo {
    totalEnergy: number;
    maxUnusedEnergy: number;
    energyProgress: number;
    energyProgressMax: number;
}

export const createDefaultTotalEnergyInfo = (): TotalEnergyInfo => ({
    totalEnergy: 8,
    maxUnusedEnergy: 16,
    energyProgress: 0,
    energyProgressMax: 600
});

export const totalEnergyStore = writable<TotalEnergyInfo>(
    createDefaultTotalEnergyInfo()
)