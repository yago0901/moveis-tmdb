import React from 'react';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      
      <footer className="bg-gray-900 text-white p-4 text-center">
        <p>© 2024 MovieDB - Desenvolvido com React e TMDB API</p>
      </footer>
    </div>
  );
};

export default Layout;