import React, { useState } from "react";
import "./Login.scss";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/nav-vera-icon.svg";
import { ReactComponent as GoogleIcon } from "../../assets/google-icon.svg";
import { ReactComponent as AppleIcon } from "../../assets/apple-icon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MessageModal from "../../common/MessageModal";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [password, setPassword] = useState("");

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const checkValidations = () => {
    if (!email || !isValidEmail(email)) {
      setIsEmailError(true);
    }

    if (!password) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  const submitData = async () => {
    if (email && isValidEmail(email) && password) {
      setIsLoadingBtn(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/auth/login/`, {
          email: email,
          password: password,
        })
        .then((res) => {
          setIsLoadingBtn(false);
          localStorage.setItem("token", res.data.data.access);
          localStorage.setItem("LoggedInObj", JSON.stringify(res.data.data));
          navigate("/dashboard");
        })
        .catch((err) => {
          setIsErrorModal(true);
          setIsLoadingBtn(false);
        });
    }
  };

  return (
    <>
      <Box className="login-wrapper">
        <Box className="login-screen-top-logo">
          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        </Box>
        <Container
          className="login-screen-container"
          maxWidth="md"
          sx={{ backgroundColor: "white" }}
        >
          <Box className="login-form-wrapper">
            <Typography className="login-heading" variant="h4" color="initial">
              Sign in
            </Typography>
            <Typography
              my={2}
              variant="body1"
              className="login-para"
              color="initial"
            >
              Welcome back! Please enter your details.
            </Typography>
            <Box mt={3}>
              <Typography mb={1} variant="body1" color="initial">
                Email
              </Typography>
              <TextField
                className="login-form-input"
                id="outlined-basic"
                label=""
                value={email}
                error={isEmailError}
                helperText={isEmailError ? "Please enter valid email" : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailError(false);
                }}
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                fullWidth
              />
            </Box>
            <Box mt={3}>
              <Typography mb={1} variant="body1" color="initial">
                Password
              </Typography>
              <TextField
                className="login-form-input"
                id="outlined-basic"
                label=""
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordError(false);
                }}
                error={isPasswordError}
                helperText={
                  isPasswordError ? "Please enter valid password" : ""
                }
                type="password"
                variant="outlined"
                placeholder="Enter your password"
                size="small"
                fullWidth
              />
            </Box>

            <Box mt={4}>
              <LoadingButton
                className={isLoadingBtn ? "" : "login-form-button"}
                variant="contained"
                size="medium"
                loading={isLoadingBtn}
                onClick={() => {
                  checkValidations();
                  submitData();
                }}
                fullWidth
              >
                Sign in
              </LoadingButton>
            </Box>
            <Box mt={3}>
              <Button
                className="google-login-button"
                variant="contained"
                size="medium"
                fullWidth
              >
                <GoogleIcon /> &nbsp; Sign in with Google
              </Button>
            </Box>
            <Box mt={3}>
              <Button
                className="google-login-button"
                variant="contained"
                size="medium"
                fullWidth
              >
                <AppleIcon /> &nbsp; Sign in with Apple
              </Button>
            </Box>
            <Typography
              variant="body1"
              mt={2}
              mb={1}
              className="last-text"
              color="initial"
            >
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </span>
            </Typography>
            <Typography
              variant="body1"
              className="forgot-pass-text"
              color="initial"
              onClick={() => {
                navigate("/forgot-password");
              }}
              sx={{ cursor: "pointer" }}
            >
              Forgot Password
            </Typography>
          </Box>
        </Container>
      </Box>
      <MessageModal
        open={isErrorModal}
        onClose={setIsErrorModal}
        title="Error"
        error
        content="Invalid Credentials"
      />
    </>
  );
};

export default Login;
