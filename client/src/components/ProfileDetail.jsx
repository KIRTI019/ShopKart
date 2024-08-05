import {
    Box,
    Divider,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
  } from "@mui/material";
  import { useState, useMemo } from "react";
  import { useSelector } from "react-redux";
  import ProfileEdit from "./ProfileEdit";
  import CloseIcon from "@mui/icons-material/Close";
  import Button from "./Button";
  
  const ProfileDetail = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const isNonMobileScreen = useMediaQuery("(min-width: 850px)");
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const convertDateToDDMMYYYY = useMemo(
      () => (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
  
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
  
        return `${formattedDay}/${formattedMonth}/${year}`;
      },
      []
    );
  
    const profileDetails = [
      { label: "Display Name", value: user.displayName },
      { label: "Mobile Number", value: user.mobileNumber || "Not Added" },
      { label: "Gender", value: user.gender || "Not Added" },
      {
        label: "Date of Birth",
        value: user.dateOfBirth
          ? convertDateToDDMMYYYY(user.dateOfBirth)
          : "Not Added",
      }
    ];
  
    return (
      <Box
        sx={{
          m: isNonMobileScreen ? "7% 0 3% 0" : "20% 5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "500px",
          }}
        >
          <Paper
            sx={{
              p: isNonMobileScreen ? "2% 5%" : "10%",
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
  
            {profileDetails.map((detail, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  m: "5% 0",
                }}
              >
                <Typography>{detail.label}</Typography>
                <Typography>{detail.value}</Typography>
              </Box>
            ))}
  
            <Button click={handleClick} text="Edit" width="100%" />
          </Paper>
  
          {open && (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                width: isNonMobileScreen ? "30%" : "80%",
              }}
            >
              <Paper elevation={4} sx={{ width: "100%", p: "5%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: "0 4%",
                  }}
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                    Edit Profile
                  </Typography>
                  <IconButton
                    sx={{ "&:hover": { backgroundColor: "transparent" } }}
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
  