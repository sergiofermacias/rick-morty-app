/**
 * ErrorMessage.tsx
 *
 * Componente reutilizable para mostrar mensajes de error.
 * Incluye un botón de "reintentar" para que el usuario pueda
 * volver a intentar la carga sin reabrir la app.
 *
 * Buena práctica: siempre manejar los estados de error en la UI.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; // Función opcional para reintentar
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.title}>Algo salió mal</Text>
      <Text style={styles.message}>{message}</Text>
      {/* Solo mostramos el botón si se pasó la función onRetry */}
      {onRetry && (
        <Button
          mode="outlined"
          onPress={onRetry}
          textColor="#00d4ff"
          style={styles.button}
        >
          Reintentar
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: '#0a0a1a',
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e0e0e0',
  },
  message: {
    fontSize: 14,
    color: '#a0a0b0',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 8,
    borderColor: '#00d4ff',
  },
});

export default ErrorMessage;
