import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import type { Movie } from "../../tipes/movie";
import { getImageUrl } from "../../services/tmdbApi";
import { mockApi } from "../../services/mockApi";
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useMovieContext();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = state.favorites.some((fav) => fav.id === movie?.id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const movieData = await mockApi.getMovieDetails(parseInt(id));
        setMovie(movieData);
        setError(null);
      } catch (err) {
        setError("Filme não encontrado");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie.id });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: movie });
    }
  };

  {
    if (loading) return <LoadingSpinner />;
  }
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!movie) return <div className="container mx-auto p-4">Filme não encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <span>←</span> Voltar
        </button>

        <div className="md:flex gap-8">
          <div className="md:w-2/5 rounded-lg overflow-hidden shadow-lg bg-gray-800">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-3/5 flex flex-col justify-start">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="items-center gap-6 mb-6">
              <div className="text-gray-400">
                <span className="font-bold">Data de lançamento: </span>
                <span>
                  {new Date(movie.release_date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-bold">Nota TMDB:</span>
                <span className="bg-orange-400 text-black font-bold px-2 py-1 rounded-full">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Sinopse</h2>
              <p className="text-white leading-relaxed text-lg">{movie.overview || "Sinopse não disponível."}</p>
            </div>

            <div>
              <button
                onClick={handleFavoriteToggle}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded flex items-center gap-2 transition-colors"
              >
                <span>❤️</span> Adicionar aos Favoritos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
