import {writable} from "svelte/store";
import type {ResourcesInfo} from "@/lib/storage/ResourcesStore";

export interface LogEntry {
    text: string;
    timestamp: string;
    resources?: Partial<ResourcesInfo>;
}

export const createDefaultLogsInfo = (): LogEntry[] => [];

export const logsStore = writable<LogEntry[]>(
    createDefaultLogsInfo()
);