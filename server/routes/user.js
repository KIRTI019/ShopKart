import express from "express";
import { verifyToken } from "../middleware/token.js";
import { register, login } from "../controllers/user/auth.js";
import { updateProfile } from "../controllers/user/updateProfile.js";
import { getUserDetails } from "../controllers/user/getUserDetails.js";
import { getAllUser } from "../controllers/user/getAllUser.js";
import { toggleUserRole } from "../controllers/user/toggleUserRole.js";
import { getSearchUser } from "../controllers/user/getSearchUser.js";
import { cartViewProduct } from "../controllers/user/cartViewProduct.js";
import { addToCart } from "../controllers/user/addToCart.js";
import { countAddToCartProduct } from "../controllers/user/countAddToCartProduct .js";
import { deleteAddToCartProduct } from "../controllers/user/deleteAddToCartProduct.js";
import { deleteCart } from "../controllers/user/deleteCart.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:userId", verifyToken, updateProfile);
router.get("/:id", verifyToken, getUserDetails);
router.get("/", getAllUser);
router.put("/toggleRole/:id", toggleUserRole);
router.get("/", getSearchUser);

router.get("/cart/:userId", verifyToken, cartViewProduct);
router.post("/:userId/:productId", verifyToken, addToCart)
router.get("/countAddToCartProduct", verifyToken, countAddToCartProduct)
router.post("/:userId", verifyToken, deleteAddToCartProduct)
router.post("/:userId", verifyToken, deleteCart);

export default router;