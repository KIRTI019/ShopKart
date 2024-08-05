import { Box, Paper, useMediaQuery } from "@mui/material";
import Form from "../components/Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 850px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        m: "10rem auto",
        borderRadius: "10px",
        p: "1rem 6%"
      }}
    >
      <Paper
        sx={{
          width: isNonMobileScreens ? "600px" : "93%",
          textAlign: "center",
          m: "1.5rem 0",
        }}
        elevation={3}
      >
        <Form />
      </Paper>
    </Box>
  );
};

export default LoginPage;
