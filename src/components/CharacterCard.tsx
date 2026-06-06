/**
 * CharacterCard.tsx
 *
 * COMPONENTE reutilizable que representa una tarjeta de personaje en la lista.
 *
 * ¿Qué es un componente?
 * Un componente es un bloque de UI independiente y reutilizable.
 * En lugar de repetir el mismo código visual 20 veces (una por personaje),
 * lo definimos una vez aquí y lo usamos pasándole distintos datos (props).
 *
 * Props = propiedades que el componente recibe desde afuera.
 * En este caso: el objeto "character" y la función "onPress".
 *
 * Elementos nativos de React Native usados aquí:
 * - TouchableOpacity: botón que se vuelve semitransparente al tocar
 * - View: contenedor genérico (equivalente a <div> en web)
 * - Text: para mostrar texto
 * - Image: para mostrar imágenes
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Chip } from 'react-native-paper';
import { Character } from '../types/character';
import { formatDate, getStatusColor, translateStatus } from '../services/characterService';

// Definición de las props que acepta este componente
interface CharacterCardProps {
  character: Character;       // El personaje a mostrar
  onPress: () => void;        // Función a ejecutar cuando se toca la tarjeta
}

/**
 * Componente funcional (la forma moderna de escribir componentes en React).
 * Recibe las props y devuelve JSX (la descripción visual del componente).
 */
const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }) => {
  const statusColor = getStatusColor(character.status);
  const statusLabel = translateStatus(character.status);
  const dateFormatted = formatDate(character.created);

  return (
    /**
     * TouchableOpacity es un elemento nativo que detecta toques.
     * "activeOpacity={0.85}" hace que se vea un poco transparente al tocar,
     * dando feedback visual al usuario.
     */
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* View actúa como contenedor flex horizontal */}
      <View style={styles.row}>
        {/**
         * Image es el elemento nativo para mostrar imágenes.
         * "source" recibe un objeto con la URI de la imagen.
         * "resizeMode" controla cómo se ajusta la imagen al contenedor.
         */}
        <Image
          source={{ uri: character.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Columna derecha con la información textual */}
        <View style={styles.info}>
          {/**
           * Text es el elemento nativo para mostrar texto.
           * numberOfLines limita el texto a N líneas (con "..." al final si supera).
           */}
          <Text style={styles.name} numberOfLines={1}>
            {character.name}
          </Text>

          {/* Chip es un componente de React Native Paper — librería de diseño */}
          <Chip
            mode="flat"
            style={[styles.statusChip, { backgroundColor: statusColor + '30' }]}
            textStyle={[styles.statusText, { color: statusColor }]}
            icon={() => (
              <View style={[styles.dot, { backgroundColor: statusColor }]} />
            )}
          >
            {statusLabel}
          </Chip>

          <Text style={styles.species} numberOfLines={1}>
            🧬 {character.species}
          </Text>

          <Text style={styles.date} numberOfLines={1}>
            📅 {dateFormatted}
          </Text>

          <Text style={styles.origin} numberOfLines={1}>
            🌍 {character.origin.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * StyleSheet.create es la forma de definir estilos en React Native.
 * No es CSS, pero usa propiedades similares.
 * Los valores numéricos son en dp (density-independent pixels).
 */
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    // Sombra en iOS
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Sombra en Android (usa elevation)
    elevation: 4,
    borderWidth: 1,
    borderColor: '#16213e',
  },
  row: {
    flexDirection: 'row',  // Los hijos se colocan en fila horizontal
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 110,
  },
  info: {
    flex: 1,             // Ocupa el espacio restante
    padding: 12,
    gap: 4,              // Espacio entre elementos hijos
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e0e0e0',
    letterSpacing: 0.3,
  },
  statusChip: {
    alignSelf: 'flex-start',  // No ocupa todo el ancho
    height: 26,
    marginTop: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  species: {
    fontSize: 12,
    color: '#a0a0b0',
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: '#7a7a8a',
  },
  origin: {
    fontSize: 11,
    color: '#7a7a8a',
  },
});

export default CharacterCard;
