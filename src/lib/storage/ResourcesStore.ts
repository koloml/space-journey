import {writable} from "svelte/store";

export interface ResourcesInfo {
    integrity: number;
    crew: number;
    food: number;
    matter: number;
}

export const resourcesStore = writable<Partial<ResourcesInfo>>({});