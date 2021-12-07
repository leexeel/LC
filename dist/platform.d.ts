import { AccessoryPlugin, API, Logging, PlatformConfig, StaticPlatformPlugin } from "homebridge";
import { nodemcuConfig } from "./configTypes";
export declare class nodemcu implements StaticPlatformPlugin {
    private readonly log;
    private readonly config;
    nodemcuConfig: nodemcuConfig;
    constructor(log: Logging, config: PlatformConfig, api: API);
    accessories(callback: (foundAccessories: AccessoryPlugin[]) => void): void;
}
//# sourceMappingURL=platform.d.ts.map