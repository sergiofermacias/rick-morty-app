/**
 * _layout.tsx (Raíz del Router)
 *
 * Este archivo es especial en Expo Router.
 * _layout.tsx define el "contenedor" que envuelve TODAS las pantallas.
 * Es el punto de entrada de la navegación.
 *
 * ¿Qué es Expo Router?
 * Expo Router es un sistema de navegación basado en archivos (file-based routing).
 * Funciona igual que Next.js: cada archivo en la carpeta app/ se convierte
 * automáticamente en una ruta/pantalla.
 *
 * Estructura de rutas:
 * src/app/_layout.tsx     → Layout raíz (este archivo)
 * src/app/index.tsx       → Pantalla principal "/" (lista de personajes)
 * src/app/character/[id].tsx → Pantalla de detalle "/character/123"
 *
 * PaperProvider es el proveedor de React Native Paper.
 * Debe envolver toda la app para que los componentes de Paper funcionen.
 */

import { Stack } from 'expo-router';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Tema personalizado oscuro para React Native Paper
// Extiende el tema oscuro por defecto (MD3DarkTheme) con nuestros colores
const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#00d4ff',        // Azul cyan — color principal
    secondary: '#7c4dff',      // Violeta — color secundario
    background: '#0a0a1a',     // Fondo muy oscuro
    surface: '#1a1a2e',        // Superficie de tarjetas
    onSurface: '#e0e0e0',      // Texto sobre superficies
    onBackground: '#e0e0e0',   // Texto sobre el fondo
  },
};

export default function RootLayout() {
  return (
    /**
     * PaperProvider inyecta el tema en todos los componentes de Paper.
     * Cualquier componente de React Native Paper dentro de este provider
     * automáticamente usará los colores y estilos definidos en "theme".
     */
    <PaperProvider theme={theme}>
      {/* StatusBar controla la barra de estado del sistema (la de la hora/batería) */}
      <StatusBar style="light" />

      {/**
       * Stack es el navegador tipo "pila" de Expo Router.
       * Funciona como un stack de tarjetas: cada nueva pantalla se apila
       * encima de la anterior. El botón "atrás" desapila.
       */}
      <Stack
        screenOptions={{
          // Opciones aplicadas a TODAS las pantallas por defecto
          headerStyle: { backgroundColor: '#0d0d1f' },
          headerTintColor: '#e0e0e0',       // Color del texto y botón de retroceso
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#0a0a1a' },
          animation: 'slide_from_right',    // Animación al navegar
        }}
      />
    </PaperProvider>
  );
}
