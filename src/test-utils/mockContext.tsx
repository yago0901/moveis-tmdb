import React from 'react';
import { vi } from 'vitest';
import type { Movie } from '../tipes/movie';
import { MovieContext } from '../context/MovieContext';

export const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.5,
  release_date: '2023-01-01',
  overview: 'Test movie overview',
  genres: [{ id: 1, name: 'Action' }]
};

export const mockMovieContext = {
  state: {
    favorites: [],
    searchQuery: '',
    sortOption: 'title-asc'
  },
  dispatch: vi.fn()
};

export const MockMovieProvider: React.FC<{ 
  children: React.ReactNode; 
  value?: any 
}> = ({ children, value = mockMovieContext }) => {
  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};