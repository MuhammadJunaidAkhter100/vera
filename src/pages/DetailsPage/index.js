import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import { ReactComponent as Back } from "../../assets/icons/arrow-right.svg";
import Header from "../../components/Header";
import VeraButton from "../../components/VeraButton";

import Documents from "./components/Documents";

import Description from "./components/Description";
import axios from "axios";
import ChatBox from "../../components/Chat";

import Player from "../../components/Player";

// style & Assets
import styles from "./details.module.scss";

const DetailsPage = () => {
  const navigate = useNavigate();
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);

  const [data, setData] = useState(null);

  const getData = async (caseId) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}api/auth/case/${caseId}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const caseId = params.get("caseId");
    getData(caseId);
  }, []);

  return (
    <>
      {console.log("recordedAudioURL", recordedAudioURL)}
      <Header />
      <Grid container className={styles.mainWrapper}>
        <Grid item md={9} className={styles.details}>
          <div className={styles.header}>
            <div className={styles.actions}>
              <h3>
                <Back
                  className={styles.back}
                  onClick={() => navigate("/dashboard")}
                />
                Application Details
              </h3>
              <div className={styles.buttons}>
                <VeraButton variant="outlined">Contact Vera</VeraButton>
              </div>
            </div>
            <div className={styles.job}>
              <b>Job:</b> {data?.category}
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <div className={styles.info}>
              <label>Query Received Date</label>
              {data?.created_at}
            </div>
            <div className={styles.info}>
              <label>Due Date</label>
              {data?.appointment}
            </div>
            <div className={styles.info}>
              <label>Stage</label>
              {data?.status}
            </div>
            <div className={styles.info}>
              <label>Total Fee</label>
              20000$
            </div>
          </div>
          {data?.description && <Description data={data?.description} />}
          {data?.voice_note && (
            <Box my={3}>
              <Player
                recordedAudio={setRecordedAudioURL}
                audioURL={data?.voice_note}
              />
            </Box>
          )}

          <Documents />
        </Grid>
        <Grid item md={3} className={styles.chat}>
          <ChatBox />
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsPage;
