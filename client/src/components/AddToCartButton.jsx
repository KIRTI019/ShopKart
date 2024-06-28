import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { backendDomain } from "../common/index";

const AddToCartButton = ({ product }) => {
  const [productCart, setProductCart] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

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
    console.log(cartItem);
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
            onClick={removeProduct}
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            <RemoveIcon />
          </Button>
          <Typography mt="3%">{productCart}</Typography>
          <Button
            onClick={addProduct}
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "black" },
            }}
          >
            <AddIcon />
          </Button>
        </Box>
      ) : (
        <Button
          onClick={addProduct}
          sx={{
            m: "3% 0",
            p: "5%",
            backgroundColor: "black",
            width: "90%",
            color: "white",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          Add To Cart
        </Button>
      )}
    </Box>
  );
};

export default AddToCartButton;
