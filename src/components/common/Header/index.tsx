import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../../../context/MovieContext';

const Header: React.FC = () => {
  const [localQuery, setLocalQuery] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useMovieContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: localQuery });
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          🎬 MovieDB
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl w-full">
          <div className="relative">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Buscar filmes..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        <nav className="flex gap-4">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-blue-400 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/favorites')}
            className="hover:text-blue-400 transition-colors"
          >
            Favoritos
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;