import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Movie } from '../tipes/movie';


interface AppState {
  favorites: Movie[];
  searchQuery: string;
}

type AppAction =
  | { type: 'ADD_FAVORITE'; payload: Movie }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

interface MovieContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

const initialState: AppState = {
  favorites: [],
  searchQuery: '',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const exists = state.favorites.some(movie => movie.id === action.payload.id);
      if (exists) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    
    case 'REMOVE_FAVORITE':
      return { 
        ...state, 
        favorites: state.favorites.filter(movie => movie.id !== action.payload) 
      };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    default:
      return state;
  }
}

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};