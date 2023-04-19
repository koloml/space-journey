import type {ResourcesInfo} from "@/lib/storage/ResourcesStore";
import {writable} from "svelte/store";

/**
 * Detailed information about the module, its energy consumption, activity, repair availability & cost.
 */
export interface SystemStatus {
    /**
     * Amount of the energy consumed by this module.
     */
    energy: number;
    /**
     * Max energy available for this module to consume.
     */
    maxEnergy: number;
    /**
     * Is this module is in working condition.
     */
    active: boolean;
    /**
     * Is this module can be repaired.
     */
    repairable: boolean;
    /**
     * Repair cost for this module.
     */
    repairCost: Partial<ResourcesInfo>;
}

export interface SystemsStatusInfo {
    /**
     * Status of the farm module.
     */
    farms: SystemStatus;
    /**
     * Status of the defence module.
     */
    defence: SystemStatus;
    /**
     * Status of the propulsion module.
     */
    propulsion: SystemStatus;
    /**
     * Status of the generator module.
     */
    generator: SystemStatus;
}

const defaultSystemStatus = (overrides: Partial<SystemStatus> = {}): SystemStatus => {
    return Object.assign({
        active: true,
        energy: 3,
        maxEnergy: 3,
        repairCost: {},
        repairable: true
    }, overrides);
}

export const systemsStatusStore = writable<SystemsStatusInfo>({
    farms: defaultSystemStatus(),
    generator: defaultSystemStatus(),
    defence: defaultSystemStatus(),
    propulsion: defaultSystemStatus(),
})