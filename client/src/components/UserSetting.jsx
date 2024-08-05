import {
  Box,
  Divider,
  ListItemText,
  Paper,
  Typography,
  Popover,
  useMediaQuery,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { backendDomain } from "../common/index";
import { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserSetting = () => {
  const [user, setUser] = useState([]);
  const token = useSelector((state) => state.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUserIndex, setOpenUserIndex] = useState(null);
  const isNonMobileScreen = useMediaQuery("(min-width: 850px)");

  const fetchAllUsers = async () => {
    const response = await fetch(`${backendDomain}/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    fetchAllUsers();
  }, [token]);

  const handleToggle = (event, index) => {
    setAnchorEl(event.currentTarget);
    setOpenUserIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenUserIndex(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleRoleChange = async (userId) => {
    try {
      const response = await fetch(
        `${backendDomain}/user/toggleRole/${userId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      const updatedUser = await response.json();
      setUser((prevState) =>
        prevState.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      handleClose();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: isNonMobileScreen ? "flex" : "none",
          justifyContent: "center",
          m: "3% 5%",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "700", mt: "0.25%" }}>
          Users
        </Typography>
      </Box>

      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ display: isNonMobileScreen ? "block" : "none" }}>S. No.</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {user.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center" sx={{ display: isNonMobileScreen ? "block" : "none" }}>{index + 1}</TableCell>
              <TableCell align="center">{item.displayName}</TableCell>
              <TableCell align="center">{item.email}</TableCell>
              <TableCell align="center">{item.role}</TableCell>
              <TableCell align="center">
                <MoreHorizIcon
                  onClick={(event) => handleToggle(event, index)}
                  sx={{ cursor: "pointer" }}
                />
                <Popover
                  id={id}
                  open={openUserIndex === index && open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 2, cursor: "pointer" }}>
                    <ListItemText onClick={() => handleRoleChange(item._id)}>
                      {item.role === "admin" ? "Move to User" : "Move to Admin"}
                    </ListItemText>
                    <Divider />
                    <ListItemText onClick={handleClose}>Cancel</ListItemText>
                  </Box>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserSetting;
