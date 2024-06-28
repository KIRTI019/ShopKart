import { Box } from "@mui/material";
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

  return (
    <Box mt="5%">
      <BannerProduct />
      {categories.map((item, index) =>(
        <HorizontalProductList category={item} heading={item} key={index} />
      ))}
    </Box>
  );
};

export default HomePage;
