import commonConfig from "./common-config"

let config = commonConfig;

config["debug"] = true;
config["testing"] = false;
config['apiUrl'] = "{apiUrl}";
config["googleMapsApiKey"] = "{googleMapsApiKey}";

export default config;
