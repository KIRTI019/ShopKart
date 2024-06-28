import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { backendDomain } from "../common/index";
import { useDispatch, useSelector } from "react-redux";
import { setCarts } from "../state/authSlice";
import AddToCartButton from "./AddToCartButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HorizontalProductList = ({ category, heading }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const [hoverIndex, setHoverIndex] = useState(null);
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const fetchProduct = async () => {
    const response = await fetch(`${backendDomain}/product/${category}`, {
      method: "GET",
    });
    const data = await response.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const handleAddToCartClick = (event, product) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(setCarts({ carts: product }));
    console.log(product);
  };

  const styles = {
    base: {
      width: "80%",
      height: "100%",
      objectFit: "scale-down",
      transitionProperty: "all",
      transitionDuration: "150ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      mixBlendMode: "multiply",
    },
    hover: {
      transform: "scale(1.1)",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      p: "0 3%",
      ml: "-2%",
      gap: "20px",
      overflowX: "scroll", // Enable horizontal scrolling
      scrollbarWidth: "none", // Hide scrollbar
      msOverflowStyle: "none", // Hide scrollbar for IE and Edge
      "&::-webkit-scrollbar": {
        display: "none", // Hide scrollbar for WebKit browsers
      },
    },
    arrowButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "black",
      zIndex: 1,
      height: "30px",
      width: "30px",
      color: "white",
      "&: hover": {
        backgroundColor: "black",
      },
    },
    leftArrow: {
      left: "0",
      pl: "15px",
    },
    rightArrow: {
      right: "0",
    },
  };

  return (
    <Box sx={{ userSelect: "none", position: "relative" }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "600",
          textTransform: "uppercase",
          m: "1.5% 3%",
        }}
      >
        {heading}
      </Typography>
      <Box sx={styles.container} ref={scrollElement}>
        {isNonMobileScreen && (
          <>
            <IconButton
              onClick={scrollLeft}
              sx={{ ...styles.arrowButton, ...styles.leftArrow }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <IconButton
              onClick={scrollRight}
              sx={{ ...styles.arrowButton, ...styles.rightArrow }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}

        {product.map((item, index) => (
          <Box key={index} sx={{ cursor: "pointer" }}>
            <Paper
              sx={{
                width: isNonMobileScreen ? "300px" : "175px",
                backgroundColor: "rgb(236 254 255)",
                pb: "10%",
                minHeight: isNonMobileScreen ? "350px" : "250px",
                maxHeight: isNonMobileScreen ? "350px" : "250px",
              }}
            >
              <Box onClick={() => navigate(`/product/${item._id}`)}>
                <Box
                  sx={{
                    width: "100%",
                    height: isNonMobileScreen ? "192px" : "105px",
                    pl: isNonMobileScreen ? "50px" : "30px",
                    backgroundColor: "rgb(226 232 240)",
                  }}
                >
                  <img
                    src={item.images[0]}
                    alt="product"
                    style={
                      hoverIndex === index
                        ? { ...styles.base, ...styles.hover }
                        : styles.base
                    }
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  />
                </Box>
                <Typography
                  textAlign="center"
                  sx={{
                    fontSize: "17.5px",
                    fontWeight: "600",
                    mt: "7%",
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    mt: "5%",
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{ fontWeight: "600", color: "rgb(220 38 38)" }}
                  >
                    ₹{item.sellingPrice}
                  </Typography>
                  <Typography
                    textAlign="center"
                    sx={{
                      textDecoration: "line-through",
                      color: "rgb(71 85 105)",
                    }}
                  >
                    ₹{item.price}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <AddToCartButton
                  product={item}
                  onClick={(event) => handleAddToCartClick(event, item)}
                />
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HorizontalProductList;
