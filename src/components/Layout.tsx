// components/Layout.tsx
import { ReactNode } from 'react';
import { Button } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Movie Management App</h1>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-blue-500 text-white p-4 text-center mt-auto">
        © 2024 Movie Management App
      </footer>
    </div>
  );
}
