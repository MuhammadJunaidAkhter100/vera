import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "./Navbar.scss";
import { ReactComponent as Logo } from "../assets/nav-vera-icon.svg";
import { ReactComponent as VoiceIcon } from "../assets/voice-icon.svg";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box className="nav-wrapper">
      <Container className="nav-container custom-container">
        <Box className="logo">
          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        </Box>

        <ul>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#process">Process</a>
          </li>
          <li>
            <a href="#faqs">FAQs</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <a href="http://blog.veralegal.uk/" rel="noreferrer">
              Blog
            </a>
          </li>
        </ul>

        <Box className="btns">
          <Typography
            variant="body1"
            className="login-btn"
            onClick={() => navigate("/login")}
            color="initial"
          >
            Log in
          </Typography>

          <Button
            className="started-btn"
            onClick={() => navigate("/onboarding")}
            variant="contained"
            color="primary"
          >
            Get Started
          </Button>
          <Button
            className="voice-btn"
            onClick={() => navigate("/onboarding?selectedOption=voice-memo")}
            variant="contained"
            color="primary"
          >
            Tell Us
            <VoiceIcon />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
