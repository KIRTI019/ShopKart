import {
  Box,
  Paper,
  Typography,
  TablePagination,
  useMediaQuery,
  Divider,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { backendDomain } from "../common/index";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ProductForm from "./ProductForm";
import ProductUpdateForm from "./ProductUpdateForm";
import Button from "./Button";

const ProductSetting = () => {
  const [openUserIndex, setOpenUserIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [productUpdate, setProductUpdate] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${backendDomain}/product`, {
        method: "GET",
      });
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpenUserIndex(null);
  };

  const handleToggle = (index) => {
    setOpenUserIndex(openUserIndex === index ? null : index);
  };

  const paginatedProducts = product.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleUpdateProduct = () => {
    setProductToUpdate(product[openUserIndex]);
    setProductUpdate(true);
    handleClose();
  };

  useEffect(() => {}, [productToUpdate]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          m: "5% 4%",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "700", mt: "0.25%" }}>
          Product
        </Typography>
        <Button click={handleOpen} text="Add Product" />
      </Box>

      {open && (
        <Paper
          sx={{
            left: isNonMobileScreen ? "35%" : "10%",
            position: "absolute",
            zIndex: 1000,
            width: isNonMobileScreen ? "40%" : "80%",
          }}
        >
          <ProductForm setOpen={setOpen} />
        </Paper>
      )}

      {productUpdate && (
        <Paper
          sx={{
            left: isNonMobileScreen ? "35%" : "10%",
            position: "absolute",
            zIndex: 1000,
            width: isNonMobileScreen ? "40%" : "80%",
          }}
        >
          <ProductUpdateForm
            setProductUpdate={setProductUpdate}
            productDetail={productToUpdate}
          />
        </Paper>
      )}

      <Box sx={{ p: "5%" }}>
        {paginatedProducts.map((item, index) => (
          <Box key={item._id || index} sx={{ position: "relative" }}>
            <Paper
              sx={{
                width: "100%",
                height: "200px",
                mb: "20px",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: "150px",
                  height: "100%",
                  backgroundColor: "rgb(226 232 240)",
                }}
              >
                <img
                  src={item.images[0]}
                  width="150px"
                  height="100%"
                  alt={item.title}
                  style={{ objectFit: "scale-down", mixBlendMode: "multiply" }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: "17.5px",
                  width: "20%",
                  height: "13%",
                  fontWeight: "600",
                  mt: isNonMobileScreen ? "5%" : "12%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  lineHeight: "24px",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.title}
              </Typography>
              <Typography sx={{ mt: isNonMobileScreen ? "5%" : "12%" }}>
                {item.stock}
              </Typography>
              <Typography sx={{ mt: isNonMobileScreen ? "5%" : "12%" }}>
                ₹{item.sellingPrice}
              </Typography>
              <MoreHorizIcon
                sx={{ cursor: "pointer", mt: isNonMobileScreen ? "5%" : "12%" }}
                onClick={() => handleToggle(index)}
              />
            </Paper>

            {openUserIndex === index && (
              <Paper
                sx={{
                  position: "absolute",
                  right: -60,
                  top: 90,
                  zIndex: 1000,
                  width: "200px",
                  mt: "5px",
                }}
              >
                <Box sx={{ p: 2, cursor: "pointer", textAlign: "center" }}>
                  <ListItemText onClick={handleUpdateProduct}>
                    Update Product
                  </ListItemText>
                  <Divider />
                  <ListItemText onClick={handleClose}>Cancel</ListItemText>
                </Box>
              </Paper>
            )}
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TablePagination
            component="div"
            count={product.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductSetting;
