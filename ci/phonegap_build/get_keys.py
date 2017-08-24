#!/usr/bin/env python

import phonegap
import os

if __name__ == '__main__':

    phonegap_token = os.environ['PHONEGAP_TOKEN']
    app_id = os.environ['PHONEGAP_APP_ID']

    api = phonegap.API(app_id, phonegap_token)

    if not api.check_auth_token():
        print 'The auth_token you provided does not give access to Phonegap Build.'
        exit()

    if not api.check_app_access():
        print 'The auth_token you provided does not give access to the target app.'
        exit()

    response = api.get_app()
    keys = response.json()['keys']

    ios_key =  keys[phonegap.Platform.IOS]
    android_key = keys[phonegap.Platform.ANDROID]

    if 'id' in ios_key:
        print 'iOS key is: "' + ios_key['title'] + '" with id: ' + str(ios_key['id'])
    else:
        print 'No key selected for iOS'

    if 'id' in android_key:
        print 'Android key is: "' + android_key['title'] + '" with id: ' + str(android_key['id'])
    else:
        print 'No key selected for Android'
