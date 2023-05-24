import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Stack,
  InputAdornment,
  Box,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { ReactComponent as Search } from "../../assets/dashboard/search.svg";
import Header from "../../components/Header";

import cardData from "./cardData";
// components
import VeraButton from "../../components/VeraButton";
import Card from "./components/Card";
// import Filters from "./components/Filters";
import DataTable from "./components/DataTable";
import TasksDataTable from "./components/TasksDataTable";
import AddNewTaskModal from "./components/AddNewTaskModal";

// style
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  // const [currentJobs, setCurrentJobs] = useState("alljobs");

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
              navigate("/onboarding?dashboard=true");
            }}
          >
            New Application
          </VeraButton>
        </Stack>
        <Grid container spacing={3} mb={4}>
          {cardData.map((el, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <Card data={el} />
            </Grid>
          ))}
        </Grid>

        {/* <h2 className={styles.pageSubtitle}>All Jobs</h2> */}

        {/* <Filters currentJobs={currentJobs} setCurrentJobs={setCurrentJobs} /> */}

        <>
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

          <DataTable />
        </>

        {/* <h2 className={styles.pageSubtitle}>All Tasks</h2> */}

        <Box mt={4} className={styles.taskBtnWrapper}>
          <VeraButton
            variant="contained"
            icon={<AddIcon />}
            onClick={() => {
              setIsTaskModalOpen(true);
            }}
          >
            Add New Task
          </VeraButton>
        </Box>

        <>
          <Stack mt={4} className={styles.sectionHeader}>
            Tasks List
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
          <TasksDataTable />
        </>
      </Container>
      <AddNewTaskModal open={isTaskModalOpen} setOpen={setIsTaskModalOpen} />
    </>
  );
};

export default Dashboard;
