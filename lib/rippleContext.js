"use client";

import { createContext, useContext, useState } from "react";

const RippleContext = createContext(null);

export function RippleProvider({ children }) {
  const [rippleState, setRippleState] = useState({
    isRippling: false,
    rippleOrigin: { x: 0, y: 0 },
    rippleRadius: 0,
    waveProgress: 0,
    maxRadius: 0,
    minStartRadius: 0, // Add minimum starting radius for synchronization
  });

  return (
    <RippleContext.Provider value={{ rippleState, setRippleState }}>
      {children}
    </RippleContext.Provider>
  );
}

export function useRipple() {
  const context = useContext(RippleContext);
  if (!context) {
    return {
      rippleState: {
        isRippling: false,
        rippleOrigin: { x: 0, y: 0 },
        rippleRadius: 0,
        waveProgress: 0,
        maxRadius: 0,
      },
      setRippleState: () => {},
    };
  }
  return context;
}

