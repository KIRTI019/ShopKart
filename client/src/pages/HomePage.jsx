import { Box, useMediaQuery } from "@mui/material";
import BannerProduct from "../components/BannerProduct";
import HorizontalProductList from "../components/HorizontalProductList";

const categories = [
  "Airpods",
  "Watch",
  "Mobile",
  "Mouse",
  // "Television",
  // "Camera",
  "Earphone",
  // "Speaker",
  // "Printer",
  // "Processor",
  // "Refrigerator",
  "Trimmer"
]

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  return (
    <Box sx={{
      mt: isNonMobileScreen ? "5%" : "15%"
    }}>
      <BannerProduct />
      {categories.map((item, index) =>(
        <HorizontalProductList category={item} heading={item} key={index} />
      ))}
    </Box>
  )
}

export default HomePage