import Product from "../../models/Product.js";

export const getAllProduct = async(req, res) => {
    try {
      const product = await Product.find();

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }