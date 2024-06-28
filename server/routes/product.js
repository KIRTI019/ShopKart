import express from "express";
import { getCategoryWiseProduct } from "../controllers/product/getCategoryWiseProduct.js";
import { uploadProduct } from "../controllers/product/uploadProduct.js";
import { getAllProduct } from "../controllers/product/getAllProduct.js";
import { getProductDetail } from "../controllers/product/getProductDetail.js";
import { verifyToken } from "../middleware/token.js";
import { searchProduct } from "../controllers/product/searchProduct.js";

const router = express.Router();

router.get("/:category", getCategoryWiseProduct);
router.get("/", getAllProduct);
router.post("/add-product", verifyToken, uploadProduct);
router.post("/product-details", getProductDetail);
router.get("/search", searchProduct);

export default router;