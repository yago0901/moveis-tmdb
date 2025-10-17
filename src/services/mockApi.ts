
import { mockMovies, mockGenres, simulateApiDelay } from '../data/mockMovies';
import type { Genre, Movie, MovieResponse } from '../tipes/movie';

// Simular dados adicionais para paginação
const allMockMovies: Movie[] = [
  ...mockMovies,
  // Adicionar mais filmes para simular paginação
  ...mockMovies.map((movie, index) => ({
    ...movie,
    id: movie.id + 10 + index,
    title: `${movie.title} ${index + 2}`,
    vote_average: Math.max(1, Math.min(10, movie.vote_average + (Math.random() - 0.5)))
  }))
];

export const mockApi = {
  // Filmes populares com paginação simulada
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    await simulateApiDelay(300);
    
    const moviesPerPage = 10;
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    
    const results = allMockMovies.slice(startIndex, endIndex);
    
    return {
      page,
      results,
      total_pages: Math.ceil(allMockMovies.length / moviesPerPage),
      total_results: allMockMovies.length
    };
  },

  // Buscar filmes
  searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
    await simulateApiDelay(400);
    
    const normalizedQuery = query.toLowerCase().trim();
    const moviesPerPage = 10;
    
    const allResults = allMockMovies.filter(movie =>
      movie.title.toLowerCase().includes(normalizedQuery) ||
      movie.overview.toLowerCase().includes(normalizedQuery)
    );
    
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const results = allResults.slice(startIndex, endIndex);
    
    return {
      page,
      results,
      total_pages: Math.ceil(allResults.length / moviesPerPage),
      total_results: allResults.length
    };
  },

  // Detalhes do filme
  getMovieDetails: async (id: number): Promise<Movie> => {
    await simulateApiDelay(200);
    
    const movie = allMockMovies.find(m => m.id === id);
    
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    
    // Simular dados mais completos para detalhes
    return {
      ...movie,
      genres: movie.genre_ids?.map(genreId => 
        mockGenres.find(g => g.id === genreId)!
      ).filter(Boolean) || []
    };
  },

  // Gêneros disponíveis
  getGenres: async (): Promise<{ genres: Genre[] }> => {
    await simulateApiDelay(100);
    return { genres: mockGenres };
  }
};

// Função para obter URL da imagem (usando placeholders)
export const getImageUrl = (path: string | null, _size: string = 'w300'): string => {
  if (!path) {
    // Placeholder para imagens não disponíveis
    return `https://via.placeholder.com/300x450/cccccc/666666?text=No+Image`;
  }
  
  // Para simular imagens reais, você pode usar um serviço de placeholder
  // ou adicionar suas próprias imagens posteriormente
  return `https://via.placeholder.com/300x450/4A5568/FFFFFF?text=Movie+Poster`;
};