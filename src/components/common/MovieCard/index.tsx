// components/common/MovieCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../../tipes/movie';
import { getImageUrl } from '../../../services/tmdbApi';
import { useFavorites } from '../../../hooks/useFavorites';

interface MovieCardProps {
  movie: Movie;
  showRemoveButton?: boolean;
  onRemove?: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  showRemoveButton = false,
  onRemove 
}) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(movie.id);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform group"
      onClick={handleCardClick}
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
          }}
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 rounded-full p-2 transition-all ${
            favorite 
              ? 'bg-red-500 text-white' 
              : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
          }`}
          title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>

        {/* Remove Button (apenas na página de favoritos) */}
        {showRemoveButton && (
          <button
            onClick={handleRemoveClick}
            className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remover dos favoritos"
          >
            🗑️
          </button>
        )}

        {/* Rating */}
        <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1">
          <span>⭐</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          {favorite && (
            <span className="text-red-500 text-xs font-semibold bg-red-50 px-2 py-1 rounded-full">
              Favorito
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;