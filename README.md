# Church Connect Mobile App

This is a javascript application built on the aurelia framework. We use cordova / phonegap to build the javascript into a native iOS / Android application.

For instructions on how to build and deploy this application for a new church, see the `DEPLOYMENT.md` file.

## Development Requirements:

To develop this application, you will need:

* Node/NPM (node version 5.7.1 recommended). We recommend you install it using [nvm](https://github.com/creationix/nvm)
* Aurelia CLI: `npm install -g aurelia-cli`

## Setup

The full development stack requires the API, the app (this repo), and,  our UI components library. However, for most simple tasks, you may only need to modify the app. The app is flexible enough to allow you to only work on the pieces that you actually need to change at any given point in time.

### The app (this repo)

* install node dependencies: `npm install`
* run the application locally (also watches files for changes): `npm run watch`

### API (optional)

You can develop against any running API by changing the `apiUrl` value in the `src/common-config.js` file. If you need to develop against a local API, review the installation instructions in the [API repository](https://bitbucket.org/sharptop/church-connect-api) and point the apiUrl at the local API instance.

### UI Components (optional)

* Aurelia UI Components contains a set of reusable components for this app. If adding a reusable component, add it to the UI components.
* While the library is new, modifications to it will be frequent. As it matures, the need to locally develop on the UI components will diminish.
* This is optional because the default setup of the app installs the UI components from bitbucket. The following instructions will change that.
* Clone the [ui components library](https://bitbucket.org/sharptop/aurelia-ui-components). 
* `npm install` to install its dependencies.
* `npm link` to make the global install of this package use your working directory.
* `npm run build` to build the library.
* go back to the church-connect-app directory, and `npm link aurelia-ui-components` to tell the app to use your local version of the ui components.
* When you make a change to the UI components, `npm run build`, then kill the `npm run watch` in the app, and restart it.

