// hooks/useFavorites.ts
import { useState, useCallback, useMemo } from 'react';
import type { Movie } from '../tipes/movie';
import { useMovieContext } from '../context/MovieContext';

export type SortOption = 'title-asc' | 'title-desc' | 'rating-asc' | 'rating-desc';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    // Recuperar favoritos do localStorage se existir
    try {
      const saved = localStorage.getItem('movie-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [sortBy, setSortBy] = useState<SortOption>('title-asc');

  // Salvar no localStorage sempre que os favoritos mudarem
  const saveToLocalStorage = useCallback((newFavorites: Movie[]) => {
    try {
      localStorage.setItem('movie-favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error);
    }
  }, []);

  // Adicionar aos favoritos
  const addFavorite = useCallback((movie: Movie) => {
    setFavorites(prev => {
      // Verificar se o filme já está nos favoritos
      const exists = prev.some(fav => fav.id === movie.id);
      if (exists) {
        return prev; // Não adicionar duplicatas
      }
      
      const newFavorites = [...prev, movie];
      saveToLocalStorage(newFavorites);
      return newFavorites;
    });
  }, [saveToLocalStorage]);

  // Remover dos favoritos
  const removeFavorite = useCallback((movieId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(movie => movie.id !== movieId);
      saveToLocalStorage(newFavorites);
      return newFavorites;
    });
  }, [saveToLocalStorage]);

  // Verificar se um filme é favorito
  const isFavorite = useCallback((movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  }, [favorites]);

  // Alternar favorito (add/remove)
  const toggleFavorite = useCallback((movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  // Limpar todos os favoritos
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    saveToLocalStorage([]);
  }, [saveToLocalStorage]);

  // Favoritos ordenados
  const sortedFavorites = useMemo(() => {
    const sorted = [...favorites];
    
    switch (sortBy) {
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      
      case 'rating-asc':
        return sorted.sort((a, b) => a.vote_average - b.vote_average);
      
      case 'rating-desc':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      
      default:
        return sorted;
    }
  }, [favorites, sortBy]);

  // Estatísticas dos favoritos
  const stats = useMemo(() => {
    const total = favorites.length;
    const averageRating = total > 0 
      ? favorites.reduce((sum, movie) => sum + movie.vote_average, 0) / total 
      : 0;
    
    const highestRated = total > 0 
      ? favorites.reduce((highest, movie) => 
          movie.vote_average > highest.vote_average ? movie : highest
        ) 
      : null;
    
    const genresCount = favorites.reduce((acc, movie) => {
      movie.genre_ids?.forEach(genreId => {
        acc[genreId] = (acc[genreId] || 0) + 1;
      });
      return acc;
    }, {} as Record<number, number>);

    const mostCommonGenre = Object.entries(genresCount).sort(([,a], [,b]) => b - a)[0];

    return {
      total,
      averageRating: Number(averageRating.toFixed(1)),
      highestRated,
      mostCommonGenre: mostCommonGenre ? parseInt(mostCommonGenre[0]) : null,
      genreCount: genresCount
    };
  }, [favorites]);

  return {
    // Estado
    favorites,
    sortedFavorites,
    sortBy,
    
    // Ações
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    setSortBy,
    
    // Estatísticas
    stats,
    
    // Utilitários
    hasFavorites: favorites.length > 0,
    favoritesCount: favorites.length,
  };
};

// Hook para usar com o Context (se preferir manter o Context API)
export const useFavoritesWithContext = () => {
  const { state, dispatch } = useMovieContext(); // Supondo que você tenha esse context
  
  const addFavorite = useCallback((movie: Movie) => {
    dispatch({ type: 'ADD_FAVORITE', payload: movie });
  }, [dispatch]);

  const removeFavorite = useCallback((movieId: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
  }, [dispatch]);

  const isFavorite = useCallback((movieId: number) => {
    return state.favorites.some(movie => movie.id === movieId);
  }, [state.favorites]);

  const toggleFavorite = useCallback((movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites: state.favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    hasFavorites: state.favorites.length > 0,
    favoritesCount: state.favorites.length,
  };
};