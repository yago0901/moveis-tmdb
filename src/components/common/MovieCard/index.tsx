import React from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../../tipes/movie";
import { getImageUrl } from "../../../services/tmdbApi";
import { useMovieContext } from "../../../context/MovieContext";

interface MovieCardProps {
  movie: Movie;
  showRemoveButton?: boolean;
  onRemove?: (movieId: number) => void;
  showFavoriteButton?: boolean;
  highlightQuery?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showRemoveButton = false, onRemove, highlightQuery =" "}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useMovieContext();

  const favorite = state.favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie.id });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: movie });
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.(movie.id);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-[#1b263b] shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 group"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Sem+Imagem";
          }}
        />

        {!showRemoveButton && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
              favorite ? "bg-red-600 text-white" : "bg-black/60 text-white hover:bg-black/80"
            }`}
            title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        )}

        {showRemoveButton && (
          <button
            onClick={handleRemoveClick}
            className="absolute top-2 right-2 bg-black hover:bg-red-600 text-white p-2 rounded-full"
            title="Remover dos favoritos"
          >
            🗑️
          </button>
        )}

        <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/60 p-3 flex flex-col gap-2">
          <h3 className="font-semibold text-base text-white line-clamp-2">
            {highlightQuery ? highlightText(movie.title, highlightQuery) : movie.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
