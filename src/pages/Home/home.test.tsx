import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useMovies } from '../../hooks/useMovies';
import { MockMovieProvider, mockMovie } from '../../test-utils/mockContext';
import Home from '.';

vi.mock('../../hooks/useMovies', () => {
  return {
    useMovies: vi.fn()
  };
});

vi.mock('../../components/common/MovieCard/skeleton', () => ({
  MovieCardSkeleton: () => <div data-testid="movie-card-skeleton">Skeleton</div>
}));

vi.mock('../../components/common/MovieCard', () => ({
  default: ({ movie }: { movie: any }) => (
    <div data-testid="movie-card">
      <h3>{movie.title}</h3>
    </div>
  )
}));

const mockUseMovies = useMovies as jest.Mock;

describe('Home', () => {
  const defaultMockValues = {
    movies: [],
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 1,
    loadPopularMovies: vi.fn(),
    loadMore: vi.fn(),
    searchMovies: vi.fn(),
    clearMovies: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMovies.mockReturnValue(defaultMockValues);
  });

  const renderHome = () => {
    return render(
      <BrowserRouter>
        <MockMovieProvider>
          <Home />
        </MockMovieProvider>
      </BrowserRouter>
    );
  };

  it('should render popular movies on initial load', () => {
    const mockMovies = [
      { ...mockMovie, id: 1, title: 'Test Movie 1' },
      { ...mockMovie, id: 2, title: 'Test Movie 2' }
    ];

    mockUseMovies.mockReturnValue({
      ...defaultMockValues,
      movies: mockMovies
    });

    renderHome();

    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });

  it('should call loadPopularMovies on mount', () => {
    const mockLoadPopularMovies = vi.fn();
    
    mockUseMovies.mockReturnValue({
      ...defaultMockValues,
      loadPopularMovies: mockLoadPopularMovies
    });

    renderHome();

    expect(mockLoadPopularMovies).toHaveBeenCalledWith(1);
  });

  it('should show loading skeletons when loading', () => {
    mockUseMovies.mockReturnValue({
      ...defaultMockValues,
      loading: true
    });

    renderHome();

    const skeletons = screen.getAllByTestId('movie-card-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should show error message and retry button when there is an error', () => {
    const mockLoadPopularMovies = vi.fn();
    const errorMessage = 'Failed to load movies';

    mockUseMovies.mockReturnValue({
      ...defaultMockValues,
      error: errorMessage,
      loadPopularMovies: mockLoadPopularMovies
    });

    renderHome();

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    
    const retryButton = screen.getByRole('button', { name: /tentar novamente/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockLoadPopularMovies).toHaveBeenCalledWith(1);
  });

  it('should show load more button when there are more movies to load', () => {
    const mockLoadMore = vi.fn();

    mockUseMovies.mockReturnValue({
      ...defaultMockValues,
      movies: [mockMovie],
      hasMore: true,
      loadMore: mockLoadMore
    });

    renderHome();

    const loadMoreButton = screen.getByRole('button', { name: /carregar mais filmes/i });
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);
    expect(mockLoadMore).toHaveBeenCalled();
  });
});