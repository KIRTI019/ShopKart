import { Box, Button, Paper, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { backendDomain } from "../common/index";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProductForm from "./ProductForm";

const ProductSetting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchAllProduct = async () => {
    const response = await fetch(`${backendDomain}/product`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setProduct(data);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleOpen = () => setOpen(true);

  return (
    <Box sx={{ width: "80%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          m: "3% 4% 3% 4%",
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "700", mt: "0.25%" }}>
          Product
        </Typography>
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Button
          sx={{
            backgroundColor: "skyblue",
            color: "black",
          }}
          onClick={handleOpen}
        >
          Add Product
        </Button>
      </Box>

      {/* {product.map((item, index) => (
        <Box key={index}>
          <Paper sx={{ display: "flex", m: "2% 5% 2% 5%", }}>
            <img src={item.thumbnail} alt={item.title} height="100px" width="100px" />
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "74%"
            }}>
            <Typography>{item.title}</Typography>
            <Typography>{item.stock}</Typography>
            <MoreHorizIcon sx={{ cursor: "pointer" }} />
            </Box>
          </Paper>
          </Box>
      ))} */}

      {open && (
        <Paper sx={{
          width: "50%",
          m: "4% 25%"
        }}>
          <ProductForm setOpen={setOpen} />
        </Paper>
      )}
    </Box>
  );
};

export default ProductSetting;
