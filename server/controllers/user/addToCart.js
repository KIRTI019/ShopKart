import Cart from "../../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const currentUser = req.params.userId;

    let cartItem = await Cart.findOne({ userId: currentUser });

    if (cartItem) {
      const existingItem = cartItem.items.find(item => item.productId == productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cartItem.items.push({ productId, quantity });
      }
      await cartItem.save();
    } else {
      cartItem = new Cart({
        userId: currentUser,
        items: [{ productId, quantity }]
      });
      await cartItem.save();
    }

    const updatedCart = await Cart.findOne({ userId: currentUser }).populate("items.productId");

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
