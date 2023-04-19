import {writable} from "svelte/store";

export interface ResourcesInfo {
    hull: number;
    crew: number;
    food: number;
    materials: number;
}

export const resourcesStore = writable<ResourcesInfo>({
    hull: 100,
    crew: 100,
    food: 100,
    materials: 100
});