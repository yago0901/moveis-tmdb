export const TMDB_CONFIG = {
  BASE_URL: import.meta.env.VITE_TMDB_BASE_URL,
  IMAGE_BASE_URL: import.meta.env.VITE_IMAGE_BASE_URL,
  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
} as const;

export const IMAGE_SIZES = {
  poster: 'w300',
  backdrop: 'w780',
  original: 'original',
} as const;