import { Box, Avatar } from "@mui/material";
import { backendDomain } from "../common/index";

const UserImage = ({ image, width, height }) => {
  return (
    <Box width={width} height={height}>
      <Avatar sx={{
        width: {width},
        height: {height}
      }}
        alt="user"
        src={`${backendDomain}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;