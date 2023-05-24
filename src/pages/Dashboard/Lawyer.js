import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Stack,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { ReactComponent as Search } from "../../assets/dashboard/search.svg";
import Header from "../../components/Header";

import lawyerCardData from "./lawyerCardData.js";
// components
import VeraButton from "../../components/VeraButton";
import Card from "./components/Card";
import Filters from "./components/Filters";
import LawyerDataTable from "./components/LawyerDataTable";

// style
import styles from "./dashboard.module.scss";

const Lawyer = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (localStorage.getItem("LoggedInObj")) {
      const loggedInObj = JSON.parse(localStorage.getItem("LoggedInObj"));
      setUserData(loggedInObj);
    }
  }, []);

  return (
    <>
      <Header />
      <Container className={styles.pageWrapper}>
        <Stack className={`${styles.sectionHeader} ${styles.mb32}`} mb={4}>
          <h1 className={styles.pageTitle}>Welcome back, {userData?.name}</h1>
          <VeraButton
            variant="contained"
            icon={<AddIcon />}
            onClick={() => {
              navigate("/onboarding");
            }}
          >
            New Application
          </VeraButton>
        </Stack>
        <Grid container spacing={3} mb={4}>
          {lawyerCardData.map((el, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Card data={el} />
            </Grid>
          ))}
        </Grid>

        <h2 className={styles.pageSubtitle}>Current Jobs</h2>
        <Filters />
        <Stack className={styles.sectionHeader}>
          Jobs List
          <TextField
            className={styles.searchBar}
            id="application-search"
            placeholder="Search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LawyerDataTable />
      </Container>
    </>
  );
};

export default Lawyer;
