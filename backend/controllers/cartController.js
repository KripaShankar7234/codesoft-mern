// cartController.js
import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      products: [{ product: productId, quantity: 1 }]
    });
  } else {
    const item = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (item) {
      item.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await cart.save();
  }

  res.json({ products: cart.products });
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("products.product");

  res.json({ products: cart ? cart.products : [] });
};
