.PHONY: pot json zip clean

pot:
	wp i18n make-pot . languages/wordpress-validate-seo.pot

json:
	wp i18n make-json languages/

zip:
	rm -rf dist/wordpress-validate-seo dist/wordpress-validate-seo.zip
	mkdir -p dist/wordpress-validate-seo
	cp -r js languages wordpress-validate-seo.php README.md dist/wordpress-validate-seo/
	cd dist && zip -r wordpress-validate-seo.zip wordpress-validate-seo
	rm -rf dist/wordpress-validate-seo

clean:
	rm -rf dist/
