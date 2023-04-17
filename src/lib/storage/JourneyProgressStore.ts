import {writable} from "svelte/store";

export interface JourneyProgressInfo {
    distance: number;
    traveled: number;
}

export const journeyProgressStore = writable<JourneyProgressInfo>({
    distance: 100,
    traveled: 1,
});