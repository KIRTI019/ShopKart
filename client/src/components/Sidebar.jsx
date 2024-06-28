import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null }));
    navigate("/");
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

  const handleLogin = () => {
    navigate("/login");
    handleClose();
  };

  return (
    <Box
      sx={{
        m: "1% -40% 0 0",
      }}
    >
      <MenuIcon onClick={handleClick} />

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
                color: "white",
                backgroundColor: "black",
                p: "15px",
              }}
            >
              {user ? (
                <Typography>{user.displayName}</Typography>
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
                    onClick={handleLogin}
                  >
                    Login
                  </Typography>
                </Box>
              )}
              <CloseIcon onClick={handleClose} />
            </Box>

            <Box>
              <ListItemButton
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>

                <ListItemText>Profile</ListItemText>
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  navigate("/order");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>

                <ListItemText>Order</ListItemText>
              </ListItemButton>

              {user.role === "admin" && (
                <ListItemButton onClick={handleAdminPanel}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>

                <ListItemText>Admin Panel</ListItemText>
              </ListItemButton>
              )}

              <ListItemButton
                onClick={() => {
                  navigate("/cart");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>

                <ListItemText>Cart</ListItemText>
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <ModeEditIcon />
                </ListItemIcon>

                <ListItemText>Edit Profile</ListItemText>
              </ListItemButton>

              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>

                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
