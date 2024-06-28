import Cart from "../../models/Cart.js";

export const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.params.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId: currentUser });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));

    await cart.save();

    const updatedCart = await Cart.findOne({ userId: currentUser }).populate("items.productId");

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};