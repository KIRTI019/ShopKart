import { useState } from "react";
import { Box, Button as MUIButton, TextField, Typography, Stack } from "@mui/material";
import { Formik } from "formik";
import { backendDomain } from "../common";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/authSlice.js";
import Button from "./Button";

const registerSchema = yup.object().shape({
  displayName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  displayName: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const response = await fetch(`${backendDomain}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      console.error('Failed to register user');
      return;
    }

    const savedUser = await response.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const response = await fetch(`${backendDomain}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      console.error('Failed to log in user');
      return;
    }

    const loggedIn = await response.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      onSubmit={handleFormSubmit}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
          <Box sx={{ m: "4% 5%" }}>
            {isRegister && (
              <Stack spacing={3}>
                <TextField
                  name="displayName"
                  placeholder="Display Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.displayName}
                  error={Boolean(touched.displayName) && Boolean(errors.displayName)}
                  helperText={touched.displayName && errors.displayName}
                />
                <TextField
                  name="email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>
            )}
            {isLogin && (
              <Stack spacing={3}>
                <TextField
                  name="email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>
            )}
          </Box>

          <Box sx={{ mb: "10px" }}>
          <Button
            type="submit"
            width="90%"
            text={isLogin ? "Sign In" : "Sign Up"}
          />
          </Box>

          <Typography>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <MUIButton
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </MUIButton>
          </Typography>
        </form>
      )}

    </Formik>
  )
}

export default Form