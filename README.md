# SEO Validation (WordPress Plugin)

**Version:** 0.1.6

## Description
This WordPress plugin enforces SEO best practices by preventing users from publishing posts if a "Focus Keyphrase" has not been defined in Yoast SEO. It provides real-time, clear feedback directly in the Block Editor (Gutenberg) sidebar and the Pre-Publish Panel. If Yoast SEO is not installed or active, the plugin gracefully falls back to displaying an informative message without blocking the publishing process.

## Usage
Once installed and activated, the plugin works automatically in the background. When editing a Post:
1. If the Yoast SEO Focus Keyphrase is empty, the "Publish" button will be disabled, and a red error notice will appear in the Document sidebar and Pre-Publish panel.
2. Enter a Focus Keyphrase in the Yoast SEO panel.
3. The plugin will immediately detect the change in real-time, unlock the "Publish" button, and display a green success notice.

## Requirements
* WordPress 6.0 or higher
* PHP 7.4 or higher
* Yoast SEO / Yoast SEO Premium

## Installation
Since this plugin uses a Zero-Build philosophy (no Node.js or Webpack required), installation is straightforward:
1. Download the latest `wordpress-validate-seo.zip` release from the `dist/` directory (or generate it).
2. Log in to your WordPress Admin dashboard.
3. Navigate to **Plugins > Add New > Upload Plugin**.
4. Upload the zip file and click **Install Now**.
5. Click **Activate Plugin**.

## Compile From Sources
If you are developing or want to compile the translations and package the plugin from source, you can use the provided `Makefile`. You must have `wp-cli` installed on your system.

```bash
# Clone the repository
git clone https://github.com/octaviotron/wordpress-validate-seo.git
cd wordpress-validate-seo

# Generate translation templates (.pot)
make pot

# Generate binary translations and JSON files
wp i18n make-mo languages/
make json

# Package the plugin into a distributable zip file
make zip
```
The compiled plugin will be available at `dist/wordpress-validate-seo.zip`.

## Contribute
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/octaviotron/wordpress-validate-seo/issues).
If you want to contribute code, please ensure you follow the WordPress Coding Standards and the project's Zero-Build philosophy.

## Credits
Developed by [Octavio Rossell](https://github.com/octaviotron).

## License
This project is licensed under the GPLv3 License.
