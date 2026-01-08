'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  isTransitioning: boolean;
}

interface DockContextType {
  pagination: PaginationProps | null;
  setPagination: (pagination: PaginationProps | null) => void;
}

const DockContext = createContext<DockContextType | null>(null);

export function DockProvider({ children }: { children: ReactNode }) {
  const [pagination, setPagination] = useState<PaginationProps | null>(null);

  return (
    <DockContext.Provider value={{ pagination, setPagination }}>
      {children}
    </DockContext.Provider>
  );
}

export function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within a DockProvider');
  }
  return context;
}
