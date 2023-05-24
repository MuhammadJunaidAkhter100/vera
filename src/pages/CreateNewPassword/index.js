import React, { useState, useEffect } from "react";
import "./CreateNewPassword.scss";
import { Box, Container, Typography, TextField } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/nav-vera-icon.svg";
import MessageModal from "../../common/MessageModal";
import { LoadingButton } from "@mui/lab";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isPasswordResetSuccessModal, setIsPasswordResetSuccessModal] =
    useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [token, setToken] = useState("");
  const [passwordReset, setPasswordReset] = useState(null);
  const [isCpasswordError, setIsCpasswordError] = useState(false);

  const submitData = async () => {
    if (!passwordReset) {
      if (password && cpassword && password === cpassword) {
        setIsBtnLoading(true);
        await axios
          .post(
            `${process.env.REACT_APP_BASE_URL}api/auth/register/client/activate/`,
            {
              confirm_password: cpassword,
              password: password,
              token: token,
            }
          )
          .then((res) => {
            setIsSuccessModal(true);
            window.localStorage.setItem("token", token);
            window.localStorage.setItem(
              "compObj",
              JSON.stringify(res.data.data)
            );
            setIsBtnLoading(false);
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          })
          .catch((err) => {
            setIsErrorModal(true);
            setIsBtnLoading(false);
          });
      } else {
        if (!password) {
          setIsPasswordError(true);
        }
        if (!cpassword) {
          setIsCpasswordError(true);
        }
        if (password !== cpassword) {
          setIsCpasswordError(true);
        }
      }
    } else {
      if (password && cpassword && password === cpassword) {
        setIsBtnLoading(true);
        await axios
          .post(
            `${process.env.REACT_APP_BASE_URL}api/auth/password_reset/confirm/`,
            {
              confirm_password: cpassword,
              password: password,
              token: token,
            }
          )
          .then((res) => {
            setIsPasswordResetSuccessModal(true);
            setIsBtnLoading(false);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          })
          .catch((err) => {
            setIsErrorModal(true);
            setIsBtnLoading(false);
          });
      } else {
        if (!password) {
          setIsPasswordError(true);
        }
        if (!cpassword) {
          setIsCpasswordError(true);
        }
        if (password !== cpassword) {
          setIsCpasswordError(true);
        }
      }
    }
  };

  const getEmail = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const passwordReset = params.get("passwordReset");
    setPasswordReset(passwordReset);
    setToken(token);
    if (!passwordReset) {
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}api/auth/register/check/?token=${token}`
        )
        .then((res) => {
          setEmail(res.data.data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <>
      <Box className="createNewPassword-wrapper">
        <Box className="createNewPassword-screen-top-logo">
          <Logo />
        </Box>
        <Container
          className="createNewPassword-screen-container"
          maxWidth="md"
          sx={{ backgroundColor: "white" }}
        >
          <Box className="createNewPassword-form-wrapper">
            <Typography
              className="createNewPassword-heading"
              variant="h4"
              color="initial"
            >
              Create a New Password
            </Typography>
            {!passwordReset && (
              <Box mt={3}>
                <Typography mb={1} variant="body1" color="initial">
                  Email
                </Typography>
                <TextField
                  className="createNewPassword-input-email-disabled"
                  id="outlined-basic"
                  label=""
                  value={email}
                  disabled
                  placeholder="Enter your email"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Box>
            )}

            <Box mt={3}>
              <Typography mb={1} variant="body1" color="initial">
                Password
              </Typography>
              <TextField
                className="createNewPassword-form-input"
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
                  isPasswordError ? "Please enter a valid password" : ""
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
                className="createNewPassword-form-input"
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
                className={isBtnLoading ? "" : "createNewPassword-form-button"}
                variant="contained"
                loading={isBtnLoading}
                onClick={() => {
                  submitData();
                }}
                size="medium"
                fullWidth
              >
                {passwordReset ? "Reset Password" : "Create Account"}
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </Box>
      <MessageModal
        open={isErrorModal}
        onClose={setIsErrorModal}
        title="Error"
        content="Something went wrong. Please try again later."
        error
      />
      <MessageModal
        open={isSuccessModal}
        onClose={setIsSuccessModal}
        title="Success"
        content="Your acccount has been created successfully. You will be redirected to vera in 5 seconds."
      />
      <MessageModal
        open={isPasswordResetSuccessModal}
        onClose={setIsPasswordResetSuccessModal}
        title="Success"
        content="Your password has been reset successfully. You will be redirected to login page in 5 seconds."
      />
    </>
  );
};

export default CreateNewPassword;
