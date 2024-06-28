import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { backendDomain } from "../common/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToCartButton from "../components/AddToCartButton";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const [cartItems, setCartItems] = useState([]);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${backendDomain}/user/cart/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data && Array.isArray(data.items)) {
        setCartItems(data.items);
        calculateTotal(data.items);
      } else {
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantity(0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantity(0);
    }
  };

  const calculateTotal = (items) => {
    let total = 0;
    let quantity = 0;
    items.forEach((item) => {
      total += item.productId.sellingPrice * item.quantity;
      quantity += item.quantity;
    });
    setTotalPrice(total);
    setTotalQuantity(quantity);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Box
      sx={{ p: "2%", display: isNonMobileScreen ? "flex" : "block", mt: isNonMobileScreen ? "5%" : "15%" }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cartItems.map((item, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              display: "flex",
              width: isNonMobileScreen ? "50%" : "100%",
              height: "150px",
            }}
          >
            <Box
              sx={{
                width: "150px",
                height: "100%",
                backgroundColor: "rgb(226 232 240)",
                p: "4%",
              }}
            >
              <img
                src={item.productId.images[0]}
                alt={item.productId.title}
                width="100%"
                height="100%"
                style={{ objectFit: "contain", borderRadius: "5px" }}
              />
            </Box>
            <Box sx={{ m: "3% 5%", flex: "1" }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  lineHeight: "24px",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.productId.title}
              </Typography>
              <Typography sx={{ color: "rgb(220 38 38)", fontWeight: "600" }}>
                ₹{item.productId.sellingPrice}
              </Typography>
              <Box
                sx={{ m: isNonMobileScreen ? "0 0 0 -5%" : "", width: "60%" }}
              >
                <AddToCartButton product={item.productId} />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          width: isNonMobileScreen ? "60%" : "100%",
          height: "10%",
          mt: isNonMobileScreen ? "" : "30px",
        }}
      >
        <Paper elevation={3}>
          <Typography
            sx={{
              backgroundColor: "rgb(220 38 38)",
              textAlign: "center",
              color: "white",
              p: "2% 0",
            }}
          >
            PRICE DETAIL
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "1% 3%",
              color: "rgb(71 85 105)",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
              Quantity :{" "}
            </Typography>
            <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
              {totalQuantity}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "1% 3%",
              color: "rgb(71 85 105)",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
              Total Price :{" "}
            </Typography>
            <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
              ₹{totalPrice}
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "rgb(37 99 235)",
              color: "white",
              p: "2% 0",
              cursor: "pointer",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
              Payment
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CartPage;
