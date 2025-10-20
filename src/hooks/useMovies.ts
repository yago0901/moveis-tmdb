import { useState, useCallback } from 'react';
import { tmdbApi } from '../services/tmdbApi';
import type { Movie, MovieResponse } from '../tipes/movie';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadPopularMovies = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: MovieResponse = await tmdbApi.getPopularMovies(page);
      
      if (page === 1) {
        setMovies(response.results);
      } else {
        setMovies(prev => [...prev, ...response.results]);
      }
      
      setHasMore(page < response.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Erro ao carregar filmes');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
    if (!query.trim()) {
      await loadPopularMovies(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response: MovieResponse = await tmdbApi.searchMovies(query, page);
      
      if (page === 1) {
        setMovies(response.results);
      } else {
        setMovies(prev => [...prev, ...response.results]);
      }
      
      setHasMore(page < response.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Erro ao buscar filmes');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [loadPopularMovies]);

  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      const nextPage = currentPage + 1;
      await loadPopularMovies(nextPage);
    }
  }, [loading, hasMore, currentPage, loadPopularMovies]);

  const clearMovies = useCallback(() => {
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
  }, []);

  return {
    movies,
    loading,
    error,
    hasMore,
    currentPage,
    loadPopularMovies,
    searchMovies,
    loadMore,
    clearMovies
  };
};