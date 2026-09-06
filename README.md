# Tecnologías del secreto

Abre `index.html` en Chrome, Edge o cualquier navegador moderno.

La web funciona sin instalación. Para la experiencia visual completa necesita conexión una sola vez, porque carga una tipografía y el QR desde internet.

## Personalizar el cierre con tu propia voz

Actualmente el botón **Escuchar cierre** usa la voz disponible del navegador en español. Para poner una grabación propia:

1. Guarda tu audio como `voz-del-rio.mp3` dentro de esta misma carpeta.
2. En `script.js`, sustituye la función `speakClosing()` por un reproductor de ese archivo, por ejemplo: `new Audio('voz-del-rio.mp3').play();`.
3. Para que el QR abra una página pública con el audio, publica esta carpeta (GitHub Pages, Netlify o similar) y reemplaza la dirección que aparece en `index.html` dentro de `api.qrserver.com` por la dirección final de tu página.

El código incluye comentarios en español que indican qué momento del guion representa cada bloque.
