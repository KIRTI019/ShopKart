import { Box, Typography } from '@mui/material';
import { backendDomain } from "../common/index";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  const [products, setProducts] = useState([]);

  const searchProduct = async() => {
    const response = await fetch(`${backendDomain}/product/search?q=${searchQuery}`, {
      method: "GET"
    });
      const data = await response.json();
      console.log("Received data:", data);
      setProducts(data);
  }

  useEffect(() => {
      searchProduct();
  }, [searchQuery]);

  return (
    <Box sx={{ mt: "5%" }}>
          {products.map((item, index) => (
            <Box key={index}>
              <Typography>{item.title}</Typography>
            </Box>
          ))}
    </Box>
  )
}

export default ProductSearch;
