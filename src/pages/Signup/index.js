import React, { useState } from "react";
import "./Signup.scss";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/nav-vera-icon.svg";
import { ReactComponent as GoogleIcon } from "../../assets/google-icon.svg";
import { ReactComponent as AppleIcon } from "../../assets/apple-icon.svg";
import MessageModal from "../../common/MessageModal";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isEmailExistModal, setIsEmailExistModal] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [cpassword, setCpassword] = useState("");
  const [isCpasswordError, setIsCpasswordError] = useState(false);

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const submitData = async () => {
    if (email && isValidEmail(email) && password) {
      setIsLoadingBtn(true);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}api/auth/register/lawyer/`, {
          email: email,
          password: password,
          confirm_password: cpassword,
        })
        .then((res) => {
          setIsLoadingBtn(false);
          navigate("/signup-success/?email=" + email + "");
        })
        .catch((err) => {
          if (
            err.response.data.message.email[0] ===
            "User already exists with this email"
          ) {
            setIsLoadingBtn(false);
            setIsEmailExistModal(true);
          } else {
            setIsLoadingBtn(false);
            setIsErrorModal(true);
          }
        });
    }
  };

  const checkValidations = () => {
    if (!email || !isValidEmail(email)) {
      setIsEmailError(true);
    }

    if (!password || password.length < 8) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

    if (!cpassword || cpassword !== password) {
      setIsCpasswordError(true);
    }

    if (
      email &&
      password &&
      cpassword &&
      password === cpassword &&
      isValidEmail(email) &&
      password.length >= 8
    ) {
      submitData();
    }
  };

  return (
    <>
      <Box className="signup-wrapper">
        <Box className="signup-screen-top-logo">
          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        </Box>
        <Container
          className="signup-screen-container"
          maxWidth="md"
          sx={{ backgroundColor: "white" }}
        >
          <Box className="signup-form-wrapper">
            <Typography className="signup-heading" variant="h4" color="initial">
              Welcome Brad
            </Typography>
            <Box mt={3}>
              <Typography mb={1} variant="body1" color="initial">
                Email
              </Typography>
              <TextField
                className="signup-form-input"
                id="outlined-basic"
                label=""
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailError(false);
                }}
                error={isEmailError}
                helperText={isEmailError ? "Please enter a valid email" : ""}
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box mt={3}>
              <Typography mb={1} variant="body1" color="initial">
                Password
              </Typography>
              <TextField
                className="signup-form-input"
                id="outlined-basic"
                label=""
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordError(false);
                }}
                error={isPasswordError}
                helperText={
                  isPasswordError
                    ? "Please enter a valid password. Password must have atleast 8 characters"
                    : ""
                }
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box mt={3}>
              <Typography mb={1} variant="body1" color="initial">
                Confirm Password
              </Typography>
              <TextField
                className="signup-form-input"
                id="outlined-basic"
                label=""
                type="password"
                placeholder="Confirm your password"
                error={isCpasswordError}
                helperText={
                  isCpasswordError
                    ? "Password and confirm password must match"
                    : ""
                }
                variant="outlined"
                value={cpassword}
                onChange={(e) => {
                  setCpassword(e.target.value);
                  setIsCpasswordError(false);
                }}
                size="small"
                fullWidth
              />
            </Box>
            <Box mt={3}>
              <LoadingButton
                className={isLoadingBtn ? "" : "signup-form-button"}
                variant="contained"
                loading={isLoadingBtn}
                onClick={() => {
                  checkValidations();
                }}
                size="medium"
                fullWidth
              >
                Sign up
              </LoadingButton>
            </Box>
            <Box mt={3}>
              <Button
                className="google-signup-button"
                variant="contained"
                size="medium"
                fullWidth
              >
                <GoogleIcon /> &nbsp; Sign in with Google
              </Button>
            </Box>
            <Box mt={3}>
              <Button
                className="google-signup-button"
                variant="contained"
                size="medium"
                fullWidth
              >
                <AppleIcon /> &nbsp; Sign in with Apple
              </Button>
            </Box>
            <Typography
              variant="body1"
              my={2}
              className="last-text"
              color="initial"
            >
              Have you already an account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </span>
            </Typography>
          </Box>
        </Container>
      </Box>
      <MessageModal
        open={isErrorModal}
        onClose={setIsErrorModal}
        title="Error"
        error
        content="Something went wrong. Please try again later."
      />
      <MessageModal
        open={isEmailExistModal}
        onClose={setIsEmailExistModal}
        title="Error"
        error
        content="Account Already exist. Please login to continue"
      />
    </>
  );
};

export default Signup;
