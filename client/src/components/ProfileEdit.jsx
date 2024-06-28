import { Box, Button, TextField, Stack, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import { backendDomain } from "../common";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../state/authSlice";

const validationSchema = yup.object({
  mobileNumber: yup.string(),
  gender: yup.string(),
  dateOfBirth: yup.date(),
  location: yup.string(),
});

const initialValues = {
  mobileNumber: "",
  gender: "",
  dateOfBirth: "",
  location: "",
};

const ProfileEdit = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const updateProfile = async (values, onSubmitProps) => {
    try {
      const response = await fetch(`${backendDomain}/user/${profileId}`, {
        method: "PUT", // Use PUT for updating existing resource
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error("Failed to update profile");
        return;
      }

      const updatedUser = await response.json();
      dispatch(updateUserProfile({ user: updatedUser })); 
      onSubmitProps.resetForm();

      if (updatedUser) {
        navigate(`/profile/${profileId}`)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={updateProfile} // Pass the updateProfile function directly to onSubmit
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ m: "5%" }}>
            <Stack spacing={2}>
              <TextField
                name="displayName"
                placeholder="Display Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.displayName}
                error={
                  Boolean(touched.displayName) && Boolean(errors.displayName)
                }
                helperText={touched.displayName && errors.displayName}
              />

              <TextField
                name="mobileNumber"
                placeholder="Mobile Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNumber}
              />

              <Select
                name="gender"
                value={values.gender || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                displayEmpty
                placeholder="Gender"
                error={Boolean(touched.gender) && Boolean(errors.gender)}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>

              <TextField
                name="dateOfBirth"
                placeholder="Date Of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                type="date"
              />

              <TextField
                name="location"
                placeholder="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
              />
            </Stack>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              sx={{
                p: "1rem",
                backgroundColor: "black",
                width: "90%",
                color: "white",
                "&:hover": { backgroundColor: "black" },
              }}
            >
              Save Details
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ProfileEdit;
