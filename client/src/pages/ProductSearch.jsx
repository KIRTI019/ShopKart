import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { backendDomain } from "../common/index";

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || ""; 

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (searchQuery) {
      searchProduct(searchQuery);
    }
  }, [searchQuery]);

  const searchProduct = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendDomain}/search?query=${encodeURIComponent(query)}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box sx={{ mt: isNonMobileScreen ? "5%" : "15%" }}>

      {products.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {products.map((product) => (
            <Box key={product.id} sx={{ mb: 2, p: 2, border: "1px solid gray", borderRadius: "4px" }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">Price: ${product.price}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductSearch;
