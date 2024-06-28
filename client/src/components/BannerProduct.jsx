import { Box, IconButton, useMediaQuery } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import { useEffect, useState } from "react";

const desktopImages = [image1, image2, image3, image4, image5];

const BannerProduct = () => {
  const [index, setIndex] = useState(0);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const handleclickForward = () => {
    if (index >= 0 && index <= desktopImages.length - 2) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
    }
  };

  const handleClickBackward = () => {
    if (index > 0 && index <= desktopImages.length - 1) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(desktopImages.length - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (desktopImages.length - 1 > index) {
        handleclickForward();
      } else {
        setIndex(0);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
      <Box display="flex">
        <IconButton
          onClick={handleClickBackward}
          sx={{
            height: isNonMobileScreen ? "40px" : "30px",
            width: isNonMobileScreen ? "40px" : "30px",
            backgroundColor: "white",
            mt: isNonMobileScreen ? "160px" : "12%",
            pl: isNonMobileScreen ? "15px" : "",
            "&: hover": {
              backgroundColor: "white",
            },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          sx={{
            width: isNonMobileScreen ? "1550px" : "850",
            height: isNonMobileScreen ? "400px" : "200px",
            objectFit: "cover",
            transform: `translateX(${index}*100%)`,
            animation: "ease-in",
            display: "flex",
            justifyContent: "center",
            m: isNonMobileScreen ? "0 -2.5% 0 -2.5%" : "0 -6%",
          }}
        >
          <img
            src={desktopImages[index]}
            width="100%"
            height="100%"
            alt="banner"
          />
        </Box>

        <IconButton
          onClick={handleclickForward}
          sx={{
            height: isNonMobileScreen ? "40px" : "30px",
            width: isNonMobileScreen ? "40px" : "30px",
            backgroundColor: "white",
            mt: isNonMobileScreen ? "160px" : "12%",
            "&: hover": {
              backgroundColor: "white",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
  );
};

export default BannerProduct;
