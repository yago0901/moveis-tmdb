import { mockMovies, mockGenres, simulateApiDelay } from '../data/mockMovies';
import type { Genre, Movie, MovieResponse } from '../tipes/movie';

const allMockMovies: Movie[] = mockMovies;

export const mockApi = {
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    await simulateApiDelay(300);
    
    const moviesPerPage = 12;
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

  getMovieDetails: async (id: number): Promise<Movie> => {
    await simulateApiDelay(200);
    
    const movie = allMockMovies.find(m => m.id === id);
    
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    
    return {
      ...movie,
      genres: movie.genre_ids?.map(genreId => 
        mockGenres.find(g => g.id === genreId)!
      ).filter(Boolean) || []
    };
  },

  getGenres: async (): Promise<{ genres: Genre[] }> => {
    await simulateApiDelay(100);
    return { genres: mockGenres };
  }
};

export const getImageUrl = (path: string | null, _size: string = 'w300'): string => {
  if (!path) {
    return `https://via.placeholder.com/300x450/cccccc/666666?text=No+Image`;
  }
  
  return `https://via.placeholder.com/300x450/4A5568/FFFFFF?text=Movie+Poster`;
};