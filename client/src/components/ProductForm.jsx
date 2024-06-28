import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import uploadImage from "../helper/uploadImage";
import { backendDomain } from "../common";
import { setProducts } from "../state/authSlice";
import UploadIcon from "@mui/icons-material/Upload";

const ProductForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    title: "",
    brand: "",
    stock: "",
    rating: "",
    category: "",
    images: [],
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        images: [...preve.images, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newImages = [...data.images];
    newImages.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        images: [...newImages],
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${backendDomain}/product/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    handleClose();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: "8% 5%", overflowY: "auto", maxHeight: "400px" }}>
          <Stack spacing={3}>
            <TextField
              name="title"
              placeholder="Title"
              value={data.title}
              onChange={handleOnChange}
            />
            <TextField
              name="sellingPrice"
              placeholder="Selling Price"
              type="number"
              value={data.sellingPrice}
              onChange={handleOnChange}
            />
            <TextField
              name="price"
              placeholder="Price"
              type="number"
              value={data.price}
              onChange={handleOnChange}
            />
            <TextField
              name="rating"
              placeholder="Rating"
              type="number"
              value={data.rating}
              onChange={handleOnChange}
            />
            <TextField
              name="stock"
              placeholder="Stock"
              type="number"
              value={data.stock}
              onChange={handleOnChange}
            />
            <TextField
              name="brand"
              placeholder="Brand"
              value={data.brand}
              onChange={handleOnChange}
            />
            <TextField
              name="category"
              placeholder="Category"
              value={data.category}
              onChange={handleOnChange}
            />
            <Box border={`1px solid`} borderRadius="5px" p="1rem">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <UploadIcon />
                <Typography>Upload Image</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  m: "3% 0 0 10%",
                }}
              >
                <input type="file" multiple onChange={handleUploadProduct} />
              </Box>
            </Box>
            <Box>
              {data.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={image}
                    alt={`product-img-${index}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <Button onClick={() => handleDeleteProductImage(index)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
          >
            Save
          </Button>
          <Button
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
