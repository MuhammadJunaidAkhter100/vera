import React from "react";

// styles
import styles from "./component.module.scss";
import Typography from "@mui/material/Typography";

const Description = ({ data }) => {
  return (
    <div className={styles.taskList}>
      <h4>Description</h4>
      <Typography variant="body1" color="initial">
        {data}
      </Typography>
    </div>
  );
};

export default Description;
