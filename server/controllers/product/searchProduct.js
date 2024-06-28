import Product from "../../models/Product.js";

export const searchProduct = async (req, res) => {
  try {
    const { query } = req.query.q;
    const products = await Product.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { category: new RegExp(query, 'i') },
      ],
    });

    if(!products) res.status(404).json("Product not found");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
