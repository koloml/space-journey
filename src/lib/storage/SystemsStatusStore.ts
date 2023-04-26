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

export interface SystemsStatusInfo<StatusType = SystemStatus> {
    /**
     * Status of the farm module.
     */
    farms: StatusType;
    /**
     * Status of the defence module.
     */
    shield: StatusType;
    /**
     * Status of the propulsion module.
     */
    thrusters: StatusType;
    /**
     * Status of the generator module.
     */
    generator: StatusType;
}

const defaultSystemStatus = (overrides: Partial<SystemStatus> = {}): SystemStatus => {
    return Object.assign({
        active: true,
        energy: 1,
        maxEnergy: 2,
        repairCost: {
            materials: 5
        },
        repairable: true
    }, overrides);
}

export const createDefaultSystemsStatusInfo = (): SystemsStatusInfo => ({
    farms: defaultSystemStatus(),
    generator: defaultSystemStatus({
        energy: 2,
        maxEnergy: 3
    }),
    shield: defaultSystemStatus(),
    thrusters: defaultSystemStatus({
        maxEnergy: 3
    }),
})

export const systemsStatusStore = writable<SystemsStatusInfo>(
    createDefaultSystemsStatusInfo()
);