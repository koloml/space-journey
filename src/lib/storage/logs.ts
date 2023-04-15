import {writable} from "svelte/store";

export interface LogEntry {
    text: string;
    timestamp: number;
}

export const logsStore = writable<LogEntry[]>([{
    text: 'test',
    timestamp: Date.now(),
}]);