import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MovieProvider } from '../../../context/MovieContext';
import MovieCard from './index';
import type { Movie } from '../../../tipes/movie';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  overview: 'This is a test movie overview for testing purposes.',
  vote_average: 8.5,
  release_date: '2023-01-01',
  genre_ids: [28, 12, 16],
};

vi.mock('../../../services/tmdbApi', () => ({
  getImageUrl: (path: string) => `https://image.tmdb.org/t/p/w500${path}`
}));

describe('MovieCard', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <MovieProvider>
          {component}
        </MovieProvider>
      </BrowserRouter>
    );
  };

  it('should render movie information correctly', () => {
    renderWithProvider(
      <MovieCard movie={mockMovie} />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
    
    const titleElement = screen.getByRole('heading', { name: 'Test Movie' });
    expect(titleElement).toBeInTheDocument();
    
    const ratingElement = screen.getByText('8.5');
    expect(ratingElement).toHaveClass('bg-yellow-400');
  });

  it('should show favorite button by default', () => {
    renderWithProvider(
      <MovieCard movie={mockMovie} />
    );

    const favoriteButton = screen.getByTitle('Adicionar aos favoritos');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveTextContent('🤍');
  });

  it('should show remove button when showRemoveButton is true', () => {
    const mockOnRemove = vi.fn();
    
    renderWithProvider(
      <MovieCard 
        movie={mockMovie} 
        showRemoveButton={true} 
        onRemove={mockOnRemove}
      />
    );

    const removeButton = screen.getByTitle('Remover dos favoritos');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('🗑️');
  });

  it('should highlight text when highlightQuery is provided', () => {
    renderWithProvider(
      <MovieCard 
        movie={mockMovie} 
        highlightQuery="Test" 
      />
    );

    const highlightedText = screen.getByText('Test');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText.tagName).toBe('MARK');
    expect(highlightedText).toHaveClass('bg-yellow-300');
    
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Test Movie' && content.includes('Movie');
    })).toBeInTheDocument();
  });

  it('should handle movie with null poster_path', () => {
    const movieWithNullPoster: Movie = {
      ...mockMovie,
      poster_path: null,
      backdrop_path: null
    };
    
    renderWithProvider(
      <MovieCard movie={movieWithNullPoster} />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });
});