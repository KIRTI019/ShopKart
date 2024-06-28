import {
  Box,
  Divider,
  ListItem,
  MenuItem,
  MenuList,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import UserSetting from "../components/UserSetting";
import ProductSetting from "../components/ProductSetting";
import { useState } from "react";

const AdminPage = () => {
  const [openProduct, setOpenProduct] = useState(false);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleUserClick = () => {
    navigate("/admin-panel");
    setOpenProduct(false);
  }

  const handleProductClick = () => {
    setOpenProduct(true);
  }

  return (
    <Box sx={{
      display: "flex",
      mt: isNonMobileScreen ? "5%" : "15%"
    }}>
      <Paper
        sx={{
          display: "grid",
          width: "20%",
          m: "0.25%",
          textAlign: "center"
        }}
      >
        {user ? (
          <img alt="person" />
        ) : (
          <PersonIcon />
        )}
        <Typography sx={{ fontSize: "25px", fontWeight: "600" }}>Admin</Typography>
        <Box sx={{
          mt: "10%"
        }}>
          <Divider />
            <Typography sx={{ m: "2% 0 2% 0", cursor: "pointer" }} onClick={handleUserClick}>User</Typography>
            <Divider />
            <Typography sx={{ m: "2% 0 2% 0", cursor: "pointer" }} onClick={handleProductClick}>Product</Typography>
        </Box>
      </Paper>
        {openProduct ? (
          <ProductSetting />
        ) : (
          <UserSetting />
        )}
    </Box>
  );
};

export default AdminPage;
