import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
      <Typography sx={{
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: "25px"
      }}>Shop
        <span style={{ color: "red" }}>Kart</span>
        </Typography>
    </Box>
  )
}

export default Logo