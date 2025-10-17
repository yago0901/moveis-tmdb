// pages/MovieDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../context/MovieContext';
import type { Movie } from '../../tipes/movie';
import { getImageUrl, tmdbApi } from '../../services/tmdbApi';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useMovieContext();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = state.favorites.some(fav => fav.id === movie?.id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const movieData = await tmdbApi.getMovieDetails(parseInt(id));
        setMovie(movieData);
        setError(null);
      } catch (err) {
        setError('Filme não encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: movie.id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: movie });
    }
  };

  {/*if (loading) return <LoadingSpinner />;*/}
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!movie) return <div className="container mx-auto p-4">Filme não encontrado</div>;

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        ← Voltar
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Poster */}
          <div className="md:w-1/3">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <button
                onClick={handleFavoriteToggle}
                className="text-2xl hover:scale-110 transition-transform"
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-full">
                <span className="font-bold">⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
              <span className="text-gray-600">
                {new Date(movie.release_date).toLocaleDateString('pt-BR')}
              </span>
            </div>

            {/* Genres */}
            {movie.genres && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
              <p className="text-gray-700 leading-relaxed">
                {movie.overview || 'Sinopse não disponível.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;