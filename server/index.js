import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import { verifyToken } from "./middleware/token.js";
import { paymentIntent } from "./controllers/paymentIntent.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.post("/payment", verifyToken, paymentIntent);

const PORT = process.env.PORT || 7001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is listeniing at ${PORT}`));
  })
  .catch((err) => {
    console.log(`${err} did not connect`);
  });
