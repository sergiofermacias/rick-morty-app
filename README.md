# 🛸 Rick & Morty App — React Native + Expo

Aplicación académica que consume la API pública de Rick and Morty.
Muestra una lista de personajes con imagen, nombre, fecha y descripción,
con pantalla de detalle para cada uno.

---

## 🧱 Tecnologías usadas

| Tecnología | Rol |
|---|---|
| **React Native** | Framework para apps móviles |
| **Expo** | Plataforma que facilita el desarrollo |
| **Expo Router** | Navegación basada en archivos |
| **Axios** | Cliente HTTP para consumir la API |
| **React Native Paper** | Librería de diseño (Material Design 3) |
| **TypeScript** | Tipado estático |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── _layout.tsx          ← Layout raíz con PaperProvider
│   ├── index.tsx            ← Pantalla principal (lista)
│   └── character/
│       └── [id].tsx         ← Pantalla de detalle (ruta dinámica)
├── components/
│   ├── CharacterCard.tsx    ← Tarjeta reutilizable de personaje
│   ├── DetailRow.tsx        ← Fila de dato en la pantalla de detalle
│   ├── LoadingIndicator.tsx ← Spinner de carga
│   └── ErrorMessage.tsx     ← Mensaje de error con botón reintentar
├── services/
│   └── characterService.ts  ← Toda la lógica de comunicación con la API
└── types/
    └── character.ts         ← Interfaces TypeScript de la API
```

---

## 🚀 Instalación paso a paso

### Prerrequisitos

- Node.js 18 o superior: https://nodejs.org
- Git: https://git-scm.com
- Una cuenta en GitHub

### Paso 1 — Crear el proyecto con Expo

Abre una terminal y ejecuta:

```bash
npx create-expo-app@latest rick-morty-app --template tabs
```

Cuando pregunte "Use blank TypeScript template?", selecciona **Yes**.

Luego entra a la carpeta:

```bash
cd rick-morty-app
```

### Paso 2 — Reemplazar la estructura de archivos

Elimina el contenido de la carpeta `app/` que genera Expo por defecto:

```bash
# En Mac/Linux
rm -rf app/

# En Windows (PowerShell)
Remove-Item -Recurse -Force app/
```

Ahora crea la carpeta `src/` y copia TODOS los archivos de este proyecto
respetando la estructura mostrada arriba.

### Paso 3 — Actualizar app.json

Reemplaza el contenido de `app.json` con el de este proyecto.
El campo `"main": "expo-router/entry"` en `package.json` es clave
para que Expo Router busque las pantallas en `src/app/`.

### Paso 4 — Instalar dependencias

```bash
npm install
```

Esto instala todo lo declarado en `package.json`:
- `expo-router`: navegación
- `axios`: peticiones HTTP
- `react-native-paper`: componentes de diseño

### Paso 5 — Ejecutar la aplicación

```bash
npx expo start
```

Escanea el código QR con la app **Expo Go** en tu teléfono,
o presiona `a` para abrir en Android Emulator, `i` para iOS Simulator.

---

## 📱 Elementos nativos de React Native usados

1. **`FlatList`** — Lista eficiente con paginación (en index.tsx)
2. **`TouchableOpacity`** — Botón con feedback visual al tocar (en CharacterCard.tsx)
3. **`ActivityIndicator`** — Spinner de carga nativo (en LoadingIndicator.tsx)
4. **`ScrollView`** — Contenido scrolleable en pantalla de detalle ([id].tsx)
5. **`Image`** — Imágenes de personajes
6. **`Text`** y **`View`** — Elementos base de toda UI

---

## 📝 Commits recomendados (en orden)

Ejecuta estos commits en tu repositorio de GitHub:

```bash
# 1 — Al crear el proyecto
git init
git add .
git commit -m "Crear proyecto frontend con Expo y React Native"

# 2 — Al instalar librerías
git add package.json
git commit -m "Instalar Axios y React Native Paper como dependencias"

# 3 — Al crear los tipos y el servicio
git add src/types/ src/services/
git commit -m "Crear tipos TypeScript y servicio para consumir la API de Rick and Morty"

# 4 — Al crear los componentes
git add src/components/
git commit -m "Crear componentes reutilizables: tarjeta, carga, error y fila de detalle"

# 5 — Al crear la pantalla principal
git add src/app/index.tsx src/app/_layout.tsx
git commit -m "Agregar pantalla principal con lista de personajes y buscador"

# 6 — Al crear la pantalla de detalle
git add src/app/character/
git commit -m "Agregar pantalla de detalle con ruta dinámica por ID de personaje"

# 7 — Ajustes finales
git add .
git commit -m "Mejorar diseño visual: tema oscuro, colores por estado y animaciones"
```

---

## 🌐 API utilizada: The Rick and Morty API

- **URL base**: `https://rickandmortyapi.com/api`
- **Autenticación**: Ninguna (totalmente pública y gratuita)
- **Documentación**: https://rickandmortyapi.com/documentation

### Endpoints usados

| Endpoint | Descripción |
|---|---|
| `GET /character?page=1` | Lista paginada de personajes (20 por página) |
| `GET /character/{id}` | Detalle de un personaje específico |

### Ejemplo de respuesta de un personaje

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": { "name": "Earth (C-137)", "url": "..." },
  "location": { "name": "Citadel of Ricks", "url": "..." },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "episode": ["https://...", "https://..."],
  "url": "https://rickandmortyapi.com/api/character/1",
  "created": "2017-11-04T18:48:46.250Z"
}
```

---

## 🏗️ Arquitectura del proyecto

Ver explicación completa al final de este README o en la documentación
entregada junto con el proyecto.

---

## 🐛 Solución de problemas comunes

**Error: "Unable to resolve module expo-router"**
```bash
npx expo install expo-router
```

**Error: Metro bundler — cannot find module**
```bash
npx expo start --clear
```

**La app no carga datos (pantalla de error)**
- Verifica que tienes conexión a internet
- La API es pública y no requiere clave
