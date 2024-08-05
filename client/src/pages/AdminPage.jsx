import {
    Box,
    Divider,
    Paper,
    Typography,
    useMediaQuery,
  } from "@mui/material";
  import { useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import UserSetting from "../components/UserSetting";
  import ProductSetting from "../components/ProductSetting";
  import { useEffect, useState, useCallback } from "react";
  
  const AdminPage = () => {
    const [openProduct, setOpenProduct] = useState(false);
    const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
  
    const handleUserClick = useCallback(() => {
      navigate("/admin-panel");
      setOpenProduct(false);
    }, [navigate]);
  
    const handleProductClick = useCallback(() => {
      setOpenProduct(true);
    }, []);
  
    useEffect(() => {
      if (user.role !== "admin") {
        navigate("/");
      }
    }, [user.role, navigate]);
  
    const styles = {
      container: {
        mt: isNonMobileScreen ? "5%" : "15%",
      },
      title: {
        fontSize: isNonMobileScreen ? "25px" : "20px",
        fontWeight: "600",
        mt: isNonMobileScreen ? "3%" : "",
        p: "2%",
        textAlign: "center",
      },
      paper: {
        display: "flex",
        justifyContent: "center",
        p: isNonMobileScreen ? "0 10%" : "5% 10%",
        gap: "20px",
        width: isNonMobileScreen ? "30%" : "90%",
        margin: "0 auto",
      },
      tab: (isActive) => ({
        cursor: "pointer",
        borderTop: isActive ? "4px solid black" : "none",
        pb: isNonMobileScreen ? "3%" : "5px",
        textAlign: "center",
      }),
    };
  
    return (
      <Box sx={styles.container}>
        <Typography sx={styles.title}>Admin</Typography>
        <Paper sx={styles.paper} elevation={4}>
          <Typography sx={styles.tab(!openProduct)} onClick={handleUserClick}>
            User
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography sx={styles.tab(openProduct)} onClick={handleProductClick}>
            Product
          </Typography>
        </Paper>
        {openProduct ? <ProductSetting /> : <UserSetting />}
      </Box>
    );
  };
  
  export default AdminPage;
  