import { createContext, useState } from "react";

export const Context = createContext();

function AppContext({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  return <Context.Provider value={isLogin}>{children}</Context.Provider>;
}

export default AppContext;
