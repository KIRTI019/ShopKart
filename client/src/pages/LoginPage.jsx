import { Box, Paper, useMediaQuery } from "@mui/material";
import Form from "../components/Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      // mt: "10%",
      p: "1rem 6%",
    textAlign: "center",
    m: "10rem auto",
    borderRadius: "10px"
    }}>
      <Paper sx={{
        width: isNonMobileScreens ? "600px" : "93%",
        textAlign: "center",
        m: "1.5rem 0"
      }}>
        <Form />
      </Paper>
    </Box>
  )
}

export default LoginPage