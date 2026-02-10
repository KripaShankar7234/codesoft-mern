import React, { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(res.data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-4 rounded"
        >
          <p className="font-semibold">
            Order ID: {order._id}
          </p>

          {order.products.map((item) => (
            <p key={item.product._id}>
              {item.product.title} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
