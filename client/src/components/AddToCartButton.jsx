import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { backendDomain } from "../common/index";
import Button from "./Button";

const AddToCartButton = ({ product }) => {
  const [productCart, setProductCart] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const fetchCart = async () => {
    try {
      const response = await fetch(`${backendDomain}/user/cart/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const item = data.items.find(
        (item) => item.productId._id === product._id
      );
      if (item) {
        setCartItem(item);
        setProductCart(item.quantity);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [product._id]);

  const handleAddToCart = async (id, quantity) => {
    const response = await fetch(
      `${backendDomain}/user/${user._id}/${product._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity: quantity,
        }),
      }
    );
    const data = await response.json();
    setCartItem(data);
  };

  const deleteCartProduct = async (id, quantity) => {
    const response = await fetch(`${backendDomain}/user/${user._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        quantity: quantity,
      }),
    });
    const data = await response.json();
    setCartItem(data);
  };

  useEffect(() => {
    const findCartItem = () => {
      if (cartItem && cartItem.length > 0) {
        const item = cartItem.find(
          (item) => item.productId && item.productId._id === product._id
        );
        if (item) {
          setProductCart(item.quantity);
          setCartItem(item);
        }
      }
    };
    findCartItem();
  }, [cartItem, product._id]);

  const addProduct = () => {
    const newQuantity = productCart + 1;
    setProductCart(newQuantity);
    handleAddToCart(product._id, newQuantity);
  };

  const removeProduct = () => {
    const newQuantity = productCart - 1;
    if (newQuantity === 0) {
      setCartItem(null);
      setProductCart(0);
      deleteCartProduct(product._id, newQuantity);
    } else {
      setProductCart(newQuantity);
      handleAddToCart(product._id, newQuantity);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {productCart ? (
        <Box sx={{ display: "flex", mt: "5%", gap: "10px" }}>
          <Button
            click={removeProduct}
            text={<RemoveIcon />}
            width= {isNonMobileScreen ? "100%" : "70%"}
          />
          <Typography mt="5%">{productCart}</Typography>
          <Button
            click={addProduct}
            text={<AddIcon />}
            width= {isNonMobileScreen ? "100%" : "70%"}
          />
        </Box>
      ) : (
        <Box sx={{ m: "5% 0 0 -5%" }}>
          <Button
            text="Add To Cart"
            click={addProduct}
            width= {isNonMobileScreen ? "120%" : "110%"}
          />
        </Box>
      )}
    </Box>
  );
};

export default AddToCartButton;
