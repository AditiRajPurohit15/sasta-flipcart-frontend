import { createContext, useContext, useState, useEffect } from "react";
import api from '../utils/axiosInstance'

const CartContext = createContext();

export const CartProvider = ({children})=>{
const [cart, setcart] = useState([])
const [cartCount, setCartCount] = useState(0);

  // 🧠 Fetch cart items when user logs in or refreshes page
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart", { withCredentials: true });
      setcart(res.data.items || []);
    } catch (error) {
      console.log("Cart fetch failed (maybe not logged in)");
    }
  };

   useEffect(() => {
    fetchCart();
  }, []);

  // 🪄 Update count whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cart]);

  // ➕ Add item to cart
  const addToCart = async (productId) => {
    try {
      await api.post("/cart/add", { productId }, { withCredentials: true });
      await fetchCart(); // refresh after adding
    } catch (error) {
      alert("⚠️ Please log in to add items!");
    }
  };

   // ❌ Remove item
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`, { withCredentials: true });
      await fetchCart(); // refresh after deleting
    } catch (error) {
      console.log("Remove failed:", error);
    }
  };

  // 🧹 Clear entire cart (optional)
  const clearCart = async () => {
    for (const item of cart) {
      await removeFromCart(item.product._id);
    }
  };



return (
    <CartContext.Provider value={ {cart, cartCount, addToCart, removeFromCart, clearCart, fetchCart}}>
        {children}
    </CartContext.Provider>
)

}

export const useCart = ()=> useContext(CartContext)
