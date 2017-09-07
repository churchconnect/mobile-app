import environment from "./environment";
import "node_modules/framework7/dist/js/framework7.min.js";
import {F7} from "./services/index";

//Configure Bluebird Promises.
Promise.config({
    warnings: {
        wForgottenReturn: false
    }
})

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature('resources')
        .plugin('aurelia-ui-components', config => {
            config.registerF7Instance(F7)
            config.registerGoogleMapsApiKey(environment.googleMapsApiKey)
        })
        .plugin('aurelia-api', config => {
            config.registerEndpoint(environment.endpoint, environment.apiUrl)
            config.setDefaultEndpoint(environment.endpoint)
        })
        .plugin('aurelia-authentication', config => {
            config.configure(environment)
        })
        .plugin('aurelia-validation', config => {
        })

    if (environment.debug) {
        aurelia.use.developmentLogging()
    }

    if (environment.testing) {
        aurelia.use.plugin('aurelia-testing')
    }

    if (typeof cordova === 'undefined') {
        console.log('running outside of cordova')
    } else {
        console.log('configuring cordova')
        window.open = cordova.InAppBrowser.open
    }

    aurelia.start().then(() => aurelia.setRoot())
}
