export interface nodemcuSwitchConfigInterface {
    name : string,
    statusUrl: string,
    httpMethod: string,
    contentType: string,
    onUrl: string,
    offUrl: string
}

export interface nodemcuConfigInterface {
    name: string,
    baseurl: string,
    displayName: string,
    cacheExpiration: number,
    switches: nodemcuSwitchConfig[],
    model : string,
    manufacturer : string
  }

export type nodemcuConfig = Readonly<nodemcuConfigInterface>;
export type nodemcuSwitchConfig = Readonly<nodemcuSwitchConfigInterface>;