import React from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Grid } from "@mui/material";
import { ReactComponent as FamilyIcon } from "../../assets/family-law-icon.svg";
import { ReactComponent as CriminalDefence } from "../../assets/criminal-defence-icon.svg";
import { ReactComponent as EmploymentLaw } from "../../assets/employment-law-icon.svg";
import { ReactComponent as ImigrationLaw } from "../../assets/Immigration-law.svg";
import { ReactComponent as TaxRelief } from "../../assets/tax-relief-icon.svg";
import { ReactComponent as DuiDefence } from "../../assets/dui-defence.svg";
import { useNavigate } from "react-router-dom";
import "./FeaturesSection.scss";

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <Container className="custom-container">
      <Box className="feature-section-wrapper " id="services">
        <Typography variant="h4" color="initial" className="feature-heading">
          We’re here to help you in every way possible
        </Typography>

        <Grid className="feature-items-wrapper" spacing={3} mt={5} container>
          <Grid
            lg={4}
            item
            className="feature-item"
            onClick={() => {
              navigate(`/onboarding?category=Getting a divorce or separation?`);
            }}
          >
            <Box className="feature-item-icon">
              <FamilyIcon />
            </Box>
            <Typography
              variant="h6"
              color="initial"
              className="feature-item-heading"
            >
              Getting a divorce or separation?
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="feature-item-para"
            >
              We understand things don't always go as planned, let us find a
              solution
            </Typography>
          </Grid>
          <Grid
            lg={4}
            item
            className="feature-item"
            onClick={() => {
              navigate(
                `/onboarding?category=Need a visa or immigrating to the UK?`
              );
            }}
          >
            <Box className="feature-item-icon">
              <CriminalDefence />
            </Box>
            <Typography
              variant="h6"
              color="initial"
              textAlign="center"
              className="feature-item-heading"
            >
              Need a visa or immigrating to the UK?
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="feature-item-para"
            >
              We appreciate this is not always as simple as it should be whether
              making the application, seeking advice or navigating the home
              office let us help you
            </Typography>
          </Grid>
          <Grid
            lg={4}
            item
            className="feature-item"
            onClick={() => {
              navigate(
                `/onboarding?category=Are you a current or prospective Landlord or Tenant?`
              );
            }}
          >
            <Box className="feature-item-icon">
              <EmploymentLaw />
            </Box>
            <Typography
              variant="h6"
              color="initial"
              className="feature-item-heading"
            >
              Are you a current Landlord or Tenant?
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="feature-item-para"
            >
              <span>Our experienced lawyers understand both sides</span>
            </Typography>
          </Grid>
          <Grid
            lg={4}
            item
            className="feature-item"
            onClick={() => {
              navigate(`/onboarding?category=Trouble at work?`);
            }}
          >
            <Box className="feature-item-icon">
              <ImigrationLaw />
            </Box>
            <Typography
              variant="h6"
              color="initial"
              className="feature-item-heading"
            >
              Trouble at work?
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="feature-item-para"
            >
              We understand that making an application, seeking advice, or
              navigating the Home Office can be challenging. Let us help you
            </Typography>
          </Grid>
          <Grid
            lg={4}
            item
            className="feature-item"
            onClick={() => {
              navigate(`/onboarding?category=Falsely accused of a crime?`);
            }}
          >
            <Box className="feature-item-icon">
              <TaxRelief />
            </Box>
            <Typography
              variant="h6"
              color="initial"
              className="feature-item-heading"
            >
              Falsely accused of a crime?
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="feature-item-para"
            >
              The law and police exist to protect us, but that doesn’t mean you
              shouldn’t protect yourself
            </Typography>
          </Grid>
          <Grid
            lg={4}
            item
            className="feature-item"
            sx={{ width: "100%" }}
            onClick={() => {
              navigate(`/onboarding?category=Any Other challenges?`);
            }}
          >
            <Box className="feature-item-icon">
              <DuiDefence />
            </Box>
            <Typography
              variant="h6"
              color="initial"
              className="feature-item-heading"
            >
              Any Other challenges?
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              className="feature-item-para"
            ></Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FeaturesSection;
