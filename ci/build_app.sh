#!/bin/bash

ZIP_FILENAME=phonegap_code.zip

cd www/
npm install
au build --env prod
cd ../
zip -r $ZIP_FILENAME \
    config.xml \
    splash.png \
    res/ \
    www/index.html \
    www/scripts/ \
    www/fonts \
    www/node_modules/aurelia-ui-components/dist \
    www/node_modules/font-awesome \
    www/node_modules/framework7/dist

ci/phonegap_build/build.py $ZIP_FILENAME
