import type GameEvent from "@/lib/game/events/entities/GameEvent";
import {writable} from "svelte/store";

export interface ActiveDecisionInfo {
    decision: GameEvent | null;
}

export const activeDecisionStore = writable<ActiveDecisionInfo>({
    decision: null
});