import Product from "../../models/Product.js";

export const uploadProduct = async (req, res) => {
  try {
    const {
      title,
      sellingPrice,
      price,
      rating,
      stock,
      brand,
      category,
      images,
    } = req.body;
    
    const uploadProduct = new Product({
      title,
      sellingPrice,
      price,
      rating,
      stock,
      brand,
      category,
      images,
    });
    const product = await uploadProduct.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
