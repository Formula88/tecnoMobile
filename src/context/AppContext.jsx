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

  const handleIncreaseProductQty = (id, model = null) => {
    setCardItem((currentItem) => {
      const selectedItem = currentItem.find(
        (item) => item.id == id && item.model == model,
      );

      if (selectedItem == null) {
        return [...currentItem, { id, model, qty: 1 }];
      }

      return currentItem.map((item) => {
        if (item.id == id && item.model == model) {
          return { ...item, qty: item.qty + 1 };
        }

        return item;
      });
    });
  };

  const handleDecreaseProductQtt = (id, model = null) => {
    setCardItem((currentItem) => {
      const selectedItem = currentItem.find(
        (item) => item.id == id && item.model == model,
      );

      if (selectedItem?.qty == 1) {
        return currentItem.filter(
          (item) => !(item.id == id && item.model == model),
        );
      }

      return currentItem.map((item) => {
        if (item.id == id && item.model == model) {
          return { ...item, qty: item.qty - 1 };
        }

        return item;
      });
    });
  };

  const getProductQty = (id, model = null) => {
    return (
      cardItem.find((item) => item.id == id && item.model == model)?.qty || 0
    );
  };

  const productCount = cardItem.reduce((totalItem, item) => {
    return totalItem + item.qty;
  }, 0);

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
        cardItem,
        productCount,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppContext;
