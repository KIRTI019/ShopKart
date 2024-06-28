import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { setLogout } from "../state/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null }));
    handleClose();
  };

  const handleAdminPanel = () => {
    if (user.role === "admin") {
      navigate("/admin-panel");
    } else {
      navigate("/");
    }
    handleClose();
  };

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/search?q=${searchQuery}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: isNonMobileScreen ? "15px" : "10px",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        {!isNonMobileScreen && <Sidebar />}
        <Logo />
        <Box sx={{ flexGrow: isNonMobileScreen ? "" : 1 }} />
        {isNonMobileScreen ? (
          <Box sx={{
            pr: "200px"
          }}>
            <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
          />
          </Box>
        ) : (
          <Box sx={{ cursor: "pointer", fontSize: "2rem", m: user ? "-1% -5% 0 0" : "-1% 5% 0 0" }}>
            <SearchIcon />
          </Box>
        )}
        {user ? (
          <Box
            sx={{
              width: isNonMobileScreen ? "5%" : "20%",
              display: "flex",
              justifyContent: isNonMobileScreen ? "space-between" : "",
              gap: isNonMobileScreen ? "" : "15px",
              m: isNonMobileScreen ? "0.5% 1.5% 0 0" : "2% -10% 0 0",
            }}
          >
            <Box sx={{ display: isNonMobileScreen ? "block" : "none" }}>
              <PersonIcon onClick={handleClick} sx={{ cursor: "pointer" }} />
              {open && (
                <Paper
                  sx={{
                    position: "absolute",
                    cursor: "pointer",
                    ml: isNonMobileScreen ? "-3%" : "-8%",
                    p: "0.5% 0",
                    width: isNonMobileScreen ? "8%" : "20%",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    onClick={() => {
                      navigate("/profile");
                      handleClose();
                    }}
                    sx={{
                      p: "3% 2%",
                    }}
                  >
                    Profile
                  </Typography>
                  <Divider />
                  <Typography
                    onClick={() => {
                      navigate("/order");
                      handleClose();
                    }}
                    sx={{
                      p: "3% 2%",
                    }}
                  >
                    Order
                  </Typography>
                  <Divider />
                  {user.role === "admin" && (
                    <Box>
                      <Typography
                        sx={{
                          p: "3% 2%",
                        }}
                        onClick={handleAdminPanel}
                      >
                        Admin Panel
                      </Typography>
                      <Divider />
                    </Box>
                  )}
                  <Typography
                    sx={{
                      p: "3% 2%",
                    }}
                    onClick={() => {
                      navigate(`/profile/${user._id}`);
                      handleClose();
                    }}
                  >
                    Edit Profile
                  </Typography>
                  <Divider />
                  <Typography
                    onClick={handleLogout}
                    sx={{
                      p: "3% 2%",
                    }}
                  >
                    Logout
                  </Typography>
                </Paper>
              )}
            </Box>
            <ShoppingCartIcon
              onClick={() => navigate("/cart")}
              sx={{ cursor: "pointer", display: isNonMobileScreen ? "" : "none" }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              m: "5px 0",
              backgroundColor: "red",
              borderRadius: "15px",
              width: isNonMobileScreen ? "90px" : "75px",
            }}
          >
            <Typography
              sx={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Navbar;
