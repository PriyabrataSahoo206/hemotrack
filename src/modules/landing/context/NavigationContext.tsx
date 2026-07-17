import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageId =
  | 'home'
  | 'problem'
  | 'solution'
  | 'how-it-works'
  | 'safety'
  | 'leadership'
  | 'journey'
  | 'demo'
  | 'drive'
  | 'volunteer'
  | 'terms'
  | 'privacy';

interface NavigationContextType {
  activePage: PageId;
  navigateTo: (pageId: PageId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  // Read initial page state from window hash if present, defaulting to 'home'
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace('#', '');
    const validPages: PageId[] = [
      'home',
      'problem',
      'solution',
      'how-it-works',
      'safety',
      'leadership',
      'journey',
      'demo',
      'drive',
      'volunteer',
      'terms',
      'privacy',
    ];
    return validPages.includes(hash as PageId) ? (hash as PageId) : 'home';
  };

  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);

  // Synchronize state when the back/forward history buttons are clicked or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId: PageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ activePage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
