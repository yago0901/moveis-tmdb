import React, { useEffect } from 'react';
import { useMovies } from '../../hooks/useMovies';
import MovieCard from '../../components/common/MovieCard';

const Home: React.FC = () => {
  const { 
    movies, 
    loading, 
    error, 
    hasMore, 
    loadPopularMovies, 
    loadMore 
  } = useMovies();

  useEffect(() => {
    loadPopularMovies(1);
  }, [loadPopularMovies]);

  const handleRetry = () => {
    loadPopularMovies(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Filmes Populares
        </h1>
        <p className="text-gray-600">
          Descubra os filmes mais populares do momento
        </p>
      </div>

      {error && (
        <div className="text-center my-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      )}

      {/* Grid de Filmes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Loading e Load More */}
      <div className="text-center">
        {/*loading && <LoadingSpinner />*/}
        
        {!loading && hasMore && movies.length > 0 && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            Carregar Mais Filmes
          </button>
        )}
        
        {!hasMore && movies.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-green-600 font-semibold">
              🎉 Todos os filmes foram carregados!
            </p>
          </div>
        )}
        
        {!loading && movies.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum filme encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;