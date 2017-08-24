# Deploying the ChurchConnect App

## Contentful

Sharptop will clone the default Contentful space and create an account for the church to use to access and modify the content. Thereafter either Sharptop or the church's IT staff can perform the deployment of the application.

< How to clone a space >

## API

See the installation and deployment process in the API repo's README.md file. 
Also review the `grails-app/services/FeedService.groovy` file for any changes that need to be made. At the very least this will include the live streaming link.

## Customize the app for the new church

* create a branch off the master branch of the app for your church.
    * e.g. `git checkout -b trbc-prod`
* change giving urls:
    * the route in `src/common-config.js`: 
        ```javascript
        routes: [
            ...
            {name: 'https://pushpay.com/p/thomasroadbaptistchurch', title: 'Giving', nav: true, icon: 'heart', auth: false},
        ]
        ```
    * the tab definition in `src/common-config.js`:
        ```javascript
        tabs: [
            {label: 'Giving', href: 'https://pushpay.com/p/thomasroadbaptistchurch', icon: 'heart'}
        ]
        ```
    * the card link in `src/pages/home.js`:
        ```javascript
        give() {
            this.followLink('https://pushpay.com/p/thomasroadbaptistchurch')
        }
        ```
* change apiUrl in `src/common-config.js`:
    ```javascript
    apiUrl: 'http://church-api-dev.us-east-1.elasticbeanstalk.com/',
    ```
* change app title in `src/app.html`:
    ```html
    <div class="center sliding">TRBC</div>
    ```
* change the contact details in `src/pages/contact.html`

Commit and push your changes:
* `git add .`
* `git commit` (and give a meaningful commit message)
* `git push origin {your branch name}`

## Prepare the App for building

The app is currently built into [the church-connect-phonegap repo](https://bitbucket.org/churchconnectapp/church-connect-phonegap) to run as a cordova application. This step may seem unnecessary, but the advantage is that it keeps build artifacts out of the main repository.

Also, the steps below are now executed by a pipeline build. You will still need to customize your cordova `config.xml` file, but otherwise, commit the app repo up on your own branch, and it will build. You may have to create a branch on the phonegap repo ahead of the build if you don't already have one.

* make sure you have the prerequisites installed:
    * Cordova -- `npm install -g cordova`
    * Aurelia cli -- `npm install -g aurelia-cli`
* clone the repo into the `cordova-app` subdirectory of this repo.
    * `git clone git@bitbucket.org:churchconnectapp/church-connect-phonegap.git cordova-app`
* in the cordova-app directory, create a branch off the master branch of the app for your church.
    * e.g. `git checkout -b trbc-prod`
* customize the cordova configuration in `config.xml`:
    * the id of the widget element
    * the value of the name element
    * the value of the description element
    ```xml
    <widget id="co.sharptop.church.connectApp" version="16.11.12" xmlns="http://www.w3.org/ns/widgets">
    <name>ChurchConnect</name>
    <description>
        A sample Apache Cordova application that responds to the deviceready event.
    </description>
    ```
* make sure both cordova-app and church-connect-app are on the same branch.
* in church-connect-app, run the `build_cordova` script:
    * `./build_cordova`
* go back into the cordova-app repo and commit up the changes that have been made.
    * `cd cordova-app`
    * `git add .`
    * `git commit` ( provide a meaningful commit message, although this one doesn't matter so much)
    * `git push origin {your branch name}`

## Build the app using Phonegap Build

We use phonegap build to build the respective platform applications. This is not the only way to do it, but it makes the process significantly simpler.

* Create an Adobe ID or use an existing account
* Go to https://build.phonegap.com/apps and sign up
* Under the person menu (top right), go to Edit Account
* connect Bitbucket
* Create a new application, and paste the url to the church-connect-phonegap repo into the appropriate box.
* Make sure to configure your church's branch.
* At this point Phonegap will build an unsigned android apk. We will discuss signed apps later.

## Customizing icon and splash screens.

* use [ApeTools](http://apetools.webprofusion.com/tools/imagegorilla) to create the device-specific icons and splash screens that the application will need:
    * select / create a 2048x2048 image for the splash screen
    * select / create a 1024x1024 image for the icon
    * run those files through the tool
    * copy the files into the hierarchy of the `cordova-app/res` folder.
    * commit up those changes.
    
## Building a signed android app

* if you don't already have an .keystore file for your application, generate one using the instructions [here](https://developer.android.com/studio/publish/app-signing.html) under "Build and sign your app from the command line."
* upload the keystore to phonegap build. This will now enable you to build signed android APK files.

## Building a signed iOS app (for development or release)

* if you already have access to provisioning profiles for an existing app you are updating, simply upload the .cer and .p12 files into phonegap build, and you will be able to choose to build development or release signed .ipa files.
* if you don't have one, create a new one using [these instructions](http://docs.telerik.com/platform/appbuilder/cordova/code-signing-your-app/configuring-code-signing-for-ios-apps/create-development-provisioning-profile)
* See [this article](https://www.raywenderlich.com/127936/submit-an-app-part-1) for more information on setting up an iOS app.

## Create Play Store Listing for Android App

To create a Google Play Store listing, you will need:

* an icon: 512x512 PNG
* 2 Screenshots of the app running for your church
* a feature Graphic: 1024x500 
* a signed apk from phonegap

## Create an Apple App Store Listing

* Create a new app in iTunes Connect
* submit build using application loader (a separate application for uploading ipa files)
* submit screenshots (they can be taken using quicktime )
* upload an app icon -- jpg or png (no rounded corners)
* you will need at least one 12.9 retina ipad pro screenshot even though the app is targeted at iPhones.

