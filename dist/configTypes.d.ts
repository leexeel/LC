export interface nodemcuSwitchConfigInterface {
    name: string;
    statusUrl: string;
    httpMethod: string;
    contentType: string;
    onUrl: string;
    offUrl: string;
}
export interface nodemcuConfigInterface {
    name: string;
    baseurl: string;
    displayName: string;
    cacheExpiration: number;
    switches: nodemcuSwitchConfig[];
    model: string;
    manufacturer: string;
}
export declare type nodemcuConfig = Readonly<nodemcuConfigInterface>;
export declare type nodemcuSwitchConfig = Readonly<nodemcuSwitchConfigInterface>;
//# sourceMappingURL=configTypes.d.ts.map