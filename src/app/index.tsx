/**
 * index.tsx — Pantalla Principal (Lista de Personajes)
 *
 * Esta es la pantalla de inicio de la app (ruta "/").
 * En Expo Router, el archivo index.tsx siempre es la pantalla raíz.
 *
 * Responsabilidades de esta pantalla:
 * 1. Pedir la lista de personajes al servicio (characterService)
 * 2. Manejar los estados: cargando, error, datos recibidos
 * 3. Mostrar la lista usando FlatList
 * 4. Navegar a la pantalla de detalle al tocar una tarjeta
 *
 * Elementos nativos de React Native usados aquí:
 * - FlatList: lista optimizada para grandes cantidades de datos
 * - View: contenedor
 * - Text: texto
 * - TextInput (a través de Searchbar de Paper)
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { Character } from '../types/character';
import { getCharacters } from '../services/characterService';
import CharacterCard from '../components/CharacterCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

export default function HomeScreen() {
  /**
   * useState es un Hook de React para manejar estado local.
   * Cuando el estado cambia, React re-renderiza el componente.
   *
   * Sintaxis: const [valor, setValor] = useState(valorInicial)
   */
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  /**
   * useRouter es el hook de Expo Router para navegar entre pantallas.
   * router.push('/ruta') navega a una nueva pantalla (la apila).
   */
  const router = useRouter();

  /**
   * fetchCharacters llama al servicio y actualiza el estado.
   * useCallback evita que la función se recree en cada render,
   * optimizando el rendimiento.
   */
  const fetchCharacters = useCallback(async (pageNumber: number, reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const data = await getCharacters(pageNumber);

      setCharacters(prev => {
        const updated = reset ? data.results : [...prev, ...data.results];
        setFilteredCharacters(updated);
        return updated;
      });

      // Si no hay página siguiente, ya no hay más datos
      setHasMore(data.info.next !== null);
    } catch (err) {
      setError('No se pudo conectar con la API. Verifica tu conexión a internet.');
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  /**
   * useEffect ejecuta código cuando el componente se monta o cuando
   * cambian las dependencias del array [].
   * Con [] vacío, se ejecuta solo una vez al montar el componente.
   */
  useEffect(() => {
    fetchCharacters(1, true);
  }, [fetchCharacters]);

  // Filtrar personajes por búsqueda de texto
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCharacters(characters);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = characters.filter(
        c =>
          c.name.toLowerCase().includes(query) ||
          c.species.toLowerCase().includes(query) ||
          c.origin.name.toLowerCase().includes(query)
      );
      setFilteredCharacters(filtered);
    }
  }, [searchQuery, characters]);

  // Carga de página siguiente al llegar al final de la lista
  const handleLoadMore = () => {
    if (!loadingMore && hasMore && searchQuery === '') {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCharacters(nextPage);
    }
  };

  /**
   * renderItem define cómo se ve cada elemento de la FlatList.
   * Recibe { item } donde item es un Character.
   * Retorna el JSX del componente CharacterCard.
   */
  const renderItem: ListRenderItem<Character> = ({ item }) => (
    <CharacterCard
      character={item}
      onPress={() => {
        // Navega a la pantalla de detalle pasando el ID en la URL
        // Expo Router interpreta "/character/123" como el archivo character/[id].tsx
        router.push(`/character/${item.id}`);
      }}
    />
  );

  // Separador visual entre tarjetas
  const ItemSeparator = () => <View style={styles.separator} />;

  // Componente al final de la lista (spinner de carga de más)
  const ListFooter = () =>
    loadingMore ? (
      <View style={styles.footer}>
        <Text style={styles.footerText}>Cargando más...</Text>
      </View>
    ) : null;

  // Componente cuando la búsqueda no da resultados
  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🔍</Text>
      <Text style={styles.emptyText}>No se encontraron personajes</Text>
    </View>
  );

  // --- Renderizado condicional ---
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchCharacters(1, true)} />;

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda de React Native Paper */}
      <Searchbar
        placeholder="Buscar personaje, especie..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
        iconColor="#00d4ff"
        placeholderTextColor="#5a5a7a"
      />

      <Text style={styles.counter}>
        {filteredCharacters.length} personajes encontrados
      </Text>

      {/**
       * FlatList es el elemento nativo para listas eficientes.
       * A diferencia de ScrollView + map(), FlatList solo renderiza
       * los elementos visibles en pantalla, ahorrando memoria.
       *
       * Props importantes:
       * - data: el array de datos
       * - renderItem: cómo renderizar cada elemento
       * - keyExtractor: clave única por elemento (necesaria para optimización)
       * - onEndReached: función al llegar al final (paginación)
       * - onEndReachedThreshold: qué tan cerca del final activar onEndReached (0.5 = 50%)
       */}
      <FlatList
        data={filteredCharacters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={ListEmpty}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

// Expo Router permite configurar opciones de la pantalla con esta exportación
export const screenOptions = {
  title: '🛸 Rick & Morty',
  headerLargeTitle: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  searchbar: {
    margin: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    elevation: 0,
  },
  searchInput: {
    color: '#e0e0e0',
    fontSize: 14,
  },
  counter: {
    fontSize: 12,
    color: '#5a5a7a',
    marginLeft: 16,
    marginBottom: 4,
  },
  list: {
    paddingBottom: 24,
  },
  separator: {
    height: 0,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#5a5a7a',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 40,
  },
  emptyText: {
    color: '#5a5a7a',
    fontSize: 16,
  },
});
