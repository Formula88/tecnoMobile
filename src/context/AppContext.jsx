import { createContext, useEffect, useState } from "react";
import { useScrollbar } from "../hooks/hooks";
import { registerLoading } from "../services/loadingService";

export const Context = createContext();

function AppContext({ children }) {
  const { scrollbarRef, setScrollEnabled } = useScrollbar();
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState("public");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    registerLoading(setIsLoading);
  }, []);
  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        userType,
        setUserType,
        setScrollEnabled,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppContext;
