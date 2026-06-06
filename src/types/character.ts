/**
 * character.ts
 *
 * Define los tipos de TypeScript que representan la estructura de datos
 * que devuelve la API de Rick and Morty.
 *
 * ¿Por qué TypeScript?
 * TypeScript agrega tipos estáticos a JavaScript. Esto evita errores en tiempo
 * de ejecución y hace el código más predecible y fácil de entender.
 */

// Representa la ubicación de un personaje (planeta de origen)
export interface Location {
  name: string;  // Nombre del lugar, ej: "Earth (C-137)"
  url: string;   // URL para obtener más info del lugar
}

// Estructura principal de un personaje
export interface Character {
  id: number;          // ID único del personaje
  name: string;        // Nombre, ej: "Rick Sanchez"
  status: 'Alive' | 'Dead' | 'unknown';  // Estado del personaje
  species: string;     // Especie, ej: "Human", "Alien"
  type: string;        // Sub-tipo especial, puede estar vacío
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;    // Lugar de origen
  location: Location;  // Última ubicación conocida
  image: string;       // URL de la imagen del personaje
  episode: string[];   // Lista de URLs de episodios donde aparece
  url: string;         // URL del personaje en la API
  created: string;     // Fecha de creación en la base de datos (ISO 8601)
}

// Información de paginación que devuelve la API
export interface ApiInfo {
  count: number;   // Total de personajes
  pages: number;   // Total de páginas
  next: string | null;   // URL de la siguiente página (null si es la última)
  prev: string | null;   // URL de la página anterior (null si es la primera)
}

// Respuesta completa de la API al pedir lista de personajes
export interface CharactersResponse {
  info: ApiInfo;
  results: Character[];
}
