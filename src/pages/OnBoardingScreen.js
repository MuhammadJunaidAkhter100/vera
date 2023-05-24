import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  StepIcon,
} from "@mui/material";
import "../components/OnBoardingScreen/OnBoardingScreen.scss";

import InputMask from "react-input-mask";
import InputAdornment from "@mui/material/InputAdornment";
import StepContent from "@mui/material/StepContent";

import { ReactComponent as Logo } from "../assets/nav-vera-icon.svg";
import ukflag from "../assets/uk-flag.png";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";

import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import { ReactComponent as AudioBars } from "../assets/audio-bars.svg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as QuestionnaireIcon } from "../assets/questionnarie-icon.svg";
import { ReactComponent as RecordVoiceIcon } from "../assets/record-voice-option-icon.svg";

import Paper from "@mui/material/Paper";

import { ReactComponent as ListItemIcon } from "../assets/list-item-icon.svg";
import { ReactComponent as Pattern } from "../assets/green-line-pattern.svg";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";
import { ReactComponent as VoiceIconGreen } from "../assets/voice-icon-green.svg";
import { ReactComponent as ActiveStepIcon } from "../assets/active-step-icon.svg";
import { ReactComponent as InActiveStepIcon } from "../assets/inactive-step-icon.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Calendery from "./Calendery";

import ScheduleEvent from "./ScheduleEvent";
import moment from "moment";
import EventBooked from "./EventBooked";
import MessageModal from "../common/MessageModal";

// component
import Recorder from "../components/Recorder";

const OnBoardingScreen = () => {
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    {
      label: "Input Method",
      description: ``,
    },
    {
      label: "Your Problem",
      description: "Select which category best covers your query",
    },

    {
      label: "Some Description",
      description: ``,
    },

    {
      label: "Let's talk",
      description: `Provide details so we can set up a time to talk`,
    },
  ]);

  const [activeStep, setActiveStep] = React.useState(0);
  const [category, setCategory] = useState(null);
  const [screen, setScreen] = useState(0);
  const [isQuestionaire, setIsQuestionaire] = useState(true);
  const [isCalender, setIsCalender] = useState(false);
  const [isScheduleEvent, setIsScheduleEvent] = useState(false);
  const [isEventBooked, setIsEventBooked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [isPostalCodeError, setIsPostalCodeError] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");
  const [isCaseDescriptionError, setIsCaseDescriptionError] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [eventDate, setEventDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [eventTime, setEventTime] = useState(null);
  const [isEmailError, setIsEmailError] = useState(false);

  const [isFullNameError, setIsFullNameError] = useState(false);

  const [isEventScheduled, setIsEventScheduled] = useState(false);
  const [completeDate, setCompleteDate] = useState(
    moment(new Date()).format("LL")
  );
  const [selectedOption, setSelectedOption] = useState("questionnaire");
  const [completeTime, setCompleteTime] = useState(null);
  const [isNotRecordedAudioModal, setIsNotRecordedAudioModal] = useState(false);
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);
  const [isDashboard, setIsDashboard] = useState(null);

  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "green",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "green",
            },
          },
        },
      },
    },
  });

  const [isVoiceMemoDirect, setIsVoiceMemoDirect] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleNextButton();
        // callMyFunction();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line
  }, []);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPostalCode(postalCode) {
    return /^[a-zA-Z0-9]{5}$/.test(postalCode);
  }

  const handleReset = () => {
    setActiveStep(0);
    setScreen(1);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const getSelectedOption = params.get("selectedOption");
    const isDasboard = params.get("dashboard");
    if (isDasboard) {
      setIsDashboard(isDasboard);
    }
    if (getSelectedOption === "voice-memo") {
      setScreen(10);
      setIsVoiceMemoDirect(true);
      setActiveStep(0);
      setSteps([
        {
          label: "Your Problem",
          description: "Tell us about your case",
        },
        {
          label: "Let's talk",
          description: `Provide details so we can set up a time to talk`,
        },
      ]);
      setSelectedOption("voice-memo");
    } else {
      setSelectedOption("questionnaire");
      if (category) {
        setCategory(category);
        setScreen(1);
        setActiveStep(1);
      }
    }
  }, []);

  function CustomStepIcon(props) {
    const { active, completed, icon } = props;
    return (
      <StepIcon
        icon={
          icon ? (
            active ? (
              <ActiveStepIcon />
            ) : completed ? (
              icon
            ) : (
              <InActiveStepIcon />
            )
          ) : (
            icon
          )
        }
        active={active}
        completed={completed}
      />
    );
  }

  const handleNextButton = () => {
    if (selectedOption === "questionnaire") {
      if (screen === 0) {
        setSteps([
          {
            label: "Input Method",
            description: ``,
          },
          {
            label: "Your Problem",
            description: "Select which category best covers your query",
          },

          {
            label: "Some Description",
            description: ``,
          },

          {
            label: "Let's talk",
            description: `Provide details so we can set up a time to talk`,
          },
        ]);
        setScreen(screen + 1);
        handleNext();
      }
      if (screen < 5) {
        if (screen === 1) {
          if (category) {
            handleNext();
            setScreen(screen + 1);
          } else {
            setModalContent({
              title: "Category is missing",
              description: "Please select a category to proceed",
            });
            setIsModalOpen(true);
          }
        } else if (screen === 2) {
          if (caseDescription) {
            if (!localStorage.getItem("token")) {
              handleNext();
              setScreen(screen + 3);
            } else {
              setIsQuestionaire(false);
              setIsCalender(true);
            }
          } else {
            setIsCaseDescriptionError(true);
          }
        } else {
        }
      } else {
        if (screen === 5) {
          if (fullName && email && phone && postalCode) {
            if (isValidEmail(email)) {
              setIsQuestionaire(false);
              setIsCalender(true);
            } else {
              if (!isValidEmail(email)) {
                setIsEmailError(true);
              } else {
                setIsEmailError(false);
              }
              if (!isValidPostalCode(postalCode)) {
                setIsPostalCodeError(true);
              } else {
                setIsPostalCodeError(false);
              }
            }
          } else {
            if (!fullName) {
              setIsFullNameError(true);
            }
            if (!email) {
              setIsEmailError(true);
            }
            if (!postalCode) {
              setIsPostalCodeError(true);
            }
          }
        } else if (screen === 3) {
          setScreen(screen - 1);
          handleNext();
        }
      }
    } else if (selectedOption === "voice-memo") {
      if (!isVoiceMemoDirect) {
        setSteps([
          {
            label: "Your Problem",
            description: "Tell us about your case",
          },
          {
            label: "Let's talk",
            description: `Provide details so we can set up a time to talk`,
          },
        ]);

        if (screen === 0) {
          setSteps([
            {
              label: "Your Problem",
              description: "Tell us about your case",
            },
            {
              label: "Let's talk",
              description: `Provide details so we can set up a time to talk`,
            },
          ]);

          setScreen(screen + 10);
          // handleNext();
        } else if (screen === 10) {
          if (recordedAudioURL) {
            setScreen(screen + 10);
            handleNext();
          } else {
            setIsNotRecordedAudioModal(true);
          }
        } else {
          if (fullName && email && phone && postalCode) {
            if (isValidEmail(email)) {
              setIsQuestionaire(false);
              setIsCalender(true);
            } else {
              setIsEmailError(true);
            }
          } else {
            if (!fullName) {
              setIsFullNameError(true);
            }
            if (!email) {
              setIsEmailError(true);
            }

            if (!postalCode) {
              setIsPostalCodeError(true);
            }
          }
        }
      } else {
        setSteps([
          {
            label: "Your Problem",
            description: "Tell us about your case",
          },
          {
            label: "Let's talk",
            description: `Provide details so we can set up a time to talk`,
          },
        ]);

        if (screen === 0) {
          setSteps([
            {
              label: "Your Problem",
              description: "Tell us about your case",
            },
            {
              label: "Let's talk",
              description: `Provide details so we can set up a time to talk`,
            },
          ]);

          setScreen(screen + 10);
          handleNext();
        } else if (screen === 10) {
          if (recordedAudioURL) {
            setScreen(screen + 10);
            handleNext();
          } else {
            setIsNotRecordedAudioModal(true);
          }
        } else {
          if (fullName && email) {
            if (isValidEmail(email)) {
              setIsQuestionaire(false);
              setIsCalender(true);
            } else {
              setIsEmailError(true);
            }
          } else {
            if (!fullName) {
              setIsFullNameError(true);
            }
            if (!email) {
              setIsEmailError(true);
            }
          }
        }
      }
    }
  };

  return (
    <>
      <Box className="onboarding-screen-wrapper">
        {isQuestionaire && (
          <Box className="onboarding-screen-top-logo">
            <Logo onClick={() => navigate("/")} />
          </Box>
        )}

        <Container className="onboarding-screen-container custom-container">
          {isCalender && (
            <Calendery
              setIsScheduleEvent={setIsScheduleEvent}
              setIsCalender={setIsCalender}
              setEventDate={setEventDate}
              setEventTime={setEventTime}
              eventDate={eventDate}
              setCompleteTime={setCompleteTime}
              setCompleteDate={setCompleteDate}
              eventTime={eventTime}
              fullName={fullName}
              setFullName={setFullName}
              setIsEventBooked={setIsEventBooked}
              recordedAudioURL={recordedAudioURL}
              setIsQuestionaire={setIsQuestionaire}
              completeTime={completeTime}
              completeDate={completeDate}
              setIsEventScheduled={setIsEventScheduled}
              setEmail={setEmail}
              category={category}
              phone={phone}
              postalCode={postalCode}
              caseDescription={caseDescription}
              email={email}
            />
          )}
          {isEventBooked && (
            <EventBooked
              isEventScheduled={isEventScheduled}
              setIsEventScheduled={setIsEventScheduled}
              completeDate={completeDate}
              email={email}
              completeTime={completeTime}
            />
          )}
          {isScheduleEvent && (
            <ScheduleEvent
              fullName={fullName}
              setFullName={setFullName}
              setIsEventBooked={setIsEventBooked}
              setIsScheduleEvent={setIsScheduleEvent}
              completeTime={completeTime}
              eventTime={eventTime}
              eventDate={eventDate}
              completeDate={completeDate}
              setIsEventScheduled={setIsEventScheduled}
              setEmail={setEmail}
              category={category}
              postalCode={postalCode}
              caseDescription={caseDescription}
              email={email}
            />
          )}
          {isQuestionaire && (
            <Box>
              <Box className="pattern">
                <Pattern />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <Box className="onboarding-screen-left">
                    <Box sx={{ maxWidth: 400 }}>
                      <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                          <Step key={step.label} className="step-title">
                            <StepLabel
                              className="step-title"
                              StepIconComponent={CustomStepIcon}
                            >
                              {step.label}
                            </StepLabel>
                            <StepContent>
                              <Typography>{step.description}</Typography>
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>
                      {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                          <Typography>
                            All steps completed - you&apos;re finished
                          </Typography>
                          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                          </Button>
                        </Paper>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
                  {screen === 0 && (
                    <Box className="onboarding-screen-right">
                      <Typography
                        variant="h4"
                        className="heading-text"
                        color="initial"
                      >
                        Select how you want to proceed
                      </Typography>

                      <Box mt={4}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Box
                              onClick={() => {
                                setSelectedOption("questionnaire");
                              }}
                              className={
                                selectedOption === "questionnaire"
                                  ? "questionnaire-option-selected"
                                  : "questionnaire-option"
                              }
                            >
                              <QuestionnaireIcon />
                              <Typography
                                variant="body1"
                                className="option-text"
                                color="initial"
                              >
                                Fill out the questionnaire
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Box
                              onClick={() => {
                                setSelectedOption("voice-memo");
                              }}
                              className={
                                selectedOption === "voice-memo"
                                  ? "questionnaire-option-selected"
                                  : "questionnaire-option"
                              }
                            >
                              <RecordVoiceIcon />
                              <Typography
                                variant="body1"
                                className="option-text"
                                color="initial"
                              >
                                Record a Voice Memo
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )}
                  {screen === 10 && (
                    <Box className="onboarding-screen-right">
                      <Typography
                        variant="h4"
                        className="heading-text"
                        color="initial"
                      >
                        A little about the your case
                      </Typography>

                      <Typography my={4} variant="h5" color="initial">
                        Tell us about the following three things
                      </Typography>

                      <Box>
                        <Typography className="question-para" variant="body1">
                          <ListItemIcon /> &nbsp; What is your name?
                        </Typography>
                        <Typography
                          my={2}
                          className="question-para"
                          variant="body1"
                        >
                          <ListItemIcon /> &nbsp; Where are you based?
                        </Typography>
                        <Typography className="question-para" variant="body1">
                          <ListItemIcon /> &nbsp; Tell us about your problem?
                        </Typography>
                      </Box>

                      <Recorder recordedAudio={setRecordedAudioURL} />
                    </Box>
                  )}

                  {screen === 20 && (
                    <Box className="onboarding-screen-right screen2">
                      <Typography
                        variant="h4"
                        className="heading-text"
                        color="initial"
                      >
                        Let’s schedule a time to talk
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Every case is individual and personal.
                      </Typography>

                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Name
                        </Typography>

                        <TextField
                          id="outlined-basic"
                          label=""
                          placeholder="Enter your Full Name"
                          fullWidth
                          error={isFullNameError}
                          helperText={isFullNameError && "Name is required"}
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setIsFullNameError(false);
                          }}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Email
                        </Typography>

                        <TextField
                          id="outlined-basic"
                          type="email"
                          label=""
                          placeholder="Enter your Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailError(false);
                          }}
                          fullWidth
                          size="small"
                          error={isEmailError}
                          helperText={
                            isEmailError && "Email is required or invalid"
                          }
                          variant="outlined"
                        />
                      </Box>
                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Phone
                        </Typography>
                        <InputMask
                          mask="+44 9999 999999"
                          maskChar=""
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          value={phone}
                        >
                          {(inputProps) => (
                            <TextField
                              {...inputProps}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <img
                                      src={ukflag}
                                      style={{ height: "19px" }}
                                      alt="flag"
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              label=""
                              placeholder="+44 9999 999999"
                              variant="outlined"
                              size="small"
                              fullWidth
                            />
                          )}
                        </InputMask>
                      </Box>
                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Postal Code
                        </Typography>
                        <ThemeProvider theme={theme}>
                          <TextField
                            id="outlined-basic"
                            label=""
                            placeholder="Enter your postal code"
                            fullWidth
                            error={isPostalCodeError}
                            inputProps={{ maxLength: 5 }}
                            helperText={
                              isPostalCodeError &&
                              "Postal Code is required or invalid"
                            }
                            value={postalCode}
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                              setIsPostalCodeError(false);
                            }}
                            size="small"
                            variant="outlined"
                          />
                        </ThemeProvider>
                      </Box>
                    </Box>
                  )}

                  {screen === 1 && (
                    <Box className="onboarding-screen-right">
                      <Typography
                        variant="h4"
                        className="heading-text"
                        color="initial"
                      >
                        What do you need help with?
                      </Typography>

                      <Stack mt={4} spacing={2} direction="column">
                        <Box
                          onClick={() =>
                            setCategory("Getting a divorce or separation?")
                          }
                          className={
                            category === "Getting a divorce or separation?"
                              ? `onboarding-screen-right-item-active`
                              : `onboarding-screen-right-item`
                          }
                        >
                          <Typography
                            variant="h5"
                            className="heading-right-item"
                            color="initial"
                          >
                            Getting a divorce or separation?
                          </Typography>

                          {category === "Getting a divorce or separation?" && (
                            <Typography
                              variant="body1"
                              className="text-right-item"
                              color="initial"
                            >
                              We understand things don't always go as planned,
                              let us find a solution
                            </Typography>
                          )}
                        </Box>
                        <Box
                          onClick={() =>
                            setCategory("Need a visa or immigrating to the UK?")
                          }
                          className={
                            category === "Need a visa or immigrating to the UK?"
                              ? `onboarding-screen-right-item-active`
                              : `onboarding-screen-right-item`
                          }
                        >
                          <Typography
                            variant="h5"
                            className="heading-right-item"
                            color="initial"
                          >
                            Need a visa or immigrating to the UK?
                          </Typography>

                          {category ===
                            "Need a visa or immigrating to the UK?" && (
                            <Typography
                              variant="body1"
                              className="text-right-item"
                              color="initial"
                            >
                              We appreciate this is not always as simple as it
                              should be whether making the application, seeking
                              advice or navigating the home office let us help
                              you
                            </Typography>
                          )}
                        </Box>

                        <Box
                          onClick={() =>
                            setCategory(
                              "Are you a current or prospective Landlord or Tenant?"
                            )
                          }
                          className={
                            category ===
                            "Are you a current or prospective Landlord or Tenant?"
                              ? `onboarding-screen-right-item-active`
                              : `onboarding-screen-right-item`
                          }
                        >
                          <Typography
                            variant="h5"
                            className="heading-right-item"
                            color="initial"
                          >
                            Are you a current or prospective Landlord or Tenant?
                          </Typography>

                          {category ===
                            "Are you a current or prospective Landlord or Tenant?" && (
                            <Typography
                              variant="body1"
                              className="text-right-item"
                              color="initial"
                            >
                              Our experienced lawyers understand both sides
                            </Typography>
                          )}
                        </Box>
                        <Box
                          onClick={() => setCategory("Trouble at work?")}
                          className={
                            category === "Trouble at work?"
                              ? `onboarding-screen-right-item-active`
                              : `onboarding-screen-right-item`
                          }
                        >
                          <Typography
                            variant="h5"
                            className="heading-right-item"
                            color="initial"
                          >
                            Trouble at work?
                          </Typography>

                          {category === "Trouble at work?" && (
                            <Typography
                              variant="body1"
                              className="text-right-item"
                              color="initial"
                            >
                              Whether you're having trouble at your existing
                              work place or a new employment contract we can
                              guide you through all
                            </Typography>
                          )}
                        </Box>

                        <Box
                          onClick={() =>
                            setCategory("Falsely accused of a crime?")
                          }
                          className={
                            category === "Falsely accused of a crime?"
                              ? `onboarding-screen-right-item-active`
                              : `onboarding-screen-right-item`
                          }
                        >
                          <Typography
                            variant="h5"
                            className="heading-right-item"
                            color="initial"
                          >
                            Falsely accused of a crime?
                          </Typography>

                          {category === "Falsely accused of a crime?" && (
                            <Typography
                              variant="body1"
                              className="text-right-item"
                              color="initial"
                            >
                              The law and police exist to protect us, but that
                              doesn't mean you shouldn't protect yourself if an
                              allegation has been made
                            </Typography>
                          )}
                        </Box>

                        <Box
                          onClick={() => setCategory("Any Other challenges?")}
                          className={
                            category === "Any Other challenges?"
                              ? `onboarding-screen-right-item-active`
                              : `onboarding-screen-right-item`
                          }
                        >
                          <Typography
                            variant="h5"
                            className="heading-right-item"
                            color="initial"
                          >
                            Any Other challenges?
                          </Typography>

                          {category === "Any Other challenges?" && (
                            <Typography
                              variant="body1"
                              className="text-right-item"
                              color="initial"
                            ></Typography>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                  )}

                  {screen === 4 && (
                    <Box className="onboarding-screen-right screen2">
                      <Typography
                        variant="h4"
                        className="heading-text"
                        color="initial"
                      >
                        Where is your case based?
                      </Typography>
                      <Typography variant="body1" color="initial">
                        We’ll look for a lawyer near you.
                      </Typography>

                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Postal Code
                        </Typography>
                        <ThemeProvider theme={theme}>
                          <TextField
                            id="outlined-basic"
                            label=""
                            placeholder="Enter your postal code"
                            fullWidth
                            error={isPostalCodeError}
                            inputProps={{ maxLength: 5 }}
                            helperText={
                              isPostalCodeError &&
                              "Postal Code is required or invalid"
                            }
                            value={postalCode}
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                              setIsPostalCodeError(false);
                            }}
                            size="small"
                            variant="outlined"
                          />
                        </ThemeProvider>
                      </Box>
                    </Box>
                  )}

                  {screen === 2 && (
                    <Box className="onboarding-screen-right screen2">
                      <Typography
                        variant="h5"
                        className="heading-text"
                        color="initial"
                      >
                        A little about your case
                      </Typography>
                      <Typography variant="body1" color="initial">
                        We’ll look for a lawyer near you.
                      </Typography>

                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Description
                        </Typography>

                        <TextField
                          id="outlined-basic"
                          label=""
                          multiline
                          value={caseDescription}
                          error={isCaseDescriptionError}
                          helperText={
                            isCaseDescriptionError && "Description is required"
                          }
                          onChange={(e) => {
                            setCaseDescription(e.target.value);
                            setIsCaseDescriptionError(false);
                          }}
                          rows={4}
                          placeholder="A little text here"
                          fullWidth
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  )}
                  {screen === 5 && (
                    <Box className="onboarding-screen-right screen2">
                      <Typography
                        variant="h4"
                        className="heading-text"
                        color="initial"
                      >
                        Let’s schedule a time to talk
                      </Typography>
                      <Typography variant="body1" color="initial">
                        Every case is individual and personal.
                      </Typography>

                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Name
                        </Typography>

                        <TextField
                          id="outlined-basic"
                          label=""
                          placeholder="Enter your Full Name"
                          fullWidth
                          error={isFullNameError}
                          helperText={isFullNameError && "Name is required"}
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setIsFullNameError(false);
                          }}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Box mt={3}>
                        <Typography
                          variant="h5"
                          mb={2}
                          className="postal-label"
                          color="initial"
                        >
                          Email
                        </Typography>

                        <TextField
                          id="outlined-basic"
                          type="email"
                          label=""
                          placeholder="Enter your Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailError(false);
                          }}
                          fullWidth
                          size="small"
                          error={isEmailError}
                          helperText={
                            isEmailError && "Email is required or invalid"
                          }
                          variant="outlined"
                        />

                        <Box mt={3}>
                          <Typography
                            variant="h5"
                            mb={2}
                            className="postal-label"
                            color="initial"
                          >
                            Phone
                          </Typography>

                          <InputMask
                            mask="+44 9999 999999"
                            maskChar=""
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            value={phone}
                          >
                            {(inputProps) => (
                              <TextField
                                {...inputProps}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <img
                                        src={ukflag}
                                        style={{ height: "19px" }}
                                        alt="flag"
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                label=""
                                placeholder="+44 9999 999999"
                                variant="outlined"
                                size="small"
                                fullWidth
                              />
                            )}
                          </InputMask>
                        </Box>
                        <Box mt={3}>
                          <Typography
                            variant="h5"
                            mb={2}
                            className="postal-label"
                            color="initial"
                          >
                            Postal Code
                          </Typography>
                          <ThemeProvider theme={theme}>
                            <TextField
                              id="outlined-basic"
                              label=""
                              placeholder="Enter your postal code"
                              fullWidth
                              error={isPostalCodeError}
                              inputProps={{ maxLength: 5 }}
                              helperText={
                                isPostalCodeError &&
                                "Postal Code is required or invalid"
                              }
                              value={postalCode}
                              onChange={(e) => {
                                setPostalCode(e.target.value);
                                setIsPostalCodeError(false);
                              }}
                              size="small"
                              variant="outlined"
                            />
                          </ThemeProvider>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
          {isQuestionaire && (
            <Grid
              container
              mt={5}
              spacing={2}
              className="onboarding-screen-bottom-btn"
            >
              <Grid item xs={12} sm={6} md={4} lg={4} xl={4}></Grid>

              <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                >
                  <Box>
                    {screen === 1 && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSelectedOption("voice-memo");

                          setScreen(10);
                          handleBack();
                          setIsVoiceMemoDirect(true);

                          setSteps([
                            {
                              label: "Your Problem",
                              description: "Tell us about your case",
                            },
                            {
                              label: "Let's talk",
                              description: `Provide details so we can set up a time to talk`,
                            },
                          ]);
                        }}
                        className="voice-btn"
                      >
                        <VoiceIconGreen />
                        &nbsp;use voice note instead
                      </Button>
                    )}
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    {activeStep >= 0 && (
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (
                            screen % 10 === 0 &&
                            selectedOption === "voice-memo"
                          ) {
                            if (screen === 10) {
                              if (isDashboard === "true") {
                                navigate("/dashboard");
                              } else {
                                navigate("/");
                              }
                            } else {
                              if (isVoiceMemoDirect && screen === 10) {
                                navigate("/");
                              } else {
                                setScreen(screen - 10);
                                handleBack();
                              }
                            }
                          } else {
                            if (screen === 0) {
                              if (isDashboard === "true") {
                                navigate("/dashboard");
                              } else {
                                navigate("/");
                              }
                            } else {
                              if (screen === 100) {
                                setScreen(screen - 99);
                                handleBack();
                              } else {
                                if (screen === 2) {
                                  setScreen(screen - 1);
                                  handleBack();
                                } else if (screen === 5) {
                                  setScreen(screen - 3);

                                  handleBack();
                                } else {
                                  setScreen(screen - 1);
                                  handleBack();
                                }
                              }
                            }
                          }
                        }}
                        className="back-btn"
                      >
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      disabled={
                        screen === 1 &&
                        !category &&
                        selectedOption === "questionnaire"
                          ? true
                          : screen === 2 &&
                            !caseDescription &&
                            selectedOption === "questionnaire"
                          ? true
                          : screen === 5 &&
                            (!fullName || !email || !phone || !postalCode) &&
                            selectedOption === "questionnaire"
                          ? true
                          : screen === 10 &&
                            !recordedAudioURL &&
                            selectedOption === "voice-memo"
                          ? true
                          : screen === 20 &&
                            (!fullName || !email || !phone || !postalCode) &&
                            selectedOption === "voice-memo"
                          ? true
                          : false
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleNextButton();
                        }
                      }}
                      onClick={() => {
                        handleNextButton();
                      }}
                      className={
                        (
                          screen === 1 &&
                          !category &&
                          selectedOption === "questionnaire"
                            ? true
                            : screen === 2 &&
                              !caseDescription &&
                              selectedOption === "questionnaire"
                            ? true
                            : screen === 5 &&
                              (!fullName || !email || !phone || !postalCode) &&
                              selectedOption === "questionnaire"
                            ? true
                            : screen === 10 &&
                              !recordedAudioURL &&
                              selectedOption === "voice-memo"
                            ? true
                            : screen === 20 &&
                              (!fullName || !email || !phone || !postalCode) &&
                              selectedOption === "voice-memo"
                            ? true
                            : false
                        )
                          ? "disabled-next-btn"
                          : "next-btn"
                      }
                    >
                      Next &nbsp; <RightArrow />
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
      <MessageModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        content={modalContent.description}
        title={modalContent.title}
        error
      />
      <MessageModal
        open={isNotRecordedAudioModal}
        onClose={setIsNotRecordedAudioModal}
        content="Record your voice note to proceed"
        title="Record your voice note"
        error
      />
    </>
  );
};

export default OnBoardingScreen;
