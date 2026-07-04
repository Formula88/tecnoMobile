import { createContext, useState } from "react";

export const Context = createContext();

function AppContext({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState("public");
  return <Context.Provider value={{isLogin,setIsLogin,userType,setUserType}}>{children}</Context.Provider>;
}

export default AppContext;
