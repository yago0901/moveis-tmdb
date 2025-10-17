// pages/Search.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMovies } from '../../hooks/useMovies';
import MovieCard from '../../components/common/MovieCard';

const Search: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const { movies, loading, error, hasMore, searchMovies, loadMore } = useMovies();
  const [currentQuery, setCurrentQuery] = useState(query);

  useEffect(() => {
    if (query) {
      setCurrentQuery(query);
      searchMovies(query, 1);
    }
  }, [query, searchMovies]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Resultados da Busca
        </h1>
        {query && (
          <p className="text-gray-600">
            Buscando por: <span className="font-semibold">"{query}"</span>
            {movies.length > 0 && ` - ${movies.length} resultados encontrados`}
          </p>
        )}
      </div>

      {error && (
        <div className="text-center my-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {movies.map(movie => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <div className="mt-2">
              <h3 className="font-semibold text-sm">
                {highlightText(movie.title, currentQuery)}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Loading e Load More */}
      <div className="text-center">
        {/*loading && <LoadingSpinner />*/}
        
        {!loading && hasMore && movies.length > 0 && (
          <button
            onClick={() => loadMore()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg transition-colors font-semibold"
          >
            Carregar Mais Resultados
          </button>
        )}
        
        {!hasMore && movies.length > 0 && (
          <p className="text-gray-600">
            Todos os resultados foram carregados.
          </p>
        )}
        
        {!loading && movies.length === 0 && query && !error && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-yellow-700 text-lg mb-2">
                Nenhum filme encontrado para "{query}"
              </p>
              <p className="text-yellow-600 text-sm">
                Tente usar palavras-chave diferentes ou verificar a ortografia.
              </p>
            </div>
          </div>
        )}
        
        {!loading && !query && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Digite algo na barra de busca para encontrar filmes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;