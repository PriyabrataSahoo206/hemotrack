import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Activity, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigation, PageId } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { activePage, navigateTo } = useNavigation();
  const { user, signInWithGoogle, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; pageId: PageId }[] = [
    { name: 'Home', pageId: 'home' },
    { name: 'The Challenges', pageId: 'problem' },
    { name: 'Solution & Modules', pageId: 'solution' },
    { name: 'How It Works', pageId: 'how-it-works' },
    { name: 'Safety & Compliance', pageId: 'safety' },
    { name: 'Drive Vault', pageId: 'drive' },
    { name: 'Volunteers', pageId: 'volunteer' },
    { name: 'Our Journey', pageId: 'journey' },
    { name: 'Leadership & Vision', pageId: 'leadership' },
  ];

  const handlePageSelect = (pageId: PageId) => {
    setIsOpen(false);
    navigateTo(pageId);
  };


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Brand Panel */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handlePageSelect('home');
            }}
            className="flex items-center gap-2 group focus:outline-none"
            id="nav-logo"
            aria-label="HemoTrack Main Page"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 shadow-md shadow-red-500/25 group-hover:scale-105 transition-transform duration-200">
              <Activity className="text-white w-5.5 h-5.5" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <Shield className="text-[6px] text-white w-2 h-2" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight block">
                Hemo<span className="text-red-600">Track</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase block -mt-1.5">
                Logistics & Guard
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.pageId;
              return (
                <a
                  key={link.name}
                  href={`#${link.pageId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageSelect(link.pageId);
                  }}
                  className={`px-3.5 py-2.5 text-xs xl:text-sm font-bold transition-all rounded-xl relative ${
                    isActive
                      ? 'text-red-600 bg-red-50/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-red-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Button Panel */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handlePageSelect('solution')}
              className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
            >
              Explore Platform
            </button>
            {user ? (
              <div className="flex items-center gap-2 bg-slate-100/80 rounded-xl p-1.5 pl-3 border border-slate-200">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full border border-red-200" referrerPolicy="no-referrer" />
                ) : (
                  <User className="w-4 h-4 text-slate-600" />
                )}
                <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">{user.displayName || user.email}</span>
                <button
                  onClick={logout}
                  className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl text-sm shadow-md shadow-red-600/15 hover:shadow-lg hover:shadow-red-600/25 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Hamburguer Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-red-600/50 hover:bg-slate-50 transition-colors"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-200/80 overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activePage === link.pageId;
                return (
                  <a
                    key={link.name}
                    href={`#${link.pageId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageSelect(link.pageId);
                    }}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-red-50 text-red-600 font-extrabold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => handlePageSelect('solution')}
                  className="flex items-center justify-center py-3 text-sm font-bold text-slate-700 rounded-xl hover:bg-slate-50 border border-slate-200"
                >
                  Explore Platform
                </button>
                {user ? (
                  <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-red-200" referrerPolicy="no-referrer" />
                      ) : (
                        <User className="w-6 h-6 text-slate-600" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">{user.displayName || 'User'}</span>
                        <span className="text-[10px] text-slate-500 font-mono truncate">{user.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="mt-2 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="flex items-center justify-center gap-1.5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md shadow-red-600/20"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In with Google
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
