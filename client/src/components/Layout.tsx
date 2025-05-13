
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Generate a unique key for the location to trigger animations
  const pageKey = location.pathname;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div 
          key={pageKey}
          className="animate-fade-in"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
