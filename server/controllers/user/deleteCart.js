import Cart from "../../models/Cart.js";

export const deleteCart = async (req, res) => {
  try {
    const currentUser = req.params.userId;

    const updatedCart = await Cart.findOneAndDelete({ userId: currentUser });

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
