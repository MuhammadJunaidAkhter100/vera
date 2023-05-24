import React, { useRef, useState } from "react";
import "./ProcessExplainer.scss";
import Container from "@mui/material/Container";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiFillPauseCircle } from "react-icons/ai";

import { ReactComponent as LinePattern } from "../../assets/green-line-pattern.svg";
import VeraVideo from "../../assets/LandingPage/vera-video.mp4";

const ProcessExplainer = () => {
  const vidRef = useRef(null);
  const [isVidePlaying, setIsVideoPlaying] = useState(false);
  const handlePlayVideo = () => {
    vidRef.current.play();
    setIsVideoPlaying(true);
  };
  const handlePauseVideo = () => {
    vidRef.current.pause();
    setIsVideoPlaying(false);
  };
  return (
    <Box id="process" className="process-explainer-main-box">
      <Container className="custom-container">
        <Typography
          variant="h4"
          fontFamily="Tomato Grotesk"
          color="initial"
          fontWeight={600}
        >
          Process Explainer
        </Typography>
      </Container>

      <LinePattern className="line-pattern-process-explainer" />

      <Container className="process-explainer-wrapper custom-container">
        <Grid container className="col-reverse">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            className="process-explainer-item-img-box"
          >
            <Box pr={5} className="process-explainer-item-video">
              {!isVidePlaying ? (
                <span onClick={() => handlePlayVideo()}>
                  <AiFillPlayCircle />
                </span>
              ) : (
                <span onClick={() => handlePauseVideo()}>
                  <AiFillPauseCircle />
                </span>
              )}

              <video ref={vidRef} width="100%">
                <source src={VeraVideo} type="video/mp4" />
                Sorry, your browser doesn't support videos.
              </video>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            className="process-explainer-item-boxes"
          >
            <Stack flexDirection="column" spacing={3}>
              <Box className="process-explainer-item-box">
                <Typography
                  variant="body1"
                  className="step-head"
                  color="initial"
                >
                  STEP 1
                </Typography>
                <Typography
                  mt={1}
                  mb={1}
                  className="sub-step"
                  variant="h6"
                  color="initial"
                >
                  Get Started
                </Typography>
                <Typography
                  variant="body1"
                  className="step-para"
                  color="initial"
                >
                  Reach out to us from anywhere
                </Typography>
              </Box>

              <Box className="process-explainer-item-box">
                <Typography
                  variant="body1"
                  className="step-head"
                  color="initial"
                >
                  STEP 2
                </Typography>
                <Typography
                  mt={1}
                  mb={1}
                  className="sub-step"
                  variant="h6"
                  color="initial"
                >
                  Tell us your problem
                </Typography>
                <Typography
                  variant="body1"
                  className="step-para"
                  color="initial"
                >
                  This should take less than 2 minutes
                </Typography>
              </Box>

              <Box className="process-explainer-item-box">
                <Typography
                  variant="body1"
                  className="step-head"
                  color="initial"
                >
                  STEP 3
                </Typography>
                <Typography
                  mt={1}
                  mb={1}
                  className="sub-step"
                  variant="h6"
                  color="initial"
                >
                  Speak to us
                </Typography>
                <Typography
                  variant="body1"
                  className="step-para"
                  color="initial"
                >
                  We will speak with you to introduce ourselves and take details
                </Typography>
              </Box>

              <Box className="process-explainer-item-box">
                <Typography
                  variant="body1"
                  className="step-head"
                  color="initial"
                >
                  STEP 4
                </Typography>
                <Typography
                  mt={1}
                  mb={1}
                  className="sub-step"
                  variant="h6"
                  color="initial"
                >
                  Solution
                </Typography>
                <Typography
                  variant="body1"
                  className="step-para"
                  color="initial"
                >
                  We will offer a legal solution including assigning one of our
                  experienced legal partners
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProcessExplainer;
