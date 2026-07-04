import { createContext, useState } from "react";

export const Context = createContext();

function AppContext({ children }) {
  const [isLogin, setIsLogin] = useState(true);
  return <Context.Provider value={isLogin}>{children}</Context.Provider>;
}

export default AppContext;
