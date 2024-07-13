import { Configuration } from "../../utils/Configuration";

export const appConfig: Partial<Configuration> = {};

export const initializeConfig = (configuration: Configuration) => {
    Object.assign(appConfig, configuration);
    console.log('Configuration initialized ', appConfig);
}
