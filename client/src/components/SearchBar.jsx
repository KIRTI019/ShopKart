import React, { useState } from 'react';
import { Box, InputBase, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      navigate(`/search?query=${encodeURIComponent(e.target.value)}`);
    } else {
      navigate('/search');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  }

  return (
    <Box 
      sx={{
        display: "flex",
        border: "1px solid black",
        borderRadius: "20px",
        p: isNonMobileScreen ? "0 1rem" : "0 8px",
        width: isNonMobileScreen ? "auto" : "30%"
      }}
    >
      <SearchIcon 
        sx={{
          mt: "5px",
          mr: isNonMobileScreen ? "0.9rem" : "0.4rem"
        }} 
      />
      <InputBase 
        value={query} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown} 
        placeholder="Search..."
      />
    </Box>
  );
}

export default SearchBar;
