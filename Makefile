run:
	cd www/; npm run watch

build:
	ci/build_app.sh

clean:
	rm *.apk *.zip *.ipa
