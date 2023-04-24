import {writable} from "svelte/store";

export interface TotalEnergyInfo {
    totalEnergy: number;
    maxUnusedEnergy: number;
    energyProgress: number;
    energyProgressMax: number;
}

export const createDefaultTotalEnergyInfo = (): TotalEnergyInfo => ({
    totalEnergy: 6,
    maxUnusedEnergy: 16,
    energyProgress: 0,
    energyProgressMax: 500
});

export const totalEnergyStore = writable<TotalEnergyInfo>(
    createDefaultTotalEnergyInfo()
)