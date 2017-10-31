#!/usr/bin/env python

import phonegap
import os
import argparse

class Environment:

    def __init__(self, development_mode = False, prefix = "PHONEGAP_", dev_prefix = "DEV_"):
        self.development_mode = development_mode
        self.prefix = prefix
        self.dev_prefix = dev_prefix

    def __str__(self):
        return ', '.join(self.__dir__())

    def __getattr__(self, name):
        if self.development_mode and self.make_dev_key(name) in os.environ:
            return os.environ[self.make_dev_key(name)]

        return os.environ[self.make_key(name)]

    def __dir__(self):
        return dir(super(object, self)) + [ self.unmake_key(k) for k in os.environ.keys() if self.prefix in k ]

    def make_dev_key(self, name):
        return self.dev_prefix + self.make_key(name)

    def make_key(self, name):
        return self.prefix + name.upper()

    def unmake_key(self, key):
        return key.replace(self.dev_prefix, "").replace(self.prefix, "").lower()


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('zipfile', type=argparse.FileType('rb'))
    parser.add_argument('--development', action="store_true")
    args = parser.parse_args()

    env = Environment(args.development)

    ios_app_filename = 'iphone.ipa'
    android_app_filename = 'android.apk'

    api = phonegap.API(env.app_id, env.token)

    if not api.check_auth_token():
        print 'The auth_token you provided does not give access to Phonegap Build.'
        exit()

    if not api.check_app_access():
        print 'The auth_token you provided does not give access to the target app.'
        exit()

    if not api.unlock_signing_key(env.android_key_id, phonegap.Platform.ANDROID, env.android_key_password, env.android_keystore_password):
        print 'Failed to unlock Android signing key'
        exit()

    if not api.unlock_signing_key(env.ios_key_id, phonegap.Platform.IOS, env.ios_key_password):
        print 'Failed to unlock iOS signing key'
        exit()

    if not api.build_code(args.zipfile, env.android_key_id, env.ios_key_id):
        print 'Failed to trigger build correctly'
        exit()

    if api.save_build(phonegap.Platform.ANDROID, android_app_filename):
        print 'Android Build downloaded successfully'
    else:
        print 'Failed to download Android Build'

    if api.save_build(phonegap.Platform.IOS, ios_app_filename):
        print 'iOS Build downloaded successfully'
    else:
        print 'Failed to download iOS Build'
