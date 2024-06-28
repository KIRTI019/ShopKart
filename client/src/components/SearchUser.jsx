import { useState, useEffect } from "react";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { backendDomain } from "../common/index";

const SearchUser = ({ query }) => {
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

  const fetchSearchUser = async() => {
    const response = await fetch(`${backendDomain}/user?q=${query}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    fetchSearchUser();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchSearchUser(e.target.value);
  };

  return (
      <Box sx={{ mt: 4 }}>
        {user.map((product) => (
          <Paper key={product._id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>{product.price}</Typography>
          </Paper>
        ))}
      </Box>
  )
};

export default SearchUser;
