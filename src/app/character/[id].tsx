/**
 * [id].tsx — Pantalla de Detalle del Personaje
 *
 * El nombre "[id]" entre corchetes es una ruta DINÁMICA de Expo Router.
 * Significa que esta pantalla acepta cualquier valor en esa posición de la URL.
 * Ejemplo: "/character/1", "/character/42", "/character/826" — todas
 * llegan a este archivo, y podemos leer el valor con useLocalSearchParams().
 *
 * Esta pantalla:
 * 1. Lee el id de la URL
 * 2. Llama a la API para obtener los datos de ESE personaje
 * 3. Muestra todos los detalles: imagen grande, estado, especie, origen, etc.
 *
 * Elementos nativos usados:
 * - ScrollView: permite hacer scroll cuando el contenido supera la pantalla
 * - Image: imagen de gran tamaño del personaje
 * - View, Text: estructura y texto
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Chip, Surface } from 'react-native-paper';
import { useLocalSearchParams, Stack } from 'expo-router';

import { Character } from '../../types/character';
import {
  getCharacterById,
  formatDate,
  getStatusColor,
  translateStatus,
  translateGender,
} from '../../services/characterService';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import DetailRow from '../../components/DetailRow';

export default function CharacterDetailScreen() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * useLocalSearchParams() lee los parámetros de la URL.
   * Si la URL es "/character/42", entonces params.id === "42"
   * Nota: siempre llega como string, por eso hacemos Number(id).
   */
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const data = await getCharacterById(Number(id));
        setCharacter(data);
      } catch (err) {
        setError('No se pudo cargar el personaje. Intenta nuevamente.');
        console.error('Error fetching character detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) return <LoadingIndicator message="Cargando personaje..." />;
  if (error || !character) return <ErrorMessage message={error ?? 'Personaje no encontrado'} />;

  const statusColor = getStatusColor(character.status);
  const statusLabel = translateStatus(character.status);
  const genderLabel = translateGender(character.gender);
  const dateFormatted = formatDate(character.created);
  const episodeCount = character.episode.length;

  return (
    <>
      {/**
       * Stack.Screen permite configurar el header de ESTA pantalla específica
       * desde dentro del componente. Aquí mostramos el nombre del personaje
       * como título de la pantalla.
       */}
      <Stack.Screen
        options={{
          title: character.name,
          headerBackTitle: 'Lista',
        }}
      />

      {/**
       * ScrollView permite hacer scroll vertical cuando el contenido
       * es más alto que la pantalla. A diferencia de FlatList,
       * ScrollView renderiza TODO el contenido, por eso solo se usa
       * cuando la cantidad de elementos es pequeña y conocida.
       */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen del personaje a tamaño grande */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.image }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Overlay con el nombre sobre la imagen */}
          <View style={styles.imageOverlay}>
            <Text style={styles.characterName}>{character.name}</Text>
            <Chip
              mode="flat"
              style={[styles.statusChip, { backgroundColor: statusColor + '40' }]}
              textStyle={[styles.statusText, { color: statusColor }]}
            >
              ● {statusLabel}
            </Chip>
          </View>
        </View>

        {/* Tarjeta de información general */}
        <Surface style={styles.card} elevation={2}>
          <Text style={styles.sectionTitle}>Información General</Text>

          <DetailRow icon="🧬" label="Especie" value={character.species} />
          <DetailRow
            icon="🔬"
            label="Tipo"
            value={character.type || 'Estándar'}
          />
          <DetailRow icon="⚧" label="Género" value={genderLabel} />
          <DetailRow icon="📅" label="Registrado el" value={dateFormatted} />
        </Surface>

        {/* Tarjeta de ubicación */}
        <Surface style={styles.card} elevation={2}>
          <Text style={styles.sectionTitle}>Ubicación</Text>

          <DetailRow icon="🌍" label="Planeta de Origen" value={character.origin.name} />
          <DetailRow
            icon="📍"
            label="Última Ubicación"
            value={character.location.name}
          />
        </Surface>

        {/* Apariciones en episodios */}
        <Surface style={styles.card} elevation={2}>
          <View style={styles.episodeHeader}>
            <Text style={styles.sectionTitle}>Episodios</Text>
            <View style={styles.episodeBadge}>
              <Text style={styles.episodeBadgeText}>{episodeCount}</Text>
            </View>
          </View>
          <Text style={styles.episodeDescription}>
            {character.name} aparece en {episodeCount}{' '}
            {episodeCount === 1 ? 'episodio' : 'episodios'} de la serie.
          </Text>
        </Surface>

        {/* ID de la API */}
        <Text style={styles.idText}>ID en la API: #{character.id}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  content: {
    paddingBottom: 40,
  },
  imageContainer: {
    position: 'relative',  // Necesario para posicionar el overlay encima
    width: '100%',
    height: 320,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',  // Se superpone sobre la imagen
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 10, 26, 0.85)',  // Fondo semi-transparente
    padding: 16,
    gap: 8,
  },
  characterName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#00d4ff',
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  episodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  episodeBadge: {
    backgroundColor: '#00d4ff20',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  episodeBadgeText: {
    color: '#00d4ff',
    fontWeight: '700',
    fontSize: 14,
  },
  episodeDescription: {
    color: '#a0a0b0',
    fontSize: 14,
    lineHeight: 22,
  },
  idText: {
    color: '#3a3a5a',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 24,
    fontFamily: 'monospace',
  },
});
