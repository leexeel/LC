import { AccessoryPlugin, PlatformConfig, HAP, Logging, Service } from "homebridge";
import { nodemcuConfig } from "./configTypes";
export declare class nodemcuSwitchAccessory implements AccessoryPlugin {
    private readonly log;
    private switchOn;
    name: string;
    nodemcuConfig: nodemcuConfig;
    numberOfSwitches: number;
    private readonly services;
    constructor(hap: HAP, log: Logging, config: PlatformConfig);
    getRemoteState(httpMethod: string, url: string, log: Logging, callback: any): void;
    identify(): void;
    getServices(): Service[];
}
//# sourceMappingURL=nodemcuSwitchAccessory.d.ts.map