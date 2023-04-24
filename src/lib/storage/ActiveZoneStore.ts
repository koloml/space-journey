import type BaseZone from "@/lib/game/base/BaseZone";
import {writable} from "svelte/store";

export interface ActiveZoneInfo {
    zone: BaseZone | null;
}

export const activeZoneStore = writable<ActiveZoneInfo>({
    zone: null
})