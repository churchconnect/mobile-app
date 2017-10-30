#!/usr/bin/env python

import phonegap
import os
import argparse

if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('zipfile', type=argparse.FileType('rb'))
    args = parser.parse_args()

    phonegap_token = os.environ['PHONEGAP_TOKEN']
    app_id = os.environ['PHONEGAP_APP_ID']

    android_key = {
        'id': os.environ['PHONEGAP_ANDROID_KEY_ID'],
        'password': os.environ['PHONEGAP_ANDROID_KEY_PASSWORD'],
        'keystore_pw': os.environ['PHONEGAP_ANDROID_KEYSTORE_PASSWORD']
    }

    ios_key =  {
        'id': os.environ['PHONEGAP_IOS_KEY_ID'],
        'password': os.environ['PHONEGAP_IOS_KEY_PASSWORD']
    }

    api = phonegap.API(app_id, phonegap_token)

    if not api.check_auth_token():
        print 'The auth_token you provided does not give access to Phonegap Build.'
        exit()

    if not api.check_app_access():
        print 'The auth_token you provided does not give access to the target app.'
        exit()

    if not api.unlock_signing_key(android_key['id'], phonegap.Platform.ANDROID, android_key['password'], android_key['keystore_pw']):
        print 'Failed to unlock Android signing key'
        exit()

    if not api.unlock_signing_key(ios_key['id'], phonegap.Platform.IOS, ios_key['password']):
        print 'Failed to unlock iOS signing key'
        exit()

    if not api.build_code(args.zipfile, android_key['id'], ios_key['id']):
        print 'Failed to trigger build correctly'
        exit()

    print 'Android Build downloaded successfully' if api.save_build(phonegap.Platform.ANDROID, 'android.apk') else 'Failed to download Android Build'

    print 'iOS Build downloaded successfully' if api.save_build(phonegap.Platform.IOS, 'iphone.ipa') else 'Failed to download iOS Build'
