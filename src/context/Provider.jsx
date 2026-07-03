import { createContext, useState } from "react";

export const Context = createContext(null);

function Provider({ children }) {
  const [userType, setUserType] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        userType,
        setUserType,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Provider;