import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useCart } from '@/hooks/use-cart';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { items } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/categories' },
    { name: 'Artisans', path: '/artisans' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <i className="ri-seedling-line text-2xl text-primary mr-2"></i>
            <span className="font-heading text-xl font-bold text-primary">Artisana</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={`font-accent text-sm font-medium transition-all ${location === link.path ? 'text-primary' : 'hover:text-primary'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-lg hover:text-primary transition-all">
              <i className="ri-search-line"></i>
            </Link>
            <Link href="/account" className="text-lg hover:text-primary transition-all">
              <i className="ri-user-line"></i>
            </Link>
            <Link href="/cart" className="text-lg hover:text-primary transition-all relative">
              <i className="ri-shopping-cart-2-line"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-gray-600 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white px-4 pt-2 pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`font-accent text-sm font-medium ${location === link.path ? 'text-primary' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-6 mt-4">
          <Link href="/search" className="text-lg" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="ri-search-line"></i>
          </Link>
          <Link href="/account" className="text-lg" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="ri-user-line"></i>
          </Link>
          <Link href="/cart" className="text-lg relative" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="ri-shopping-cart-2-line"></i>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
