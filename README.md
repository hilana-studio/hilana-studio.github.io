# Hilana · web

Catálogo estático para la tienda de crochet de Mamen. Sin dependencias ni build: HTML, CSS y un JS que lee `datos/tienda.json`. Se publica en GitHub Pages con cada push a `main`.

## Estructura
| Ruta | Qué es |
|---|---|
| `datos/tienda.json` | Marca, contacto (WhatsApp/Instagram), categorías y productos. **Es lo único que hay que tocar en el día a día.** |
| `img/` | Fotos de los productos (cuadradas, ~1200 px, JPG o WebP). |
| `index.html`, `css/`, `js/` | La web. |
| `.nojekyll` | Le dice a GitHub Pages que sirva los archivos tal cual. |

## Añadir un producto
1. Copia la foto en `img/` (por ejemplo `img/ramo-rosas.jpg`).
2. Añade una entrada en `productos` de `datos/tienda.json` con su `foto`.
3. `git commit` + `git push`. En un par de minutos está publicado.

Campos: `id`, `nombre`, `categoria` (una de `categorias`), `precio`, `desde` (muestra "desde"), `descripcion`, `colores`, `foto`, `personalizable`, `destacado` (sale primero).

## Contacto
- `whatsapp`: número con prefijo, sin espacios (`34600111222`). Si está, los botones abren WhatsApp con el mensaje ya escrito.
- `instagram`: usuario sin `@`. Si no hay WhatsApp, los botones abren un mensaje directo de Instagram.
- ⚠️ El repo es público: todo lo que pongas aquí (también el número) se ve. No subas datos de clientes ni pedidos.

## Probar en local
```bash
python3 -m http.server 8000   # y abre http://localhost:8000
```
(Abriendo `index.html` directamente el navegador no deja cargar el JSON.)

## Publicar por primera vez
La web vive en la organización de GitHub `hilana-studio`, en el repo `hilana-studio.github.io`, y se ve en **https://hilana-studio.github.io**.
```bash
rm -rf .github
git init -b main && git add . && git commit -m "Primera versión de la web de Hilana"
git remote add origin https://github.com/hilana-studio/hilana-studio.github.io.git
git push -u origin main
```
En el repo: **Settings → Pages** debe mostrar *Deploy from a branch* con `main` / `(root)`. Cada push a `main` la vuelve a publicar.

## Pendiente
- [ ] Nombre de la marca, WhatsApp e Instagram en `tienda.json`
- [ ] Fotos reales y precios
- [ ] Aviso legal y política de privacidad antes de difundirla
