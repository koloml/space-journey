import {writable} from "svelte/store";

export interface ResourcesInfo {
    hull: number;
    crew: number;
    food: number;
    materials: number;
}

export const createDefaultResourcesInfo = (): ResourcesInfo => ({
    hull: 100,
    crew: 100,
    food: 100,
    materials: 100
});

export const resourcesStore = writable<ResourcesInfo>(
    createDefaultResourcesInfo()
);