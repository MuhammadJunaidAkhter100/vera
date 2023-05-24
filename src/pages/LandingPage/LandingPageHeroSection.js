import React from "react";
import Container from "@mui/material/Container";
import "./LandingPageHeroSection.scss";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { ReactComponent as HeroImg } from "../../assets/hero-img.svg";
import { ReactComponent as LinePattern } from "../../assets/green-line-pattern.svg";
import { useNavigate } from "react-router-dom";
import VeraAiBot from '../../components/VeraAIBot'

import { Grid } from "@mui/material";

const LandingPageHeroSection = () => {
  const navigate = useNavigate();
  return (<>
    <Box className="hero-box-wrapper">
      <LinePattern className="line-pattern" />
      <Container className="hero-section-wrapper custom-container">
        <Grid container className="hero-item-wrapper">
          <Grid item md={12} lg={6} xl={6} sm={12} xs={12}>
            <Typography variant="h3" className="hero-heading" color="initial">
              Your legal team for every season
            </Typography>
            <Typography
              mt={2}
              variant="body1"
              color="initial"
              className="hero-para"
            >
              Whether things are going well and you just need some guidance or
              the unexpected happens we've got you covered.
            </Typography>

            <Box mt={3} className="hero-btn-wrapper">
              <Button
                variant="contained"
                className="hero-btn-getstarted"
                color="primary"
                size="large"
                onClick={() => navigate("/onboarding")}
              >
                Get Started
              </Button>
              <Button
                variant="contained"
                className="hero-btn-getstarted"
                color="primary"
                size="large"
                onClick={() =>
                  navigate("/onboarding?selectedOption=voice-memo")
                }
              >
                Tell Us
              </Button>
              <Button
                variant="contained"
                className="hero-btn-login"
                color="primary"
                onClick={() => navigate("/login")}
                size="large"
              >
                Log in
              </Button>
            </Box>
          </Grid>
          <Grid
            p={3}
            className="hero-item-img"
            item
            md={12}
            lg={6}
            xl={6}
            sm={12}
            xs={12}
          >
            <HeroImg />
          </Grid>
        </Grid>
      </Container>
    </Box>
    <VeraAiBot />
  </>);
};

export default LandingPageHeroSection;
