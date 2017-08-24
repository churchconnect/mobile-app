# The Phonegap module. Contains an api class that wraps around the Phonegap Build REST API

import requests
import time
import shutil
import json

class Platform:
    ANDROID = "android"
    IOS = "ios"

class API:
    API_URL="https://build.phonegap.com/api/v1"
    BUILD_STATUS_CHECK_INTERVAL = 5

    def __init__(self, app_id, auth_token, debug = False):
        self.app_id = app_id
        self.auth_token = auth_token
        self.debug = debug

    def auth_param(self):
        return "auth_token=" + self.auth_token

    def url(self, endpoint):
        url = self.API_URL + endpoint + '?' + self.auth_param()
        if self.debug: print "requesting url: " + url
        return url

    def app_url(self):
        return self.url('/apps/' + self.app_id)

    def build_url(self, platform):
        return self.url('/apps/' + self.app_id + '/' + platform)

    def get_me(self):
        return requests.get(self.url('/me'))

    def check_auth_token(self):
        response = self.get_me()
        if self.debug: print json.dumps(response.json(), indent=4)
        return response.status_code == requests.codes.ok

    def get_app(self):
        return requests.get(self.app_url())

    def check_app_access(self):
        response = self.get_app()
        if self.debug: print json.dumps(response.json(), indent=4)
        return response.status_code == requests.codes.ok

    # For some fairly crazy seeming reason, serializing json into the payload doesn't seem to quite work.
    # It appears the payload, is essentially a form field that has something like json passed into it... but not real json.
    def key_payload(self, key):
        return 'data=' + json.dumps(key)

    def unlock_signing_key(self, key_id, platform, key_password, keystore_password = None):
        key = {}

        if platform == Platform.IOS:
            key['password'] = key_password

        if platform == Platform.ANDROID:
            key['key_pw'] = key_password
            key['keystore_pw'] = keystore_password

        response = requests.put(self.url('/keys/' + platform + '/' + key_id),
                                data=self.key_payload(key),
                                headers={'Content-Type': 'application/x-www-form-urlencoded'}
                                )

        if self.debug: print json.dumps(response.json(), indent=4)

        return 'locked' in response.json() and response.json()['locked'] == False

    def upload_code(self, file):
        response = requests.put(self.app_url(), files={'file': file})
        if self.debug: print json.dumps(response.json(), indent=4)
        return response.status_code == requests.codes.ok

    def build_status(self, platform = None):
        response = requests.get(self.app_url())
        if self.debug: print json.dumps(response.json(), indent=4)
        status = response.json()['status']

        if self.debug: print json.dumps(status, indent=4)

        if platform in status: return status['platform']
        return Status(status)

    def is_build_done(self, platform = None):
        status = self.build_status()
        return status.is_done(platform)

    def wait_for_build_done(self, platform = None):
        while not self.is_build_done(platform):
            time.sleep(self.BUILD_STATUS_CHECK_INTERVAL)

    def save_build(self, platform, filename):
        self.wait_for_build_done(platform)
        if self.build_status().has_error(platform): return False

        response = requests.get(self.build_url(platform), stream=True)
        with open(filename, 'wb') as file:
            response.raw.decode_content = True
            shutil.copyfileobj(response.raw, file)

        return True

class Status:
    PENDING = 'pending'
    COMPLETED = 'complete'

    def __init__(self, status_map):
        self.status_map = status_map

    def is_done(self, platform = None):
        if platform in self.status_map:
            return self.status_map[platform] != self.PENDING
        else:
            for status in self.status_map:
                if status == self.PENDING: return False
            return True

    def has_error(self, platform):
        return self.status_map[platform] != self.COMPLETED

    def is_ios_done(self):
        self.is_done(Platform.IOS)

    def is_android_done(self):
        self.is_done(Platform.ANDROID)
