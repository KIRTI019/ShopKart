import { Button as MUIButton, useMediaQuery } from "@mui/material";

const CustomButton = ({ text, click, width, type }) => {
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  return (
    <MUIButton
    type={type}
    sx={{
      backgroundColor: "black",
      color: "white",
      width: {width},
      p: "10px",
      "&: hover": { backgroundColor: "black" }
    }}
      onClick={click}
    >
      {text}
    </MUIButton>
  );
};

export default CustomButton;
