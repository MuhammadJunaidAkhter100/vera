import React from "react";
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import DeviceImg from "../../assets/deviceImg.png";

import { ReactComponent as MobileImg } from "../../assets/mobile-img-mob-view.svg";

import "./ManageCaseSection.scss";

const ManageCaseSection = () => {
  return (
    <Container p={4} mt={5} mb={5} className="custom-container">
      <Box className="manage-case-section-wrapper">
        <Typography variant="h4" color="initial" className="manage-heading">
          Manage your case with ease online
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          className="manage-para"
          m={3}
          color="initial"
        >
          Vera allows you to manage your case online speak to your lawyer,
          manage documents and monitor progress at the touch of a button.
        </Typography>
        <Box className="manage-case-section-img">
          <Box className="manage-case-section-img-item-mob">
            <MobileImg />
          </Box>

          <Box className="manage-case-section-img-item">
            <img src={DeviceImg} alt="device" />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ManageCaseSection;
