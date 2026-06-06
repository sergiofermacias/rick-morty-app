/**
 * LoadingIndicator.tsx
 *
 * Componente reutilizable que muestra una animación de carga.
 * Se usa mientras esperamos la respuesta de la API.
 *
 * Elementos nativos usados:
 * - ActivityIndicator: spinner de carga nativo del sistema operativo
 * - View: contenedor
 * - Text: mensaje de carga
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingIndicatorProps {
  message?: string; // Mensaje opcional, por defecto "Cargando..."
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Cargando personajes...',
}) => {
  return (
    <View style={styles.container}>
      {/**
       * ActivityIndicator es el elemento nativo para mostrar un spinner.
       * "size" puede ser "small" o "large".
       * "color" es el color del spinner.
       */}
      <ActivityIndicator size="large" color="#00d4ff" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centra verticalmente
    alignItems: 'center',      // Centra horizontalmente
    gap: 16,
    backgroundColor: '#0a0a1a',
  },
  text: {
    color: '#a0a0b0',
    fontSize: 14,
  },
});

export default LoadingIndicator;
