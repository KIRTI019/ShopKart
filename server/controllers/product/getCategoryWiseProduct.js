import Product from "../../models/Product.js";

export const getCategoryWiseProduct = async(req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
