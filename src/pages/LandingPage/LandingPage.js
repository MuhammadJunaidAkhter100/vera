import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import LandingPageHeroSection from "./LandingPageHeroSection";
import LandingPageCtaSec from "./LandingPageCtaSec";
import FeaturesSection from "./FeaturesSection";
import ProcessExplainer from "./ProcessExplainer";
import InputAdornment from "@mui/material/InputAdornment";
import QuoteSection from "./QuoteSection";
import InputMask from "react-input-mask";
import ManageCaseSection from "./ManageCaseSection";
import Accordion from "@mui/material/Accordion";
import { ReactComponent as MessageIcon } from "../../assets/msg-icon.svg";
import { ReactComponent as PhoneIcon } from "../../assets/call-icon.svg";
import { ReactComponent as LocationIcon } from "../../assets/location-icon.svg";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ReactComponent as VeraLogo } from "../../assets/vera-footer-icon.svg";
import { ReactComponent as AddIcon } from "../../assets/add-icon.svg";
import MessageModal from "../../common/MessageModal";
import ukflag from "../../assets/uk-flag.png";
import { ReactComponent as MoreIcon } from "../../assets/more-icon.svg";
import { ReactComponent as LessIcon } from "../../assets/less-icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/sub-close-icon.svg";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "../../components/MobileNavbar";
import { ReactComponent as RedirectArrow } from "../../assets/redirect-arrow.svg";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import "./LandingPage.scss";
const LandingPage = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = React.useState(
    window.innerWidth < 500 ? "mobile" : "desktop"
  );
  const [expanded, setExpanded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [feedbackDoneModal, setFeedbackDoneModal] = useState(false);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [viewMoreFaqs, setViewMoreFaqs] = useState(false);
  const [faqCount, setFaqCount] = useState(0);
  const handleAccordionChange = (num) => {
    setExpanded(!expanded);
    setFaqCount(num);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNavbar("mobile");
      } else {
        setNavbar("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [window.innerWidth]);

  const contactUsFormValidation = () => {
    if (firstName === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (lastName === "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (email === "") {
      setEmailError(true);
    } else {
      if (isEmailValid(email)) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }
    if (description === "") {
      setIsDescriptionError(true);
    } else {
      setIsDescriptionError(false);
    }
    if (phone === "") {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      description !== "" &&
      phone !== "" &&
      isEmailValid(email) &&
      !emailError &&
      !firstNameError &&
      !lastNameError &&
      !phoneError &&
      !isDescriptionError
    ) {
      setFeedbackDoneModal(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDescription("");
      setPhone("");
    }
  };

  const isEmailValid = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
      {navbar === "mobile" ? <MobileNavbar /> : <Navbar />}

      <LandingPageHeroSection />
      <LandingPageCtaSec />
      <FeaturesSection />
      <ProcessExplainer />
      <QuoteSection />
      <ManageCaseSection />

      <LandingPageCtaSec />

      <Container id="faqs" className="custom-container">
        <Box className="frequently-asked-questions-wrapper">
          <Typography
            mt={5}
            variant="h4"
            className="faq-heading-main"
            color="initial"
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            className="faq-para-main"
            m={2}
            color="initial"
          >
            Everything you need to know about the product and billing.
          </Typography>
          <Box m={5} className="faq-accordian-wrapper">
            <Accordion
              expanded={expanded ? faqCount === 52 : undefined}
              onChange={() => handleAccordionChange(52)}
              className="faq-accordian"
            >
              <AccordionSummary
                iconbuttonprops={{ disableFocusRipple: true }}
                expanded={expanded ? faqCount === 52 : undefined}
                onClick={() => handleAccordionChange(52)}
                expandIcon={
                  expanded && faqCount === 52 ? <CloseIcon /> : <AddIcon />
                }
                className="faq-accordian-summary"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="faq-accordian-title">
                  Does Vera charge me anything?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-accordian-desc">
                  The Vera platform in itself is free to use with no hidden
                  fees. Your lawyer will quote you a transparent fixed fee at a
                  later stage which you can then agree to confirm if you are
                  satisfied.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded ? faqCount === 53 : undefined}
              onChange={() => handleAccordionChange(53)}
              className="faq-accordian"
            >
              <AccordionSummary
                iconbuttonprops={{ disableFocusRipple: true }}
                expanded={expanded ? faqCount === 53 : undefined}
                onClick={() => handleAccordionChange(53)}
                expandIcon={
                  expanded && faqCount === 53 ? <CloseIcon /> : <AddIcon />
                }
                className="faq-accordian-summary"
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="faq-accordian-title">
                  Do I need to put in my bank or card details to submit my
                  query?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-accordian-desc">
                  No, to begin with you send across your query and speak to our
                  case manager who will guide you.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box className="view-more-wrapper">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setViewMoreFaqs(!viewMoreFaqs)}
              className="view-more-btn"
            >
              {viewMoreFaqs ? (
                <span>
                  View Less <LessIcon />
                </span>
              ) : (
                <span>
                  View More <MoreIcon />
                </span>
              )}
            </Button>
          </Box>

          {viewMoreFaqs && (
            <>
              <Typography
                mt={5}
                variant="h4"
                className="faq-heading-main"
                color="initial"
              >
                Family Law
              </Typography>

              <Box m={5} className="faq-accordian-wrapper">
                <Accordion
                  expanded={expanded ? faqCount === 5 : undefined}
                  onChange={() => handleAccordionChange(5)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 5 : undefined}
                    onClick={() => handleAccordionChange(5)}
                    expandIcon={
                      expanded && faqCount === 5 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What is the difference between a divorce and separation?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      A divorce is the legal process of ending a marriage, while
                      separation is a situation where a couple decides to live
                      apart from each other. While a separation can be
                      formalized through a legal separation agreement, it does
                      not end the marriage like a divorce does. In a legal
                      separation, the couple may still have certain legal
                      obligations to each other, such as spousal support or
                      division of assets. In contrast, a divorce legally
                      terminates the marriage and both parties are free to
                      remarry.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 6 : undefined}
                  onChange={() => handleAccordionChange(6)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 6 : undefined}
                    onClick={() => handleAccordionChange(6)}
                    expandIcon={
                      expanded && faqCount === 6 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What is a civil partnership?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      A civil partnership is a legal relationship between two
                      people of the same sex or gender, which gives them similar
                      legal rights and responsibilities to those of a married
                      couple. Civil partnerships were introduced in the UK in
                      2005 as a way for same-sex couples to have their
                      relationship legally recognised, before the introduction
                      of same-sex marriage in 2014. A civil partnership can be
                      dissolved in a similar way to a divorce, through a legal
                      process known as dissolution. However, the process for
                      dissolving a civil partnership is slightly different to
                      that of a divorce, and there are some legal differences
                      between the two. For example, there is no requirement for
                      a civil partnership to be consummated, and adultery is not
                      a ground for dissolution.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 60 : undefined}
                  onChange={() => handleAccordionChange(60)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 60 : undefined}
                    onClick={() => handleAccordionChange(60)}
                    expandIcon={
                      expanded && faqCount === 60 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What types of custody is there?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      In the UK, there are several types of custody that can be
                      awarded by the court in the best interests of the child.
                      These include:{" "}
                      <p>
                        1. Full custody: <br /> This is where one parent has
                        sole responsibility for the child's care and upbringing,
                        and the child lives with them all or most of the time.
                      </p>
                      <p>
                        2. Joint custody: <br /> This is where both parents
                        share responsibility for the child's care and
                        upbringing, and the child spends time living with both
                        parents.
                      </p>
                      <p>
                        3. Shared custody: <br /> This is similar to joint
                        custody, but with a more equal split of time between the
                        parents. The child may spend roughly equal amounts of
                        time living with each parent.
                      </p>
                      4. Split custody: <br /> This is where two or more
                      children from the same family are separated, with each
                      parent having custody of one or more of the children. It's
                      worth noting that custody arrangements can vary greatly
                      depending on the individual circumstances of the family,
                      and what is in the best interests of the child.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 61 : undefined}
                  onChange={() => handleAccordionChange(61)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 61 : undefined}
                    onClick={() => handleAccordionChange(61)}
                    expandIcon={
                      expanded && faqCount === 61 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Will I get Custody?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      In summary, custody can be awarded to one or both parents
                      or other caregivers, and it is determined based on the
                      child's best interests. The court considers a variety of
                      factors, such as the child's age, health, and emotional
                      ties with each parent, as well as the ability of each
                      parent to provide for the child's physical and emotional
                      needs. The court may also consider the child's
                      preferences, if they are old enough to express them.
                      Ultimately, custody decisions are made on a case-by-case
                      basis and depend on the unique circumstances of each
                      family.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Typography
                mt={5}
                variant="h4"
                className="faq-heading-main"
                color="initial"
              >
                Criminal Defense
              </Typography>

              <Box m={5} className="faq-accordian-wrapper">
                <Accordion
                  expanded={expanded ? faqCount === 7 : undefined}
                  onChange={() => handleAccordionChange(7)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 7 : undefined}
                    onClick={() => handleAccordionChange(7)}
                    expandIcon={
                      expanded && faqCount === 7 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Is there a free trial available?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      Yes, you can try us for free for 30 days. If you want,
                      we’ll provide you with a free, personalized 30-minute
                      onboarding call to get you up and running as soon as
                      possible.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 8 : undefined}
                  onChange={() => handleAccordionChange(8)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 8 : undefined}
                    onClick={() => handleAccordionChange(8)}
                    expandIcon={
                      expanded && faqCount === 8 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      How does billing work?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      Yes, you can try us for free for 30 days. If you want,
                      we’ll provide you with a free, personalized 30-minute
                      onboarding call to get you up and running as soon as
                      possible.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Typography
                mt={5}
                variant="h4"
                className="faq-heading-main"
                color="initial"
              >
                Employment Law
              </Typography>

              <Box m={5} className="faq-accordian-wrapper">
                <Accordion
                  expanded={expanded ? faqCount === 9 : undefined}
                  onChange={() => handleAccordionChange(9)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 9 : undefined}
                    onClick={() => handleAccordionChange(9)}
                    expandIcon={
                      expanded && faqCount === 9 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Should I get my employment contract reviewed
                      professionally?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      It's generally a good idea to get an employment contract
                      reviewed professionally, especially if you're not familiar
                      with the legal language and terminology used in such
                      contracts. A professional review can help you understand
                      the terms and conditions of your employment and ensure
                      that you're getting a fair deal. It can also help you
                      identify any potential issues or clauses that may be
                      unfavorable to you. It's better to be informed and aware
                      of your rights and obligations before signing any
                      employment contract.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 10 : undefined}
                  onChange={() => handleAccordionChange(10)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 10 : undefined}
                    onClick={() => handleAccordionChange(10)}
                    expandIcon={
                      expanded && faqCount === 10 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What is unlawful termination?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      Unlawful termination, also known as unfair dismissal, is a
                      situation where an employer terminates an employee's
                      contract without a valid reason or without following
                      proper procedures. Under UK law, an employee has the right
                      to not be unfairly dismissed if they have been
                      continuously employed for at least two years. However,
                      there are certain exceptions where an employee may be able
                      to claim unfair dismissal even if they have not met the
                      two-year requirement, such as if the dismissal is due to
                      pregnancy, whistleblowing, or exercising legal rights. If
                      an employee believes that they have been unfairly
                      dismissed, they can file a claim with the Employment
                      Tribunal.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 100 : undefined}
                  onChange={() => handleAccordionChange(100)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 100 : undefined}
                    onClick={() => handleAccordionChange(100)}
                    expandIcon={
                      expanded && faqCount === 100 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What constitutes harassment at work?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      Harassment at work can take many forms, and it is
                      important to note that it is not limited to physical
                      contact. In the UK, harassment is defined as any unwanted
                      behavior related to one of the following: age, disability,
                      gender reassignment, race, religion or belief, sex, or
                      sexual orientation. Harassment can include verbal abuse,
                      offensive emails or text messages, bullying, and
                      discrimination. It can also include actions or comments
                      that create an intimidating or hostile work environment.
                      The key factor is that the behavior is unwanted and makes
                      the recipient feel intimidated, degraded, humiliated or
                      offended. If you feel that you are being harassed at work,
                      you should report it to your employer or HR department as
                      soon as possible.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 101 : undefined}
                  onChange={() => handleAccordionChange(101)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 101 : undefined}
                    onClick={() => handleAccordionChange(101)}
                    expandIcon={
                      expanded && faqCount === 101 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Do I have any rights if I’m an employee?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      As an employee in the UK, you have certain rights that are
                      protected by law including the right to a written
                      contract, protection against discrimination, the right to
                      a safe working environment, and the right to be paid at
                      least the National Minimum Wage. It also mentions that
                      employees have legal protections against unfair dismissal
                      and that they may have additional rights depending on
                      their specific situation, such as maternity or paternity
                      leave.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 102 : undefined}
                  onChange={() => handleAccordionChange(102)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 102 : undefined}
                    onClick={() => handleAccordionChange(102)}
                    expandIcon={
                      expanded && faqCount === 102 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Can my employer dismiss me without a reason?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      In the UK, employers can dismiss an employee without a
                      reason during the first two years of their employment, as
                      long as the reason is not discriminatory or in breach of
                      the employee's statutory rights. This is known as a
                      "no-fault dismissal" or "ordinary dismissal." After two
                      years of continuous employment, employers must have a fair
                      reason for dismissing an employee, such as redundancy,
                      capability, conduct, or a statutory requirement. In any
                      case, an employer must follow a fair and reasonable
                      dismissal process, which includes giving the employee
                      notice and the opportunity to appeal the decision.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 103 : undefined}
                  onChange={() => handleAccordionChange(103)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 103 : undefined}
                    onClick={() => handleAccordionChange(103)}
                    expandIcon={
                      expanded && faqCount === 103 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Do I have any rights as a freelancer or gig worker?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      you have certain rights, although they may not be as
                      extensive as those afforded to traditional employees. Some
                      of these rights include:
                      <p>
                        1. The right to a safe and healthy work environment: You
                        have the right to work in an environment that is free
                        from health and safety hazards. This includes the right
                        to be provided with any necessary protective equipment.
                      </p>
                      <p>
                        2. The right to be paid: You have the right to be paid
                        for the work you do, and to receive payment on time.
                      </p>
                      <p>
                        3. The right to not be discriminated against: You have
                        the right to not be discriminated against on the basis
                        of your race, gender, religion, sexual orientation, or
                        any other protected characteristic.
                      </p>
                      <p>
                        4. The right to form a union: You have the right to join
                        a union or to form one if you choose.
                      </p>
                      <p>
                        5. The right to control your own work: You have the
                        right to control how and when you work, as long as you
                        meet the agreed-upon deadlines.
                      </p>
                      It's important to note that the specific rights you have
                      may vary depending on the laws in your jurisdiction and
                      the terms of any contracts you have entered into with
                      clients or employers.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Typography
                mt={5}
                variant="h4"
                className="faq-heading-main"
                color="initial"
              >
                Immigration Law
              </Typography>

              <Box m={5} className="faq-accordian-wrapper">
                <Accordion
                  expanded={expanded ? faqCount === 11 : undefined}
                  onChange={() => handleAccordionChange(11)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 11 : undefined}
                    onClick={() => handleAccordionChange(11)}
                    expandIcon={
                      expanded && faqCount === 11 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What is the Home Office?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      The Home Office is responsible for the development and
                      implementation of immigration policies and procedures, as
                      well as the management of immigration applications and
                      processes. It also oversees immigration enforcement
                      activities and works to prevent and detect
                      immigration-related crime.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 12 : undefined}
                  onChange={() => handleAccordionChange(12)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 12 : undefined}
                    onClick={() => handleAccordionChange(12)}
                    expandIcon={
                      expanded && faqCount === 12 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Can I get a Student Visa?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      Yes, if you are a non-EEA national and want to study in
                      the UK, you will need to apply for a Student visa. To be
                      eligible for a Student visa, you will need to have
                      received an offer from a licensed UK educational
                      institution, be able to speak, read, write, and understand
                      English, have enough money to support yourself during your
                      studies, and meet other requirements such as passing a
                      credibility interview and meeting health and character
                      requirements. The Student visa application process can be
                      quite complex, and it's recommended that you seek the
                      advice of a qualified immigration advisor or solicitor
                      before applying.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 120 : undefined}
                  onChange={() => handleAccordionChange(120)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 120 : undefined}
                    onClick={() => handleAccordionChange(120)}
                    expandIcon={
                      expanded && faqCount === 120 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Can I get a Work Visa?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      To get a work visa in the UK, you must have a job offer
                      from a licensed employer and score enough points through a
                      points-based system. You must also have knowledge of the
                      English language and be able to support yourself
                      financially. The visa can be extended or lead to permanent
                      residency.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 121 : undefined}
                  onChange={() => handleAccordionChange(121)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 121 : undefined}
                    onClick={() => handleAccordionChange(121)}
                    expandIcon={
                      expanded && faqCount === 121 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Can I get citizenship?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      To become a British citizen, you must meet certain
                      eligibility criteria, including having lived in the UK for
                      a specified period of time, passing a Life in the UK test,
                      and demonstrating knowledge of the English language. Once
                      granted citizenship, you can apply for a British passport.
                      It is best to seek advice from an immigration
                      specialist/consultant.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 122 : undefined}
                  onChange={() => handleAccordionChange(122)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 122 : undefined}
                    onClick={() => handleAccordionChange(122)}
                    expandIcon={
                      expanded && faqCount === 122 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What is ILR (Indefinite Leave to Remain)?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      Indefinite Leave to Remain (ILR) is a type of settlement
                      status that allows a person to remain in the UK without
                      any time restrictions on their stay. It is also commonly
                      referred to as 'permanent residency'.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 123 : undefined}
                  onChange={() => handleAccordionChange(123)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 123 : undefined}
                    onClick={() => handleAccordionChange(123)}
                    expandIcon={
                      expanded && faqCount === 123 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      How long does it take to get a decision?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      The processing time for a decision on an immigration
                      application can vary depending on the type of visa or
                      application, as well as the country from which it is
                      submitted. Generally, the processing time can range from a
                      few weeks to several months or even longer in some cases.
                      It's best to check the UK government website for the
                      specific processing times for your particular situation.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Typography
                mt={5}
                variant="h4"
                className="faq-heading-main"
                color="initial"
              >
                Property
              </Typography>

              <Box m={5} className="faq-accordian-wrapper">
                <Accordion
                  expanded={expanded ? faqCount === 13 : undefined}
                  onChange={() => handleAccordionChange(13)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 13 : undefined}
                    onClick={() => handleAccordionChange(13)}
                    expandIcon={
                      expanded && faqCount === 13 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      My Landlord has asked me to leave?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      If your landlord asks you to leave, your rights will
                      depend on the type of tenancy you have, the reason your
                      landlord wants you to leave, and the notice period they
                      have given you. If you have an assured shorthold tenancy,
                      your landlord must give you a valid notice and follow the
                      correct eviction procedures. If you have a periodic
                      tenancy or a fixed-term tenancy that has ended, your
                      landlord may not need to give a reason to ask you to
                      leave. You may have the right to challenge a notice in
                      certain circumstances or negotiate with your landlord to
                      stay. It's recommended to seek legal advice if you're
                      facing eviction or have concerns about your rights as a
                      tenant.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 14 : undefined}
                  onChange={() => handleAccordionChange(14)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 14 : undefined}
                    onClick={() => handleAccordionChange(14)}
                    expandIcon={
                      expanded && faqCount === 14 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      My Landlord isn’t doing repairs, what can I do?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      If your landlord is not carrying out necessary repairs to
                      the property you are renting, you have a number of
                      options. Firstly, you should inform your landlord in
                      writing of the problems with the property and request that
                      they carry out the necessary repairs. If the landlord
                      fails to respond, you may be able to take legal action,
                      such as making a claim to the housing authority,
                      contacting a housing charity or seeking legal advice. You
                      may also be able to withhold rent until the repairs are
                      carried out, but this should only be done as a last resort
                      and with caution, as there is a risk of eviction for
                      non-payment of rent.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 141 : undefined}
                  onChange={() => handleAccordionChange(141)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 141 : undefined}
                    onClick={() => handleAccordionChange(141)}
                    expandIcon={
                      expanded && faqCount === 141 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      My tenant is refusing to pay rent?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      If your tenant is refusing to pay rent, you can take legal
                      action against them. The first step is to send them a
                      formal letter, usually called a "notice to quit" or
                      "demand for rent". If this doesn't work, you can take them
                      to court to obtain a court order for them to pay the rent
                      or leave the property. However, it's important to follow
                      the correct legal procedures and obtain legal advice
                      before taking any action.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Typography
                mt={5}
                variant="h4"
                className="faq-heading-main"
                color="initial"
              >
                Estate Planning
              </Typography>

              <Box m={5} className="faq-accordian-wrapper">
                <Accordion
                  expanded={expanded ? faqCount === 15 : undefined}
                  onChange={() => handleAccordionChange(15)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 15 : undefined}
                    onClick={() => handleAccordionChange(15)}
                    expandIcon={
                      expanded && faqCount === 15 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      What is a will?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      A will is a legal document that specifies a person's
                      wishes regarding the distribution of their property and
                      assets after they die. It may also include instructions
                      regarding the care of any dependents and appoint a
                      guardian to look after them. A will is an important tool
                      for ensuring that your person's assets are distributed
                      according to their wishes and can help to avoid disputes
                      and legal challenges among family members.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 16 : undefined}
                  onChange={() => handleAccordionChange(16)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 16 : undefined}
                    onClick={() => handleAccordionChange(16)}
                    expandIcon={
                      expanded && faqCount === 16 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Do I need to have a will?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      In summary, it is not legally required to have a will, but
                      it is recommended to ensure that your assets are
                      distributed according to your wishes and that your loved
                      ones are taken care of after your death. Without a will,
                      your assets may be distributed according to the rules of
                      intestacy, which may not align with your wishes.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded ? faqCount === 160 : undefined}
                  onChange={() => handleAccordionChange(160)}
                  className="faq-accordian"
                >
                  <AccordionSummary
                    iconbuttonprops={{ disableFocusRipple: true }}
                    expanded={expanded ? faqCount === 160 : undefined}
                    onClick={() => handleAccordionChange(160)}
                    expandIcon={
                      expanded && faqCount === 160 ? <CloseIcon /> : <AddIcon />
                    }
                    className="faq-accordian-summary"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="faq-accordian-title">
                      Will a Will protect my family?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className="faq-accordian-desc">
                      A Will can provide protection for your family by ensuring
                      that your assets are distributed according to your wishes
                      after you pass away. It can also appoint a guardian for
                      any minor children, and make provisions for funeral
                      arrangements. Without a Will, your assets will be
                      distributed according to the law, which may not align with
                      your wishes.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </>
          )}
        </Box>
      </Container>

      <Box id="contact" sx={{ paddingTop: "37px" }}>
        <Container className="custom-container">
          <Box mt={5} mb={5} className="contact-us-wrapper ">
            <Grid container>
              <Grid
                className="contact-us-left"
                item
                xs={12}
                sm={6}
                lg={4}
                xl={4}
              >
                <Box p={3}>
                  <Typography
                    className="contact-us-heading"
                    variant="h4"
                    m={2}
                    color="initial"
                  >
                    Contact Support
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    m={2}
                    className="contact-us-desc"
                  >
                    If you have any questions or just need to have a chat please
                    reach out.
                  </Typography>
                  <Box m={2} className="box-item">
                    <MessageIcon />
                    <Box>
                      <Typography
                        ml={1}
                        className="title"
                        variant="h6"
                        color="initial"
                      >
                        Contact with us
                      </Typography>
                      <Typography
                        ml={1}
                        className="desc"
                        variant="subtitle1"
                        color="initial"
                      >
                        Reach out to us at
                        <a
                          href="mailto:Vera@veralegal.co.uk"
                          className="anchor"
                        >
                          Vera@veralegal.co.uk
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                  <Box m={2} className="box-item">
                    <LocationIcon />
                    <Box>
                      <Typography
                        ml={1}
                        className="title"
                        variant="h6"
                        color="initial"
                      >
                        Our Office
                      </Typography>
                      <Typography
                        ml={1}
                        className="desc"
                        variant="subtitle1"
                        color="initial"
                      >
                        Launch Lab, Franklin Building, <br /> 124 Goswell Rd.,
                        London EC1V 7DP
                      </Typography>
                    </Box>
                  </Box>
                  <Box m={2} className="box-item">
                    <PhoneIcon />
                    <Box>
                      <Typography
                        ml={1}
                        className="title"
                        variant="h6"
                        color="initial"
                      >
                        Call Us
                      </Typography>
                      <Typography
                        ml={1}
                        className="desc"
                        variant="subtitle1"
                        color="initial"
                      >
                        Ring us on
                        <a href="tel:+12015550123" className="anchor">
                          +1 (201) 555-0123
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={8} xl={8}>
                <Box className="contact-us-right">
                  <Box className="contact-us-form">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <Typography
                          mb={1}
                          variant="body1"
                          fontWeight={600}
                          color="initial"
                        >
                          First Name
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            setFirstNameError(false);
                          }}
                          label=""
                          error={firstNameError}
                          helperText={
                            firstNameError ? "First Name is required" : ""
                          }
                          placeholder="Enter your first Name"
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <Typography
                          mb={1}
                          variant="body1"
                          fontWeight={600}
                          color="initial"
                        >
                          Last Name
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          label=""
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);

                            setLastNameError(false);
                          }}
                          error={lastNameError}
                          helperText={
                            lastNameError ? "Last Name is required" : ""
                          }
                          placeholder="Enter your last name"
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid mt={3} container spacing={2}>
                      <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <Typography
                          mb={1}
                          variant="body1"
                          fontWeight={600}
                          color="initial"
                        >
                          Email
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          label=""
                          placeholder="example@email.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(false);
                          }}
                          error={emailError}
                          helperText={
                            emailError ? "Email is required or invalid" : ""
                          }
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <Typography
                          mb={1}
                          variant="body1"
                          fontWeight={600}
                          color="initial"
                        >
                          Phone Number
                        </Typography>
                        <InputMask
                          mask="+44 9999 999999"
                          maskChar=""
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError(false);
                          }}
                          value={phone}
                        >
                          {(inputProps) => (
                            <TextField
                              error={phoneError}
                              helperText={
                                phoneError ? "Phone Number is required" : ""
                              }
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
                              variant="standard"
                              fullWidth
                            />
                          )}
                        </InputMask>
                      </Grid>
                    </Grid>

                    <Box mt={3}>
                      <Typography
                        mb={1}
                        variant="body1"
                        fontWeight={600}
                        color="initial"
                      >
                        Message
                      </Typography>
                      <TextField
                        id="outlined-basic"
                        label=""
                        placeholder="Please provide a short description of your business and any questions you have about Designership design systems"
                        variant="outlined"
                        className="text-area"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          setIsDescriptionError(false);
                        }}
                        error={isDescriptionError}
                        helperText={
                          isDescriptionError ? "Message is required" : ""
                        }
                        multiline
                        rows={4}
                        fullWidth
                      />
                    </Box>
                    <Box className="contact-us-btn-wrapper" mt={3}>
                      <Box className="submit-btn-box">
                        <Button
                          variant="contained"
                          color="primary"
                          className="contact-us-btn"
                          onClick={() => {
                            contactUsFormValidation();
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                      <Typography
                        variant="body1"
                        className="contact-us-btn-right-desc"
                        color="initial"
                      >
                        By pressing the submit button, I agree to Vera
                        contacting me by email and/or phone to share
                        opportunities exclusively available to Select or
                        Enterprise customers. I also understand that any
                        information I’ve shared in this form is subject to Vera
                        Privacy Policy.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Container className="footer-container custom-container">
        <Grid container mb={3} spacing={2}>
          <Grid item xs={12} sm={6} lg={8} xl={8}>
            <VeraLogo />
            <Typography mt={1} variant="body1" color="initial">
              © 2023 Vera. All rights reserved.
            </Typography>
            <Typography
              variant="body1"
              mt={3}
              className="footer-atorney-link"
              color="initial"
              onClick={() => navigate("/signup")}
            >
              Join our attorney network <RedirectArrow />
            </Typography>
          </Grid>
          <Grid className="footer-list" item xs={6} sm={6} lg={2} xl={2}>
            <Typography
              className="footer-list-item-head"
              variant="subtitle1"
              color="initial"
            >
              Social
            </Typography>
            <Typography
              mt={1}
              variant="body1"
              className="footer-list-item"
              color="initial"
            >
              Facebook
            </Typography>
            <Typography
              mt={1}
              variant="body1"
              className="footer-list-item"
              color="initial"
            >
              Twitter
            </Typography>
            <Typography
              mt={1}
              variant="body1"
              className="footer-list-item"
              color="initial"
            >
              LinkedIn
            </Typography>
          </Grid>
          <Grid className="footer-list" item xs={6} sm={6} lg={2} xl={2}>
            <Typography
              variant="subtitle1"
              color="initial"
              className="footer-list-item-head"
            >
              Legal
            </Typography>
            <Typography
              mt={1}
              className="footer-list-item"
              variant="body1"
              color="initial"
            >
              Terms
            </Typography>
            <Typography
              mt={1}
              variant="body1"
              className="footer-list-item"
              color="initial"
            >
              Privacy
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <MessageModal
        open={feedbackDoneModal}
        onClose={setFeedbackDoneModal}
        title="Thank you for your message"
        content="We will get back to you shortly"
      />
    </>
  );
};

export default LandingPage;
