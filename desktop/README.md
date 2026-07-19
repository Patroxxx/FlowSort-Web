# FlowSort Desktop

App universal Electron + React. Branding llega del backend tras login; ningún instalador pertenece a empresa concreta.

## Desarrollo

Backend debe estar activo. Desde raíz:

```bash
pnpm install
VITE_API_URL=http://localhost:4000/api pnpm --filter @flowsort/desktop dev
```

`VITE_API_URL` se incorpora al bundle. Definir URL HTTPS de producción antes de empaquetar. No colocar secretos en variables `VITE_*`.

## Validación

```bash
pnpm --filter @flowsort/desktop typecheck
pnpm --filter @flowsort/desktop build
```

## Instaladores

Compilar cada plataforma en runner nativo:

```bash
VITE_API_URL=https://api.example.com/api pnpm --filter @flowsort/desktop dist
```

- macOS: `.dmg` universal arm64+x64.
- Windows: `.exe` NSIS.
- Linux: `.AppImage` y `.deb`.
- Salida: `apps/desktop/release/`.

Para distribución pública, configurar firma/notarización del SO mediante secretos CI. Nunca guardar certificados en repo. CI actual conserva instaladores como artefactos privados; promoverlos a almacenamiento o release solo tras validación.

## Revocación

Cliente conserva sesión local para continuidad. Respuesta `401` al refrescar limpia sesión y vuelve a login. Tras revocar, refresh falla inmediatamente; access token previo puede vivir hasta 15 minutos. Para prueba rápida: revocar empleado, reiniciar app o forzar refresh y confirmar pantalla de acceso.

