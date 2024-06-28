import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileEdit from "./ProfileEdit";
import CloseIcon from "@mui/icons-material/Close";

const ProfileDetail = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user); // Ensure the selector is correct

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const convertDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <Box sx={{ m: "7% 0 3% 0", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          position: "relative",
          width: "500px",
          "&::before": {
            content: '""',
            display: open ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          },
        }}
      >
        <Paper
          sx={{
            p: "2% 5%",
            opacity: open ? 0.3 : 1,
            pointerEvents: open ? "none" : "auto",
            zIndex: 2,
          }}
          elevation={4}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "600",
              mb: "5%",
            }}
          >
            Profile Detail
          </Typography>
          <Divider />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", m: "5% 0" }}
          >
            <Typography>Display Name</Typography>
            <Typography>{user.displayName}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", m: "5% 0" }}
          >
            <Typography>Mobile Number</Typography>
            <Typography>
              {user.mobileNumber ? user.mobileNumber : "Not Added"}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", m: "5% 0" }}
          >
            <Typography>Gender</Typography>
            <Typography>{user.gender ? user.gender : "Not Added"}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", m: "5% 0" }}
          >
            <Typography>Date of Birth</Typography>
            <Typography>
              {user.dateOfBirth
                ? convertDateToDDMMYYYY(user.dateOfBirth)
                : "Not Added"}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", m: "5% 0" }}
          >
            <Typography>Location</Typography>
            <Typography>
              {user.location ? user.location : "Not Added"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                p: "1rem",
                color: "white",
                width: "100%",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "black" },
              }}
              onClick={handleClick}
            >
              Edit
            </Button>
          </Box>
        </Paper>

        {open && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
              width: "30%",
            }}
          >
            <Paper elevation={4} sx={{ width: "100%", p: "5%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", m: "0 4%" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Edit Profile
                </Typography>
                <IconButton
                  sx={{
                    "&: hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <ProfileEdit />
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileDetail;
