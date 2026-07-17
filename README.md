# Climax (Frontend)

Aplicación frontend en **Next.js + TypeScript** para consultar clima y alertas agrícolas en Chiapas.

## Cómo correr

```bash
cd C:\clima-seguro
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> Si la ruta del proyecto es muy larga en Windows, usa el acceso `C:\clima-seguro` (evita errores de Turbopack/webpack).

## Estructura

```
app/                 # App Router (layout, page, estilos)
components/          # UI
lib/
  types.ts           # Contrato de datos
  mock-data.ts       # Datos temporales de UI
  format.ts          # Formateo de fechas / badges
```

## Conectar tu backend después

Los tipos están en `lib/types.ts` (`ConsultaClima`).

Hoy la UI usa mocks en `lib/mock-data.ts`:

- `obtenerConsultaMock(ciudad)` → vista de consulta
- `HISTORIAL_MOCK` → pestaña histórico

Cuando tengas tu API, sustituye esas llamadas por `fetch` a tu backend manteniendo el mismo tipo.
