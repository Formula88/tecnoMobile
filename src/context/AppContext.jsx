import { createContext, useEffect, useState } from "react";
import { useLocalStorage, useScrollbar } from "../hooks/hooks";
import { getMe, logout } from "../services/api";

export const Context = createContext();

function AppContext({ children }) {
  const { scrollbarRef, setScrollEnabled } = useScrollbar();
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState("public");
  const [userNumber, setUserNumber] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const loginUserSession = (userData) => {
    setIsLogin(true);
    setUserType(userData.userType || "public");
    setUserNumber(userData.phoneNumber || userData.phone || "");
    setUser(userData);
    setUserName(userData.username || "");
    setUserEmail(userData.email || "");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await getMe();
        if (result?.success && result.user) {
          loginUserSession(result.user);
        } else {
          setIsLogin(false);
          setUserType("public");
          setUserNumber("");
          setUser(null);
          setUserName("");
          setUserEmail("");
        }
      } catch {
        setIsLogin(false);
        setUserType("public");
        setUser(null);
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, []);

  const logoutUser = async () => {
    await logout();
    setIsLogin(false);
    setUserType("public");
    setUserNumber("");
    setUser(null);
    setUserName("");
    setUserEmail("");
  };

  const isLoading = false;

  const [cardItem, setCardItem] = useLocalStorage("itemCards", []);

  const handleIncreaseProductQty = (id, model = null, totalPrice, price) => {
    setCardItem((currentItem) => {
      const selectedItem = currentItem.find(
        (item) => item.id == id && item.model == model,
      );

      if (selectedItem == null) {
        return [...currentItem, { id, model, qty: 1, price, totalPrice }];
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

  const priceProduct = cardItem.reduce((price, item) => {
    return price + item.price * item.qty;
  }, 0);

  const totalPriceProduct = cardItem.reduce((totalPrice, item) => {
    return totalPrice + item.totalPrice * item.qty;
  }, 0);

  const discountProduct = priceProduct - totalPriceProduct;

  const cardItemRemoveProduct = (id, model = null) => {
    setCardItem((currentItem) => {
      return currentItem.filter(
        (item) => !(item.id == id && item.model == model),
      );
    });
  };

  const clearCart = () => {
    setCardItem([]);
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        userType,
        setUserType,
        userNumber,
        setUserNumber,
        user,
        setUser,
        userName,
        userEmail,
        loginUserSession,
        isAuthChecking,
        logoutUser,
        scrollbarRef,
        setScrollEnabled,
        isLoading,
        handleIncreaseProductQty,
        handleDecreaseProductQtt,
        getProductQty,
        cardItem,
        productCount,
        cardItemRemoveProduct,
        clearCart,
        priceProduct,
        totalPriceProduct,
        discountProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppContext;
