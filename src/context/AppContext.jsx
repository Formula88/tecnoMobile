import { createContext, useState } from "react";
import { useScrollbar } from "../hooks/hooks";

export const Context = createContext();

function AppContext({ children }) {
  const { scrollbarRef, setScrollEnabled } = useScrollbar();
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState("public");
  return (
    <Context.Provider
      value={{ isLogin, setIsLogin, userType, setUserType, setScrollEnabled }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppContext;
