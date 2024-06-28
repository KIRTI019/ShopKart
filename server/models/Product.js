import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    price: {
        type: Number,
        require: true,
        min: 10,
    },
    sellingPrice: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    images: {
        type: [String],
        require: true,
        unique: true
    }
},
{timestamps: true}
);

const Product = mongoose.model("Product", productSchema);

export default Product;