/**
 * DetailRow.tsx
 *
 * Componente para mostrar una fila de dato en la pantalla de detalle.
 * Ejemplo: "Especie: Human", "Género: Male"
 *
 * Reutilizable: en vez de copiar el mismo estilo de fila varias veces,
 * lo definimos aquí y lo usamos pasando label y value distintos.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DetailRowProps {
  icon: string;    // Emoji como ícono
  label: string;   // Etiqueta descriptiva
  value: string;   // Valor a mostrar
}

const DetailRow: React.FC<DetailRowProps> = ({ icon, label, value }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || 'Desconocido'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e3e',
    gap: 12,
  },
  icon: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#6a6a8a',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    fontSize: 15,
    color: '#d0d0e0',
    fontWeight: '500',
    marginTop: 2,
  },
});

export default DetailRow;
