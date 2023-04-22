import type GameEvent from "@/lib/game/events/entities/GameEvent";
import {writable} from "svelte/store";

export interface ActiveDecisionInfo {
    decision: GameEvent;
}

export const activeDecisionStore = writable<ActiveDecisionInfo | null>(null);