import React, { useState, useEffect } from "react";
import "./Calendery.scss";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { ReactComponent as Logo } from "../../assets/nav-vera-icon.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { LoadingButton } from "@mui/lab";

import FormControlLabel from "@mui/material/FormControlLabel";
import moment from "moment";
import MessageModal from "../../common/MessageModal";
import { useNavigate } from "react-router-dom";

const Calendery = ({
  setIsScheduleEvent,
  setIsCalender,
  setEventDate,
  eventDate,
  eventTime,
  setCompleteTime,
  setEventTime,
  fullName,
  email,
  setIsQuestionaire,
  setIsEventScheduled,
  category,
  postalCode,
  recordedAudioURL,
  phone,
  caseDescription,
  setIsEventBooked,
}) => {
  const [value, setValue] = useState(new Date(eventDate ? eventDate : ""));
  // eslint-disable-next-line
  const [selectedTime, setSelectedTime] = useState(eventTime);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const navigate = useNavigate();
  const [isErrorModalTime, setIsErrorModalTime] = useState(false);
  const [isTermsAgree, setIsTermsAgree] = useState(false);
  const [isAllFieldsNotFilled, setIsAllFieldsNotFilled] = useState(false);
  const [notValidPhoneModal, setNotValidPhoneModal] = useState(false);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const sendData = async () => {
    if (caseDescription.length > 0) {
      if (!localStorage.getItem("token")) {
        if (
          phone &&
          isTermsAgree &&
          fullName &&
          email &&
          eventDate &&
          eventTime
        ) {
          setIsBtnLoading(true);
          await axios
            .post(
              `${process.env.REACT_APP_BASE_URL}api/auth/register/client/`,
              {
                type: "client",
                email: email,
                name: fullName,
                mobile: phone,
                appointment: eventDate + " " + eventTime,
                zip_code: postalCode,
                category: category,
                description: caseDescription,
              }
            )
            .then((res) => {
              setIsEventScheduled(true);
              setIsScheduleEvent(false);
              setIsEventBooked(true);
              setIsCalender(false);
              setIsBtnLoading(false);
            })
            .catch((err) => {
              if (err.message === "Network Error") {
                setIsNetworkError(true);
                setIsBtnLoading(false);
              } else {
                setIsErrorModal(true);
                setIsBtnLoading(false);
              }
            });
        } else {
          if (!eventDate || !eventTime) {
            setIsErrorModalTime(true);
          } else {
            if (
              !phone &&
              isTermsAgree &&
              fullName &&
              email &&
              category &&
              postalCode &&
              eventDate &&
              eventTime &&
              caseDescription
            ) {
              setNotValidPhoneModal(true);
            } else {
              setIsAllFieldsNotFilled(true);
            }
          }
        }
      } else {
        if (isTermsAgree && eventDate && eventTime) {
          let user = JSON.parse(localStorage.getItem("LoggedInObj"));

          setIsBtnLoading(true);
          await axios
            .post(
              `${process.env.REACT_APP_BASE_URL}api/auth/register/client/`,
              {
                type: "client",
                appointment: eventDate + " " + eventTime,
                category: category,
                description: caseDescription,
                email: user.email,
              }
            )
            .then((res) => {
              setIsEventScheduled(true);
              setIsScheduleEvent(false);
              setIsEventBooked(true);
              setIsCalender(false);
              setIsBtnLoading(false);
            })
            .catch((err) => {
              if (err.message === "Network Error") {
                setIsNetworkError(true);
                setIsBtnLoading(false);
              } else {
                setIsErrorModal(true);
                setIsBtnLoading(false);
              }
            });
        } else {
          if (!eventDate || !eventTime) {
            setIsErrorModalTime(true);
          } else {
            if (
              !phone &&
              isTermsAgree &&
              fullName &&
              email &&
              category &&
              postalCode &&
              eventDate &&
              eventTime &&
              caseDescription
            ) {
              setNotValidPhoneModal(true);
            } else {
              setIsAllFieldsNotFilled(true);
            }
          }
        }
      }
    } else if (recordedAudioURL) {
      if (!localStorage.getItem("token")) {
        if (
          phone &&
          isTermsAgree &&
          fullName &&
          email &&
          eventDate &&
          eventTime
        ) {
          setIsBtnLoading(true);

          const formData = new FormData();

          formData.append(
            "voice_note",
            new File([recordedAudioURL], "voice_note")
          );
          formData.append("type", "client");
          formData.append("email", email);
          formData.append("name", fullName);
          formData.append("mobile", phone);
          formData.append("appointment", eventDate + " " + eventTime);
          formData.append("zip_code", postalCode);

          console.log(formData);

          await axios
            .post(
              `${process.env.REACT_APP_BASE_URL}api/auth/register/client/`,
              formData
            )
            .then((res) => {
              setIsEventScheduled(true);
              setIsScheduleEvent(false);
              setIsEventBooked(true);
              setIsCalender(false);
              setIsBtnLoading(false);
            })
            .catch((err) => {
              if (err.message === "Network Error") {
                setIsNetworkError(true);
                setIsBtnLoading(false);
              } else {
                setIsErrorModal(true);
                setIsBtnLoading(false);
              }
            });
        } else {
          if (!eventDate || !eventTime) {
            setIsErrorModalTime(true);
          } else {
            if (
              !phone &&
              isTermsAgree &&
              fullName &&
              email &&
              category &&
              postalCode &&
              eventDate &&
              eventTime &&
              caseDescription
            ) {
              setNotValidPhoneModal(true);
            } else {
              setIsAllFieldsNotFilled(true);
            }
          }
        }
      } else {
        if (isTermsAgree && eventDate && eventTime) {
          setIsBtnLoading(true);
          let user = JSON.parse(localStorage.getItem("LoggedInObj"));

          const formData = new FormData();

          formData.append(
            "voice_note",
            new File([recordedAudioURL], "voice_note")
          );
          formData.append("type", "client");
          formData.append("email", user.email);

          formData.append("appointment", eventDate + " " + eventTime);
          formData.append("zip_code", postalCode);

          console.log(formData);

          await axios
            .post(
              `${process.env.REACT_APP_BASE_URL}api/auth/register/client/`,
              formData
            )
            .then((res) => {
              setIsEventScheduled(true);
              setIsScheduleEvent(false);
              setIsEventBooked(true);
              setIsCalender(false);
              setIsBtnLoading(false);
            })
            .catch((err) => {
              if (err.message === "Network Error") {
                setIsNetworkError(true);
                setIsBtnLoading(false);
              } else {
                setIsErrorModal(true);
                setIsBtnLoading(false);
              }
            });
        } else {
          if (!eventDate || !eventTime) {
            setIsErrorModalTime(true);
          } else {
            if (
              !phone &&
              isTermsAgree &&
              fullName &&
              email &&
              category &&
              postalCode &&
              eventDate &&
              eventTime &&
              caseDescription
            ) {
              setNotValidPhoneModal(true);
            } else {
              setIsAllFieldsNotFilled(true);
            }
          }
        }
      }
    }
  };

  const timeSlots = [
    {
      id: 1,
      ftime: "12:00AM",
      btime: "00:00:00",
    },
    {
      id: 3,
      ftime: "12:30AM",
      btime: "00:30:00",
    },

    {
      id: 5,
      ftime: "1:00AM",
      btime: "1:00:00",
    },

    {
      id: 7,
      ftime: "1:30AM",
      btime: "1:30:00",
    },

    {
      id: 9,
      ftime: "2:00AM",
      btime: "2:00:00",
    },

    {
      id: 11,
      ftime: "2:30AM",
      btime: "2:30:00",
    },

    {
      id: 13,
      ftime: "3:00AM",
      btime: "3:00:00",
    },

    {
      id: 15,
      ftime: "3:30AM",
      btime: "3:30:00",
    },

    {
      id: 17,
      ftime: "4:00AM",
      btime: "4:00:00",
    },

    {
      id: 19,
      ftime: "4:30AM",
      btime: "4:30:00",
    },

    {
      id: 21,
      ftime: "5:00AM",
      btime: "5:00:00",
    },

    {
      id: 23,
      ftime: "5:30AM",
      btime: "5:30:00",
    },

    {
      id: 25,
      ftime: "6:00AM",
      btime: "6:00:00",
    },

    {
      id: 27,
      ftime: "6:30AM",
      btime: "6:30:00",
    },

    {
      id: 29,
      ftime: "7:00AM",
      btime: "7:00:00",
    },

    {
      id: 31,
      ftime: "7:30AM",
      btime: "7:30:00",
    },

    {
      id: 33,
      ftime: "8:00AM",
      btime: "8:00:00",
    },

    {
      id: 35,
      ftime: "8:30AM",
      btime: "8:30:00",
    },

    {
      id: 37,
      ftime: "9:00AM",
      btime: "9:00:00",
    },

    {
      id: 39,
      ftime: "9:30AM",
      btime: "9:30:00",
    },

    {
      id: 41,
      ftime: "10:00AM",
      btime: "10:00:00",
    },

    {
      id: 43,
      ftime: "10:30AM",
      btime: "10:30:00",
    },

    {
      id: 45,
      ftime: "11:00AM",
      btime: "11:00:00",
    },

    {
      id: 47,
      ftime: "11:30AM",
      btime: "11:30:00",
    },

    {
      id: 49,
      ftime: "12:00PM",
      btime: "12:00:00",
    },

    {
      id: 51,
      ftime: "12:30PM",
      btime: "12:30:00",
    },

    {
      id: 53,
      ftime: "1:00PM",
      btime: "13:00:00",
    },

    {
      id: 55,
      ftime: "1:30PM",
      btime: "13:30:00",
    },

    {
      id: 57,
      ftime: "2:00PM",
      btime: "14:00:00",
    },

    {
      id: 59,
      ftime: "2:30PM",
      btime: "14:30:00",
    },

    {
      id: 61,
      ftime: "3:00PM",
      btime: "15:00:00",
    },

    {
      id: 63,
      ftime: "3:30PM",
      btime: "15:30:00",
    },

    {
      id: 65,
      ftime: "4:00PM",
      btime: "16:00:00",
    },

    {
      id: 67,
      ftime: "4:30PM",
      btime: "16:30:00",
    },

    {
      id: 69,
      ftime: "5:00PM",
      btime: "17:00:00",
    },

    {
      id: 71,
      ftime: "5:30PM",
      btime: "17:30:00",
    },

    {
      id: 73,
      ftime: "6:00PM",
      btime: "18:00:00",
    },

    {
      id: 75,
      ftime: "6:30PM",
      btime: "18:30:00",
    },

    {
      id: 77,
      ftime: "7:00PM",
      btime: "19:00:00",
    },

    {
      id: 79,
      ftime: "7:30PM",
      btime: "19:30:00",
    },

    {
      id: 81,
      ftime: "8:00PM",
      btime: "20:00:00",
    },

    {
      id: 83,
      ftime: "8:30PM",
      btime: "20:30:00",
    },

    {
      id: 85,
      ftime: "9:00PM",
      btime: "21:00:00",
    },

    {
      id: 87,
      ftime: "9:30PM",
      btime: "21:30:00",
    },

    {
      id: 89,
      ftime: "10:00PM",
      btime: "22:00:00",
    },

    {
      id: 91,
      ftime: "10:30PM",
      btime: "22:30:00",
    },

    {
      id: 93,
      ftime: "11:00PM",
      btime: "23:00:00",
    },

    {
      id: 95,
      ftime: "11:30PM",
      btime: "23:30:00",
    },
  ];

  useEffect(() => {
    timeSlots.forEach((item) => {
      if (item.btime === eventTime) {
        setSelectedTime(item.ftime);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className="calendery-wrapper">
        <Box className="calendery-screen-top-logo">
          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        </Box>
        <Container
          className="calendery-screen-container"
          maxWidth="lg"
          sx={{ backgroundColor: "white" }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography
                variant="h4"
                className="calendery-heading"
                color="initial"
              >
                Let’s schedule a time to talk
              </Typography>
              <Box mt={3} className="calender-wrapper">
                <Typography
                  variant="h6"
                  my={2}
                  fontFamily="Inter"
                  fontWeight={600}
                  color="initial"
                >
                  Select a Date & Time
                </Typography>
                <Grid container spacing={2} className="calendery-grid">
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Box className="calendery-grid-item">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          value={value}
                          disablePast
                          className="calender-calendery"
                          onChange={(newValue) => {
                            setValue(newValue);
                            setEventDate(
                              moment(newValue?.$d).format("YYYY-MM-DD")
                            );
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Typography mt={4} variant="body1" color="initial">
                      UK, Time
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Box className="calendery-grid-item margin-top">
                      <Typography variant="body1" color="initial">
                        {moment(value?.$d).format("dddd")}{" "}
                        {moment(value?.$d).format("LL")}
                      </Typography>

                      <Box my={3} className="time-wrapper">
                        <Stack
                          direction="column"
                          spacing={2}
                          className="time-stack"
                        >
                          {timeSlots.map((time) => (
                            <Box
                              key={time.id}
                              className={`${
                                selectedTime === time.ftime
                                  ? "time-box-active"
                                  : "time-box"
                              }`}
                              onClick={() => {
                                setSelectedTime(time.ftime);
                                setEventTime(time.btime);
                                setCompleteTime(time.ftime);
                              }}
                            >
                              <Typography variant="body1" color="initial">
                                {time.ftime}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box display="flex" sx={{ margin: "19px 3px" }}>
                <Box>
                  <Button
                    className="calendly-back-btn"
                    onClick={() => {
                      setIsCalender(false);
                      setIsQuestionaire(true);
                    }}
                    variant="contained"
                  >
                    Back
                  </Button>
                </Box>

                <Box className="bottom-box-wrapper">
                  <Box className="ScheduleEvent-form-wrapper">
                    <Box>
                      <Typography mb={1} variant="body1" color="initial">
                        I read the term and Privacy Policy (www.vera.co/privacy)
                        and accept receiving phone calls and text messages
                        related to my case, which may contain marketing
                        elements.
                      </Typography>
                      <Box className="terms-checkbox-wrapper">
                        <FormControlLabel
                          label="Agreed"
                          control={
                            <Checkbox
                              onChange={(e) =>
                                setIsTermsAgree(e.target.checked)
                              }
                              sx={{
                                "&.Mui-checked": {
                                  color: "#006766",
                                },
                              }}
                            />
                          }
                        />
                      </Box>
                    </Box>

                    <Box mt={3}>
                      <LoadingButton
                        className={
                          !isTermsAgree
                            ? "ScheduleEvent-form-button-disable"
                            : `${
                                isBtnLoading ? "" : "ScheduleEvent-form-button"
                              }`
                        }
                        variant="contained"
                        loading={isBtnLoading}
                        size="large"
                        fullWidth
                        onClick={() => sendData()}
                      >
                        Schedule Event
                      </LoadingButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <MessageModal
        open={isErrorModalTime}
        onClose={setIsErrorModalTime}
        title="Error"
        error
        content={`${
          !eventTime && !eventDate
            ? "Please select a date and time"
            : !eventTime
            ? "Please select a time"
            : !eventDate
            ? "Please select a date"
            : ""
        }`}
      />
      <MessageModal
        open={isErrorModal}
        onClose={setIsErrorModal}
        title="Error"
        content="This user already exists. Please login to continue."
        error
      />
      <MessageModal
        open={isNetworkError}
        onClose={setIsNetworkError}
        title="Error"
        content="Something went wrong. Please try again later."
        error
      />
      <MessageModal
        open={isAllFieldsNotFilled}
        onClose={setIsAllFieldsNotFilled}
        title="Error"
        content="Please fill all the fields."
        error
      />
      <MessageModal
        open={notValidPhoneModal}
        onClose={setNotValidPhoneModal}
        title="Error"
        content="Phone Number is not valid."
        error
      />
    </>
  );
};

export default Calendery;
