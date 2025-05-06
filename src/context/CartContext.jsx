import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"; // تأكد إن عندك ملف api.js للتعامل مع الـ Axios مثلاً

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ تحميل السلة من الـ API عند بداية التطبيق
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart");
        setCart(response.data.data); // تأكد أن البيانات بترجع بالشكل الصحيح
      } catch (error) {
        console.error("خطأ في تحميل السلة:", error);
      }
    };

    fetchCart();
  }, []);

  // ✅ تحديث السلة في الـ API
  const updateCartAPI = async (newCart) => {
    try {
      await api.put("/cart", { cart: newCart });
    } catch (error) {
      console.error("خطأ في تحديث السلة:", error);
    }
  };

  // ✅ إضافة منتج للسلة
  function addToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.selectedTag === product.selectedTag
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id && item.selectedTag === product.selectedTag
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { id: product.id, selectedTag: product.selectedTag, quantity: 1 }];
      }

      updateCartAPI(updatedCart); // تحديث على السيرفر
      return updatedCart;
    });
  }

  // ✅ زيادة منتج أو إضافته
  function addFromCart(id, selectedTag, removeAll = false) {
    setCart((prevCart) => {
      let itemExists = false;

      const updatedCart = prevCart
        .map((item) => {
          if (item.id === id && item.selectedTag === selectedTag) {
            itemExists = true;
            return removeAll ? null : { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
        .filter(Boolean);

      if (!itemExists && !removeAll) {
        updatedCart.push({ id, selectedTag, quantity: 1 });
      }

      updateCartAPI(updatedCart);
      return updatedCart;
    });
  }

  // ✅ إزالة منتج أو تقليل الكمية
  function removeFromCart(id, selectedTag, removeAll = false) {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === id && item.selectedTag === selectedTag) {
            return removeAll || item.quantity === 1
              ? null
              : { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(Boolean);

      updateCartAPI(updatedCart);
      return updatedCart;
    });
  }

  // ✅ مسح السلة كاملة
  function clearCart() {
    setCart([]);
    updateCartAPI([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, addFromCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
