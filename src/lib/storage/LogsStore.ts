import {writable} from "svelte/store";

export interface LogEntry {
    text: string;
    timestamp: string;
}

export const logsStore = writable<LogEntry[]>([{
    text: 'test',
    timestamp: Date.now().toString(36),
}]);