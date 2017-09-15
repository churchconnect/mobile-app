#!/usr/bin/env python

from bs4 import BeautifulSoup
import sys

if len(sys.argv) < 2:
    print "Please specify url of .ipa file as first argument to this script."
    exit()

ipa_url = sys.argv[1]

with open('config.xml', 'r') as config_file:
    soup = BeautifulSoup(config_file.read(), 'xml')

    widget = soup.find('widget')

    if widget is None:
        print "Could not find 'widget' in config.xml"
        exit()

    app_id = widget.get('id')

    if app_id is None:
        print "Could not find attribute 'id' on 'widget' in config.xml"
        exit()


    name_node = soup.find('name')

    if name_node is None:
        print "Could not find 'name' in config.xml"
        exit()

    app_name = name_node.text

    print 'Generating manifest.plist for ' + app_name + ' (' + app_id + ')'

    with open('manifest.plist', 'w') as manifest_file:
        manifest_file.write('''\
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>items</key>
    <array>
        <dict>
            <key>assets</key>
            <array>
                <dict>
                    <key>kind</key>
                    <string>software-package</string>
                    <key>url</key>
                    <string>''' + ipa_url +'''</string>
                </dict>
            </array>
            <key>metadata</key>
            <dict>
                <key>bundle-identifier</key>
                <string>''' + app_id + '''</string>
                <key>kind</key>
                <string>software</string>
                <key>title</key>
                <string>''' + app_name + '''</string>
            </dict>
        </dict>
    </array>
</dict>
</plist>''')
