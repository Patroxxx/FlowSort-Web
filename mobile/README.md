# FlowSort Android

React Native + TypeScript. Un APK/AAB adapta teléfono y tablet en runtime: desde 600 dp usa master-detail.

## Desarrollo

Requiere Node 20+, pnpm, JDK 17 y Android SDK 35.

```bash
pnpm install
pnpm --filter @flowsort/mobile start
pnpm --filter @flowsort/mobile android
```

Emulador usa `http://10.0.2.2:4000/api`. Para dispositivo físico, cambiar `API_URL` en `App.tsx` y `src/AdminScreen.tsx` por la IP HTTPS del backend. HTTP está habilitado solo para desarrollo; producción debe usar HTTPS y deshabilitar `usesCleartextTraffic`.

## Build Android

Crear keystore de release, reemplazar la firma debug en `android/app/build.gradle` por secretos Gradle y ejecutar:

```bash
cd apps/mobile/android
gradle assembleRelease
gradle bundleRelease
```

Salidas: `android/app/build/outputs/apk/release/` y `android/app/build/outputs/bundle/release/`.

## Flujo funcional

Crear empresa → pestaña Admin → crear empleado → ingresar en otro dispositivo → Nuevo → registrar cliente → Admin/Exportar → compartir Excel. Revocar desde Admin/Empleados; el backend invalida refresh y bloquea como máximo al vencer el access token.

Branding se cachea con la sesión y actualiza desde Configuración. La exportación abre el selector nativo Android.
