import {writable} from "svelte/store";

export interface ResourcesInfo {
    integrity: number;
    crew: number;
    matter: number;
    food: number;
}

export const resourcesStore = writable<ResourcesInfo>({
    integrity: 100,
    crew: 100,
    matter: 100,
    food: 100
});