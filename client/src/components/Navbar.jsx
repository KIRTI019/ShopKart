import {
  Box,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "./Button";
import Sidebar from "./Sidebar";
import { setLogout } from "../state/authSlice";
import { useState } from "react";

const getMenuItems = (
  user,
  navigateAndClose,
  handleAdminPanel,
  handleLogout
) => [
  { text: "Profile", onClick: () => navigateAndClose("/profile") },
  { text: "Order", onClick: () => navigateAndClose("/order") },
  user?.role === "admin" && { text: "Admin Panel", onClick: handleAdminPanel },
  { text: "Cart", onClick: () => navigateAndClose("/cart") },
  {
    text: "Edit Profile",
    onClick: () => navigateAndClose(`/profile/${user?._id}`),
  },
  { text: "Logout", onClick: handleLogout },
];

// Styling model
const navbarStyles = (isNonMobileScreen, searchOpen) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: isNonMobileScreen ? "15px" : "10px",
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  backdropFilter: searchOpen ? "blur(5px)" : "none",
});

const userMenuStyles = () => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "50px",
  m: "0.5% 1.5% 0 0",
  width: "5%",
});

const menuPaperStyles = () => ({
  position: "absolute",
  cursor: "pointer",
  width: "8%",
  textAlign: "center",
  m: "3% 0 0 -3%",
  p: "0.5% 0",
});

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const toggleSidebar = () => setOpen((prev) => !prev);
  const closeSidebar = () => setOpen(false);

  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null }));
    closeSidebar();
  };

  const handleAdminPanel = () => {
    navigate(user.role === "admin" ? "/admin-panel" : "/");
    closeSidebar();
  };

  const handleSearch = () => {
    navigate(`/search${searchQuery ? `?q=${searchQuery}` : ""}`);
    closeSearch();
  };

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleChange = (e) => setSearchQuery(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const navigateAndClose = (path) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <Paper sx={navbarStyles(isNonMobileScreen, searchOpen)}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {!isNonMobileScreen && <Sidebar open={open} onToggle={toggleSidebar} />}
        <Logo />
      </Box>

      <SearchBar />

      <Box
        sx={{
          display: isNonMobileScreen ? "block" : "none",
          width: "10%",
          mt: "0.5%",
        }}
      >
        {user ? (
          <Box sx={userMenuStyles}>
            <PersonIcon onClick={toggleSidebar} sx={{ cursor: "pointer" }} />
            {open && (
              <Paper sx={menuPaperStyles}>
                {getMenuItems(
                  user,
                  navigateAndClose,
                  handleAdminPanel,
                  handleLogout
                ).map((item, index) => (
                  <Typography
                    key={index}
                    onClick={item.onClick}
                    sx={{
                      mt: "2%",
                      backgroundColor:
                        index % 2 === 0 ? "white" : "rgb(226 232 240)",
                    }}
                  >
                    {item.text}
                  </Typography>
                ))}
              </Paper>
            )}
            <ShoppingCartIcon
              onClick={() => navigate("/cart")}
              sx={{
                cursor: "pointer",
                display: isNonMobileScreen ? "" : "none",
              }}
            />
          </Box>
        ) : (
          <Button text="Login" click={() => navigate("/login")} width="100px" />
        )}
      </Box>
    </Paper>
  );
};

export default Navbar;
