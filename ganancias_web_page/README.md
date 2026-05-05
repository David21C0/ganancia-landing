# +Ganancias — Landing

Frontend de la landing (Vite + React + TypeScript + Tailwind CSS).

En el repositorio local, todo el código está en la carpeta **`ganancias_web_page/`**. Desde la raíz del repo:

```bash
cd ganancias_web_page
npm install
npm run dev
```

## Requisitos

- Node.js 18+

## Comandos

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

### Compilación de producción

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

La raíz del repositorio incluye `vercel.json`: construye la app dentro de `ganancias_web_page/` y publica `ganancias_web_page/dist`.

1. En [vercel.com](https://vercel.com), **Add New Project** → importa este repo de GitHub.
2. No hace falta cambiar “Root Directory” si usas el `vercel.json` de la raíz (instala y hace build con `--prefix ganancias_web_page`).
3. **Framework Preset**: Other (o Vite si lo detecta solo).
4. Despliega; cada push a la rama conectada generará un nuevo deployment.

Las rutas del cliente (`/resultados/:tipo`) usan rewrite SPA definido en `vercel.json`.

## Estructura

Código en `src/`: `components/` (layout, sections, ui, diagnostic, forms), `pages/Home.tsx`, `context/` para el modal de diagnóstico.
