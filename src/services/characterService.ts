/**
 * characterService.ts
 *
 * Este archivo es el SERVICIO: la capa encargada de comunicarse con la API externa.
 * Aquí centralizamos todas las llamadas HTTP. Ninguna pantalla llama a la API
 * directamente — siempre pasan por aquí.
 *
 * ¿Por qué separar el servicio?
 * - Si la URL de la API cambia, solo se cambia aquí, no en 10 pantallas.
 * - Facilita hacer pruebas (testing) de forma aislada.
 * - El código de las pantallas queda limpio y enfocado en mostrar datos.
 *
 * ¿Qué es Axios?
 * Axios es una librería para hacer peticiones HTTP (GET, POST, etc.).
 * Es más fácil de usar que el fetch() nativo porque:
 * - Convierte automáticamente la respuesta a JSON.
 * - Maneja errores de forma más clara.
 * - Permite configurar cabeceras, timeouts, interceptores, etc.
 */

import axios from 'axios';
import { Character, CharactersResponse } from '../types/character';

// URL base de la API — si cambia, se edita solo aquí
const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Crea una instancia de Axios configurada.
 * Esto permite definir la baseURL y otras opciones una sola vez.
 * Todas las peticiones de este servicio usan esta instancia.
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos máximo para recibir respuesta
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtiene una página de personajes.
 * @param page - Número de página (la API devuelve 20 personajes por página)
 * @returns Objeto con info de paginación y el array de personajes
 */
export const getCharacters = async (page: number = 1): Promise<CharactersResponse> => {
  // axios.get hace una petición GET a BASE_URL + '/character'
  // Los params se convierten automáticamente a query string: ?page=1
  const response = await apiClient.get<CharactersResponse>('/character', {
    params: { page },
  });

  // response.data contiene la respuesta ya parseada como JSON
  return response.data;
};

/**
 * Obtiene un personaje específico por su ID.
 * @param id - ID numérico del personaje
 * @returns El objeto Character completo
 */
export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await apiClient.get<Character>(`/character/${id}`);
  return response.data;
};

/**
 * Formatea la fecha ISO 8601 a un formato legible en español.
 * Ejemplo: "2017-11-04T18:48:46.250Z" → "4 de noviembre de 2017"
 *
 * @param isoDate - Fecha en formato ISO 8601
 * @returns Fecha formateada en español
 */
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Devuelve el color según el estado del personaje.
 * Se usa en la UI para mostrar indicadores de color.
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Alive':
      return '#4CAF50'; // verde
    case 'Dead':
      return '#F44336'; // rojo
    default:
      return '#9E9E9E'; // gris para "unknown"
  }
};

/**
 * Traduce el estado del personaje al español.
 */
export const translateStatus = (status: string): string => {
  const translations: Record<string, string> = {
    Alive: 'Vivo',
    Dead: 'Muerto',
    unknown: 'Desconocido',
  };
  return translations[status] ?? status;
};

/**
 * Traduce el género del personaje al español.
 */
export const translateGender = (gender: string): string => {
  const translations: Record<string, string> = {
    Female: 'Femenino',
    Male: 'Masculino',
    Genderless: 'Sin género',
    unknown: 'Desconocido',
  };
  return translations[gender] ?? gender;
};
