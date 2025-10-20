import React from 'react';
import { render, type RenderOptions} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockMovieProvider } from './mockContext';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <MockMovieProvider>
        {children}
      </MockMovieProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };