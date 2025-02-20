"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * Provides a loading context to all its children. This context is used to
 * globally show or hide a loading indicator.
 *
 * @param {{ children: ReactNode }} props
 * @return {*} 
 */
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

/**
 * Hook to get the current loading state and functions to show/hide the
 * loading indicator.
 *
 * @returns {{ isLoading: boolean, showLoader: () => void, hideLoader: () => void }}
 * @throws {Error} If this hook is used outside of a LoadingProvider.
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
