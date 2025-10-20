import React from 'react';
import { vi } from 'vitest';

export const useNavigate = vi.fn(() => vi.fn());
export const useParams = vi.fn(() => ({}));
export const useLocation = vi.fn(() => ({}));
export const BrowserRouter = ({ children }: { children: React.ReactNode }) => children;
export const Link = ({ children, to }: { children: React.ReactNode; to: string }) => 
  React.createElement('a', { href: to }, children);