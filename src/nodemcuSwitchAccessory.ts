import {AccessoryPlugin, CharacteristicGetCallback, CharacteristicSetCallback, PlatformConfig, CharacteristicValue, HAP, Logging, Service, CharacteristicEventTypes} from "homebridge";
import { nodemcuConfig } from "./configTypes";
import request = require("superagent");
import cacheModule = require("cache-service-cache-module");
import superagentCache = require("superagent-cache-plugin");
  
const cache = new cacheModule({ storage: "session", defaultExpiration: 60 });
const sacache = superagentCache(cache);
  
export class nodemcuSwitchAccessory implements AccessoryPlugin {
  
    // Require and instantiate a cache module
  
    // Require superagent-cache-plugin and pass your cache module
    private readonly log: Logging;
  
    private switchOn = false;
    name: string;
    nodemcuConfig: nodemcuConfig;
    numberOfSwitches: number;
  
    // private readonly switchService: Service;
    private readonly services: Service[];
  
  
    constructor(hap: HAP, log: Logging, config: PlatformConfig) {
  
      // Force this to modemcuConfig.
      this.log = log;
      this.nodemcuConfig = <unknown>config as nodemcuConfig;
      if ( !this.nodemcuConfig.switches ) {
        log.info("No config yet. Go to settings and start configuring");
        this.numberOfSwitches = 0;
        this.services = new Array<Service>();
        this.name = "no-config";
      }
      else {
        this.name = this.nodemcuConfig.name;
        this.numberOfSwitches = this.nodemcuConfig.switches.length;
        log.info("Found " + this.numberOfSwitches + " lights in your config");
  
        this.services = new Array<Service>(this.numberOfSwitches);
  
        //log.debug("nu stiu ce face aici " + this.nodemcuConfig.switches[0].name);
        log.info("Registering  " + this.numberOfSwitches + " switches with base URL %s", this.nodemcuConfig.baseurl);
  
        this.nodemcuConfig.switches.forEach(aSwitch => {
          log.debug("Starting to configure Service " + aSwitch.name);
          const switchService: Service = new hap.Service.Switch(aSwitch.name, aSwitch.name);
          //let switchService = new hap.Service.Switch(aSwitch.name, aSwitch.name)
          log.debug("Config 1 " + aSwitch.name);
          const statusUrl: string = this.nodemcuConfig.baseurl + aSwitch.statusUrl;
          log.debug("Config 2 " + aSwitch.name);
          const onUrl: string = this.nodemcuConfig.baseurl + aSwitch.onUrl;
          log.debug("Config 3 " + aSwitch.name);
          const offUrl: string = this.nodemcuConfig.baseurl + aSwitch.offUrl;
          log.debug("Config 4 " + aSwitch.name);
  
          switchService.getCharacteristic(hap.Characteristic.On)
            .on(CharacteristicEventTypes.GET, (callback: CharacteristicGetCallback) => {
              log.debug("Current state of the switch was returned: " + (this.switchOn ? "on" : "off"));
              this.getRemoteState(aSwitch.httpMethod, statusUrl, log, result => { log.info("Got remote state as " + result); callback(undefined, result) });
            })
            .on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
              this.switchOn = value as boolean;
              this.getRemoteState(aSwitch.httpMethod, (this.switchOn ? onUrl : offUrl), log, result => { log.debug("Got remote state as " + result); callback(undefined, result) });
              log.info("Switch state " + aSwitch.name + " was set to: " + (this.switchOn ? "ON" : "OFF"));
            });
  
          this.services.push(switchService);
          log.info(" + Adding Service " + aSwitch.name);
        });
  
        this.services.push(new hap.Service.AccessoryInformation()
          .setCharacteristic(hap.Characteristic.Manufacturer, this.nodemcuConfig.manufacturer)
          .setCharacteristic(hap.Characteristic.Model, this.nodemcuConfig.model));
  
        log.debug("Crib '%s' created, model: '%s' from manufacturer '%s'", this.nodemcuConfig.name, this.nodemcuConfig.model, this.nodemcuConfig.manufacturer);
      }
    }
  
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getRemoteState(httpMethod: string, url: string, log: Logging, callback): void {
      log.debug("HTTP REQUEST CALLING " + url + " Cache:" + this.nodemcuConfig.cacheExpiration);
      request(httpMethod, url)
        .set("Accept", "application/json")
        .use(sacache)
        .expiration(this.nodemcuConfig.cacheExpiration)
        .end(function (err, res, key) {
          if (err) {
            log.warn("HTTP failure " + key);
            log.warn(err);
          } else {
            log.debug("HTTP success Light on is %s", res.body.on);
            callback(res.body.on);
          }
        });
    }
  
  
    /*
     * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
     * Typical this only ever happens at the pairing process.
     */
    identify(): void {
      this.log("Identify!");
    }
  
    /*
     * This method is called directly after creation of this instance.
     * It should return all services which should be added to the accessory.
     */
    getServices(): Service[] {
      this.log("Number of services are " + this.services.length);
      return this.services;
    }
  
  }