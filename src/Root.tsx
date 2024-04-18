import React, { createContext, useState } from "react";
import { AppWrapper } from "./AppWrapper";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const NavigationContext = createContext<{
  isNavigating: boolean;
  setIsNavigating: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isNavigating: false,
  setIsNavigating: () => {},
});

export const Root: React.FC = () => {
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  return (
    <NavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
      <AppWrapper>
        <Header />
        <Outlet />
      </AppWrapper>
    </NavigationContext.Provider>
  );
};
