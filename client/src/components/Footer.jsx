import { Box, Paper, Typography } from "@mui/material";
import Logo from "./Logo";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "5% 10%",
        }}
        elevation={3}
      >
        <Logo />
        <Typography textAlign="center" mt="0.5%">
          &copy; Kirti Kumar. All rights reserved
        </Typography>
      </Paper>
    </Box>
  );
};

export default Footer;
