import commonConfig from "./common-config"

let config = commonConfig;

config["debug"] = true;
config["testing"] = true;
config["apiURL"] = 'http://localhost:8080/';

export default config;
