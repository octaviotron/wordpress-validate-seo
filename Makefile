.PHONY: pot json zip clean

pot:
	wp i18n make-pot . languages/wordpress-validate-seo.pot

json:
	wp i18n make-json languages/

zip:
	mkdir -p dist
	rm -f dist/wordpress-validate-seo.zip
	zip -r dist/wordpress-validate-seo.zip . -x "*.git*" "*node_modules*" "*dist*" "Makefile" "*.DS_Store" "*Thumbs.db"

clean:
	rm -rf dist/
