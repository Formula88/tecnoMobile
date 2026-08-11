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

  const [cardItem, setCardItem] = useState([]);

  const handleIncreaseProductQty = (id) => {
    setCardItem((currentItem) => {
      let selectedItem = currentItem.find((item) => item.id == id);

      if (selectedItem == null) {
        return [...currentItem, { id: id, qty: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleDecreaseProductQtt = (id) => {
    setCardItem((currentItem) => {
      let selectedItem = currentItem.find((item) => item.id == id);

      if (selectedItem?.qty == 1) {
        return currentItem.filter((item) => item.id != id);
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getProductQty = (id) => {
    return cardItem.find((item) => item.id == id)?.qty || 0;
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        userType,
        setUserType,
        setScrollEnabled,
        isLoading,
        handleIncreaseProductQty,
        handleDecreaseProductQtt,
        getProductQty,
        cardItem
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppContext;
