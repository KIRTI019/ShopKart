import { Box, useMediaQuery } from "@mui/material";

const OrderPage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  return (
    <Box sx={{ mt: isNonMobileScreen ? "5%" : "15%" }}>OrderPage</Box>
  )
}

export default OrderPage