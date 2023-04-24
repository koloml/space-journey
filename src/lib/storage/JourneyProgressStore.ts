import {writable} from "svelte/store";

export interface JourneyProgressInfo {
    distance: number;
    traveled: number;
}

export const createDefaultJourneyProgressInfo = (): JourneyProgressInfo => ({
    distance: 100,
    traveled: 0,
});

export const journeyProgressStore = writable<JourneyProgressInfo>(
    createDefaultJourneyProgressInfo()
);