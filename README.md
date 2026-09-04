# Validación SEO (WordPress Plugin)

**Versión:** 0.1.2

## Propósito

Este plugin de WordPress impide la publicación de entradas (posts) si no se ha definido una "frase clave de enfoque" (focus keyphrase) en Yoast SEO. Proporciona retroalimentación clara al usuario directamente en la barra lateral del editor de bloques (Gutenberg).

Si Yoast SEO no está instalado o activo, el plugin no bloqueará la publicación y simplemente mostrará un mensaje informativo.

## Instalación en Producción Remota

El plugin no requiere pasos de compilación ni dependencias de Node.js (cero build tools). Todo el código es nativo.

1. Descarga o clona este repositorio.
2. Sube la carpeta `wordpress-validate-seo` al directorio `wp-content/plugins/` de tu instalación de WordPress.
3. Accede al panel de administración de WordPress y activa el plugin "SEO Validation".

## Comandos del Makefile (Desarrollo)

Si cuentas con `wp-cli` instalado en tu entorno local, puedes usar los siguientes comandos de utilidad:

- `make pot`: Genera el archivo de plantilla `.pot` con las cadenas traducibles.
- `make json`: Genera los archivos `.json` necesarios para las traducciones de JavaScript.
- `make zip`: Empaqueta el plugin en un archivo `dist/wordpress-validate-seo.zip` listo para su distribución.
- `make clean`: Elimina la carpeta `dist/`.

## Licencia

GPL-2.0-or-later
