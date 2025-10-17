// services/tmdbApi.ts
import axios from 'axios';
import { TMDB_CONFIG } from '../utils/constants';
import type { Movie, MovieResponse } from '../tipes/movie';

const api = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  params: {
    api_key: TMDB_CONFIG.API_KEY,
    language: 'pt-BR',
  },
});

export const tmdbApi = {
  // Filmes populares
  getPopularMovies: (page: number = 1): Promise<MovieResponse> =>
    api.get(`/movie/popular?page=${page}`).then(res => res.data),

  // Buscar filmes
  searchMovies: (query: string, page: number = 1): Promise<MovieResponse> =>
    api.get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`).then(res => res.data),

  // Detalhes do filme
  getMovieDetails: (id: number): Promise<Movie> =>
    api.get(`/movie/${id}`).then(res => res.data),
};

export const getImageUrl = (path: string | null, size: string = 'w300'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};