import { Box, Icon, Paper, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { setLogout } from "../state/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(setLogout({ user: null, token: null }));
    navigate("/");
  };

  const userOptions = [
    {
      text: "Profile Detail",
      logo: <AccountCircleIcon />,
      action: () => navigate(`/profile/${user._id}`)
    },
    {
      text: "Order",
      logo: <ShoppingBagIcon />,
      action: () => navigate("/order")
    },
    {
      text: "Addresses",
      logo: <LocationOnIcon />,
      action: () => navigate("/addresses")
    },
    {
      text: "Logout",
      logo: <LogoutIcon />,
      action: handleLogout
    }
  ];

  const handleClick = (action) => {
    action();
  };

  return (
    <Box
      sx={{
        m: isNonMobileScreens ? "8rem 15rem" : "4rem 1rem",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: "700",
          mb: "1rem",
        }}
      >
        Account
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: isNonMobileScreens ? "repeat(2, 1fr)" : "1fr",
        }}
      >
        {userOptions.map((item, index) => (
          <Paper
            key={index}
            sx={{
              p: "20px",
              cursor: "pointer",
            }}
            onClick={() => handleClick(item.action)}
          >
            <Icon
              sx={{
                ml: "45%"
              }}
            >
              {item.logo}
            </Icon>
            <Typography sx={{ textAlign: "center", ml: "-1%" }}>{item.text}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
