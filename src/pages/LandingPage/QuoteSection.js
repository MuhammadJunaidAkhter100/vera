import React from "react";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
// import { ReactComponent as QuoteIcon } from "../assets/quote-avatar.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ReactComponent as NextArrowIcon } from "../../assets/next-quote-icon.svg";
import { ReactComponent as PrevArrowIcon } from "../../assets/prev-quote-icon.svg";

import "./QuoteSection.scss";

const QuoteSection = () => {
  function CustomArrowNext({ onClick, direction }) {
    return (
      <NextArrowIcon
        className={`carousel-arrow control-arrow custom-arrow-quote  control-next carousel-arrow-${direction}`}
        onClick={onClick}
      />
    );
  }
  function CustomArrowPrev({ onClick, direction }) {
    return (
      <PrevArrowIcon
        className={`carousel-arrow control-arrow custom-arrow-quote  control-prev carousel-arrow-${direction}`}
        onClick={onClick}
      />
    );
  }
  return (
    <>
      <Box className="quote-section-wrapper" mb={3} mt={4}>
        <Container className="quote-section-container ">
          <Carousel
            showIndicators={false}
            showStatus={false}
            showArrows={window.innerWidth < 500 ? false : true}
            infiniteLoop={true}
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <CustomArrowNext onClick={onClickHandler} direction="next" />
              )
            }
            renderArrowPrev={(onClickHandler, hasNext, label) =>
              hasNext && (
                <CustomArrowPrev onClick={onClickHandler} direction="prev" />
              )
            }
          >
            <Box className="quote-section-box">
              <Typography
                variant="h5"
                color="initial"
                mt={2}
                className="quote-text"
              >
                “So easy to use"
              </Typography>

              {/* <Box mt={3} className="quote-icon">
                <QuoteIcon />

                <Typography
                  mt={2}
                  variant="body1"
                  color="initial"
                  className="quote-name"
                >
                  John Doe
                </Typography>
              </Box> */}
            </Box>
            <Box className="quote-section-box">
              <Typography variant="h5" color="initial" className="quote-text">
                “The team was able to answer all my questions smoothly and being
                respectful of my circumstances."
              </Typography>

              {/* <Box mt={3} className="quote-icon">
                <QuoteIcon />

                <Typography
                  mt={2}
                  variant="body1"
                  color="initial"
                  className="quote-name"
                >
                  John Doe
                </Typography>
              </Box> */}
            </Box>
            <Box className="quote-section-box">
              <Typography variant="h5" color="initial" className="quote-text">
                "I like how I can just log in and see progress, instead of
                calling multiple times or trying to get a hold of my lawyer."
              </Typography>

              {/* <Box mt={3} className="quote-icon">
                <QuoteIcon />

                <Typography
                  mt={2}
                  variant="body1"
                  color="initial"
                  className="quote-name"
                >
                  John Doe
                </Typography>
              </Box> */}
            </Box>
          </Carousel>
        </Container>
      </Box>
    </>
  );
};

export default QuoteSection;
