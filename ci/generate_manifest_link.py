#!/usr/bin/env python

import sys
import urllib

if len(sys.argv) < 2:
    print "Please specify version label of the .ipa file as first argument to this script."
    exit()

version_label = sys.argv[1]

if len(sys.argv) < 3:
    print "Please specify the url of the manifest.plist file as second argument to this script."
    exit()

manifest_url = sys.argv[2]

print 'Generating download link file for ' + version_label + ' (' + manifest_url + ')'

with open('build_link.html', 'w') as link_file:
    link_file.write('''\
<html>
    <head>
        <title>Download ''' + version_label +'''</title>
    </head>
    <body>
        <a href="itms-services://?action=download-manifest&url=''' + urllib.quote_plus(manifest_url) + '''">Download ''' + version_label + '''</a>
    </body>
</html>
''')
