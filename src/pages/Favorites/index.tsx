import React, { useState, useMemo } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import MovieCard from '../../components/common/MovieCard';

type SortOption = 'title-asc' | 'title-desc' | 'rating-asc' | 'rating-desc';

const Favorites: React.FC = () => {
  const { state, dispatch } = useMovieContext();
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');

  const sortedFavorites = useMemo(() => {
    const favorites = [...state.favorites];

    switch (sortBy) {
      case 'title-asc':
        return favorites.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return favorites.sort((a, b) => b.title.localeCompare(a.title));
      case 'rating-asc':
        return favorites.sort((a, b) => a.vote_average - b.vote_average);
      case 'rating-desc':
        return favorites.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return favorites;
    }
  }, [state.favorites, sortBy]);

  const removeFromFavorites = (movieId: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
  };

  if (state.favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Nenhum filme favorito ainda
          </h2>
          <p className="text-gray-400 mb-8">
            Comece explorando filmes populares e adicione seus favoritos!
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            Explorar Filmes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            Meus Filmes Favoritos
          </h1>

        <div className="mt-4 md:mt-0 flex gap-4 items-center">
          <label htmlFor="sort" className="block text-xl font-medium text-gray-400 mb-2">
            Ordenar por:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="title-asc">Título (A-Z)</option>
            <option value="title-desc">Título (Z-A)</option>
            <option value="rating-desc">Nota (Maior-Menor)</option>
            <option value="rating-asc">Nota (Menor-Maior)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
        {sortedFavorites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            showRemoveButton={true}
            onRemove={removeFromFavorites}
            showFavoriteButton={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
