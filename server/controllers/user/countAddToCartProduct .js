import Cart from "../../models/Cart.js";

export const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await Cart.countDocuments({userId: userId});

    res.status(200).json(count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
