import { createContext, useState, ReactNode } from "react";

interface LoaderContextType {
  showLoader: (value: boolean) => void;
  loading: boolean;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined
);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = (value: boolean) => setLoading(value);

  return (
    <LoaderContext.Provider value={{ showLoader, loading }}>
      {children}
    </LoaderContext.Provider>
  );
};
