import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import { MovieProvider } from './context/MovieContext';
import Layout from './components/common/Layout';
import Favorites from './pages/Favorites';
import Search from './pages/Search';

function App() {
  return (
    <MovieProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Router>
    </MovieProvider>
  );
}

export default App;