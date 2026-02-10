import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ BACKEND RETURNS { products: [] }
      setCartItems(res.data.products || []);
    } catch (error) {
      console.error("Cart fetch error:", error);
      toast.error("Failed to load cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.dispatchEvent(new Event("cartUpdated"));
      fetchCart();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();  
  }, []); // ✅ RUN ONCE ONLY

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cartItems.length === 0 && (
        <p className="text-gray-600">Cart is empty</p>
      )}

      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="border p-3 mb-3 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{item.product.title}</h3>
            <p>Qty: {item.quantity}</p>
            <p>₹ {item.product.price}</p>
          </div>

          <button
            onClick={() => removeItem(item.product._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
