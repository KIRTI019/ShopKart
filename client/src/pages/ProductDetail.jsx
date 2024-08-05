import { Box, Typography, useMediaQuery, Rating } from "@mui/material";
import { backendDomain } from "../common";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HorizontalProductList from "../components/HorizontalProductList";
import AddToCartButton from "../components/AddToCartButton";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const [activeImage, setActiveImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${backendDomain}/product/product-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });
      const data = await response.json();
      setProduct(data);
      if (data.images && data.images.length > 0) {
        setActiveImage(data.images[0]);
      }
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const handleMouseEnterProduct = (imageURL, index) => {
    setActiveImage(imageURL);
    setImageIndex(index);
  };

  const styles = {
    base: {
      width: "100%",
      height: "auto",
      objectFit: "scale-down",
      mixBlendMode: "multiply",
      transition: "transform 0.2s",
    },
    hover: {
      transform: "scale(1.1)",
    },
    container: {
      display: "flex",
      overflowX: "scroll",
      scrollbarWidth: "none",
    },
  };

  return (
    <Box>
      <Box
        sx={{
          display: isNonMobileScreen ? "flex" : "block",
          p: isNonMobileScreen ? "20px" : "20px",
          mt: "5%"
        }}
      >
        <Box sx={{ display: isNonMobileScreen ? "" : "flex", justifyContent: "center", mb: isNonMobileScreen ? "" : "5%" }}>
          {product.images.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "75px",
                height: "75px",
                mb: "1%",
                backgroundColor: "rgb(226 232 240)",
              }}
            >
              <img
                src={item}
                alt={`Product ${index + 1}`}
                style={styles.base}
                onMouseEnter={() => handleMouseEnterProduct(item, index)}
              />
            </Box>
          ))}
        </Box>
          <Box
          sx={{
            width: isNonMobileScreen ? "300px" : "250px",
            height: isNonMobileScreen? "300px" : "250px",
            ml: "5%",
            display: isNonMobileScreen ? "" : "flex",
            justifyContent:isNonMobileScreen ? "" : "center"
          }}
        >
          <img src={activeImage} alt="product" width="100%"  height="100%" />
        </Box>
        <Box
          sx={{
            ml: "3%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgb(254 202 202)",
              color: "rgb(220 38 38)",
              borderRadius: "10px",
              width: "fit-content",
              p: "1% 5%",
              mt: isNonMobileScreen ? "" : "20%"
            }}
          >
            <Typography>{product.brand}</Typography>
          </Box>
          <Typography variant="h4">{product.title}</Typography>
          <Rating value={product.rating} precision={0.1} readOnly />
          <Box
            sx={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Typography sx={{ fontSize: "25px", color: "rgb(220 38 38)" }}>
              ₹{product.sellingPrice}
            </Typography>
            <Typography
              sx={{
                textDecoration: "line-through",
                fontSize: "25px",
                color: "rgb(148 163 184)",
              }}
            >
              ₹{product.price}
            </Typography>
          </Box>
          <Box sx={{
            width: isNonMobileScreen ? "80%" : "40%",
            ml: "-2%"
          }}>
          <AddToCartButton product={product} />
          </Box>
        </Box>
      </Box>
      {product.category && (
        <HorizontalProductList
          category={product.category}
          heading={"Recommended Product"}
        />
      )}
    </Box>
  );
};

export default ProductDetail;
