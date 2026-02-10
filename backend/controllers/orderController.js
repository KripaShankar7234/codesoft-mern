import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate("products.product");

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const totalAmount = cart.products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: userId,
    items: cart.products,
    totalAmount,
    paymentStatus: "COD",
    orderStatus: "Placed",
  });

  // clear cart
  cart.products = [];
  await cart.save();

  res.status(201).json(order);
};
