import { createContext, useState, ReactNode } from "react";

interface LoaderContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined
);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setLoading, loading }}>
      {children}
    </LoaderContext.Provider>
  );
};
