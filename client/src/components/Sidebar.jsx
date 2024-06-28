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
        m: "5px 2% 0 0",
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
                p: "20px",
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

            <Box sx={{
              p: "10px 0"
            }}>
              <ListItemButton
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                <ListItemIcon sx={{ mr: "-5%" }}>
                  <AccountBoxIcon />
                </ListItemIcon>

                <Typography sx={{ fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>Profile</Typography>
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  navigate("/order");
                  handleClose();
                }}
              >
                <ListItemIcon sx={{ mr: "-5%" }}>
                  <ShoppingBagIcon />
                </ListItemIcon>

                <Typography sx={{ fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>order</Typography>
              </ListItemButton>

              {user && user.role === "admin" && (
                <ListItemButton onClick={handleAdminPanel}>
                <ListItemIcon sx={{ mr: "-5%" }}>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>

                <Typography sx={{ fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>admin panel</Typography>
              </ListItemButton>
              )}

              <ListItemButton
                onClick={() => {
                  navigate("/cart");
                  handleClose();
                }}
              >
                <ListItemIcon sx={{ mr: "-5%" }}>
                  <ShoppingCartIcon />
                </ListItemIcon>

                <Typography sx={{ fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>cart</Typography>
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                  handleClose();
                }}
              >
                <ListItemIcon sx={{ mr: "-5%" }}>
                  <ModeEditIcon />
                </ListItemIcon>

                <Typography sx={{ fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>edit profile</Typography>
              </ListItemButton>

              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ mr: "-5%" }}>
                  <LogoutIcon />
                </ListItemIcon>

                <Typography sx={{ fontWeight: "600", fontSize: "16px", textTransform: "uppercase" }}>logout</Typography>
              </ListItemButton>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
