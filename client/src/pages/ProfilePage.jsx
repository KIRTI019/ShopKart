import { Box, Icon, Paper, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { setLogout } from "../state/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null }));
    navigate("/");
  };

  const userOptions = useMemo(() => [
    {
      text: "Profile Detail",
      logo: <AccountCircleIcon />,
      action: () => navigate(`/profile/${user._id}`),
    },
    {
      text: "Order",
      logo: <ShoppingBagIcon />,
      action: () => navigate("/order"),
    },
    {
      text: "Addresses",
      logo: <LocationOnIcon />,
      action: () => navigate("/addresses"),
    },
    {
      text: "Logout",
      logo: <LogoutIcon />,
      action: handleLogout,
    },
  ], [navigate, user._id]);

  const handleClick = (action) => {
    action();
  };

  return (
    <Box
      sx={{
        m: isNonMobileScreen ? "8rem 15rem" : "6rem 1rem",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontSize: "20px",
          fontWeight: "700",
          mb: "1rem",
          textAlign: "center",
        }}
      >
        Account
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: isNonMobileScreen ? "repeat(2, 1fr)" : "1fr",
        }}
      >
        {userOptions.map((item, index) => (
          <Paper
            key={index}
            sx={{
              p: "20px",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => handleClick(item.action)}
            elevation={3}
          >
            <Icon
              sx={{
                mb: "10px",
              }}
            >
              {item.logo}
            </Icon>
            <Typography>{item.text}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
