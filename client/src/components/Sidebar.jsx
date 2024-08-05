import {
  Box,
  ListItemButton,
  ListItemIcon,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { setLogout } from "../state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

// Array of menu items
const menuItems = (user, navigateAndClose, handleAdminPanel, handleLogout) => {
  const items = [
    {
      text: "Profile",
      icon: <AccountBoxIcon />,
      onClick: () => navigateAndClose("/profile"),
    },
    {
      text: "Order",
      icon: <ShoppingBagIcon />,
      onClick: () => navigateAndClose("/order"),
    },
    {
      text: "Cart",
      icon: <ShoppingCartIcon />,
      onClick: () => navigateAndClose("/cart"),
    },
    {
      text: "Edit Profile",
      icon: <ModeEditIcon />,
      onClick: () => navigateAndClose(`/profile/${user?._id}`),
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  // Add Admin Panel item only if the user is an admin
  if (user?.role === "admin") {
    items.unshift({
      text: "Admin Panel",
      icon: <AdminPanelSettingsIcon />,
      onClick: handleAdminPanel,
    });
  }

  return items;
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const navigateAndClose = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null }));
    navigateAndClose("/");
  };

  const handleAdminPanel = () => {
    navigateAndClose(user.role === "admin" ? "/admin-panel" : "/");
  };

  const handleLogin = () => {
    navigateAndClose("/login");
  };

  return (
    <Box sx={{ m: "5px 5% 0 2%" }}>
      <MenuIcon onClick={() => setOpen(true)} />

      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "200px",
            height: "100vh",
            zIndex: 1300,
            overflow: "hidden",
          }}
        >
          <Paper sx={{ height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "black",
                p: user ? "20px" : "10px 20px",
              }}
            >
              {user ? (
                <Typography sx={{ fontWeight: 600 }}>{user.displayName}</Typography>
              ) : (
                <Button text="Login" click={handleLogin} width="100px" />
              )}
              <CloseIcon onClick={() => setOpen(false)} />
            </Box>

            <Box sx={{ p: "10px 0" }}>
              {menuItems(user, navigateAndClose, handleAdminPanel, handleLogout).map(
                (item, index) => (
                  <ListItemButton
                    key={index}
                    onClick={item.onClick}
                    sx={{ p: "20px 15px" }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </ListItemButton>
                )
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
