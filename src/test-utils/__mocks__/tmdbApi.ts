import { vi } from 'vitest';

export const tmdbApi = {
  getMovieDetails: vi.fn(),
  getPopularMovies: vi.fn(),
  searchMovies: vi.fn()
};