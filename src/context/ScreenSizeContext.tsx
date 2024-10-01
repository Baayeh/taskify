import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ScreenSizeContextType {
  isSmallScreen: boolean;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
export const ScreenSizeContext = createContext<ScreenSizeContextType | null>(
  null
);

// Create a provider component
export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Update screen size based on window resize
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Set the initial value
    setIsSmallScreen(mediaQuery.matches);

    // Define a callback to handle media query changes
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);

    // Add a listener to the media query
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <ScreenSizeContext.Provider
      value={{ isSmallScreen, showDetails, setShowDetails }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};
