"use strict";
const nodemcuSwitchAccessory_1 = require("./nodemcuSwitchAccessory");
const settings_1 = require("./settings");
//import { API, HAP } from 'homebridge';
//import { PLATFORM_NAME } from './settings';
//import { nodemcu } from './platform';
/**
 * This method registers the platform with Homebridge
 */
/*
 * IMPORTANT NOTICE
 *
 * One thing you need to take care of is, that you never ever ever import anything directly from the "homebridge" module (or the "hap-nodejs" module).
 * The above import block may seem like, that we do exactly that, but actually those imports are only used for types and interfaces
 * and will disappear once the code is compiled to Javascript.
 * In fact you can check that by running `npm run build` and opening the compiled Javascript file in the `dist` folder.
 * You will notice that the file does not contain a `... = require("homebridge");` statement anywhere in the code.
 *
 * The contents of the above import statement MUST ONLY be used for type annotation or accessing things like CONST ENUMS,
 * which is a special case as they get replaced by the actual value and do not remain as a reference in the compiled code.
 * Meaning normal enums are bad, const enums can be used.
 *
 * You MUST NOT import anything else which remains as a reference in the code, as this will result in
 * a `... = require("homebridge");` to be compiled into the final Javascript code.
 * This typically leads to unexpected behavior at runtime, as in many cases it won't be able to find the module
 * or will import another instance of homebridge causing collisions.
 *
 * To mitigate this the {@link API | Homebridge API} exposes the whole suite of HAP-NodeJS inside the `hap` property
 * of the api object, which can be acquired for example in the initializer function. This reference can be stored
 * like this for example and used to access all exported variables and classes from HAP-NodeJS.
 */
let hap;
class nodemcu {
    constructor(log, config, api) {
        this.log = log;
        log.debug("API " + api.serverVersion);
        // probably parse config or something here
        this.config = config;
        this.nodemcuConfig = config;
        if (!this.nodemcuConfig.switches) {
            log.info("No config for switches yet. Go to settings and start configuring");
        }
        log.info("nodeMCU Platform finished initializing!");
    }
    /*
     * This method is called to retrieve all accessories exposed by the platform.
     * The Platform can delay the response my invoking the callback at a later time,
     * it will delay the bridge startup though, so keep it to a minimum.
     * The set of exposed accessories CANNOT change over the lifetime of the plugin!
     */
    accessories(callback) {
        this.log.info("Adding accessory " + this.config.name + " / " + this.config.displayName);
        if (!this.nodemcuConfig.switches) {
            this.log.info("No config for switches yet. Return no accessory.");
            callback([]);
        }
        else {
            callback([
                new nodemcuSwitchAccessory_1.nodemcuSwitchAccessory(hap, this.log, this.config),
            ]);
        }
    }
}
module.exports = (api) => {
    hap = api.hap;
    api.registerPlatform(settings_1.PLATFORM_NAME, nodemcu);
};
//# sourceMappingURL=index.js.map