import { Box, Divider, ListItem, ListItemText, Paper, Typography, Popover } from "@mui/material";
import { backendDomain } from "../common/index";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchUser from "./SearchUser";
import { useDispatch } from "react-redux";
import { setRole } from "../state/authSlice";

const UserSetting = () => {
  const [user, setUser] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUserIndex, setOpenUserIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const fetchAllUsers = async () => {
    const response = await fetch(`${backendDomain}/user`, {
      method: "GET"
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleToggle = (event, index) => {
    setAnchorEl(event.currentTarget);
    setOpenUserIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenUserIndex(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleRoleChange = async (id) => {
    try {
      const response = await fetch(`${backendDomain}/user/toggleRole/${id}`, {
        method: "PUT"
      });
      const updatedUser = await response.json();
      setUser(prevState => prevState.map(user => user._id === updatedUser._id ? updatedUser : user));
      dispatch(setRole(updatedUser))
      handleClose();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleSearchBar = () => {
    if(searchQuery == "") {
      setOpenList(false);
    }
    else {
      setOpenList(true);
    }
  }

  return (
    <Box sx={{ width: "80%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", m: "3% 4% 3% 4%" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "700", mt: "0.25%" }}>Users</Typography>
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </Box>
      {user.map((item, index) => (
        <Box key={index}>
          <Paper sx={{
            p: "2% 5% 2% 5%",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <Typography sx={{ textTransform: "uppercase" }}>{item.displayName}</Typography>
            <Box sx={{ display: "grid" }}>
              <MoreHorizIcon onClick={(event) => handleToggle(event, index)} sx={{ cursor: "pointer" }} />
              <Popover
                id={id}
                open={openUserIndex === index && open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
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
            </Box>
          </Paper>
        </Box>
      ))}
      {openList && (
        <SearchUser query={searchQuery} />
      )}
    </Box>
  );
}

export default UserSetting;
