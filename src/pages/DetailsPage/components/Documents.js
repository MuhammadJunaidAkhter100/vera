import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import VeraButton from "../../../components/VeraButton";
import UploadDoc from "./UploadDoc";

// styles
import { ReactComponent as Bin } from "../../../assets/icons/bin-icon.svg";
import styles from "./component.module.scss";

const Documents = () => {
  const [uploadShow, setUploadShow] = useState(false);
  const [files, setFiles] = useState([]);
  const removeFile = (existingFile) => {
    const newFiles = files.filter((file) => file.name !== existingFile.name);
    setFiles(newFiles);
  };
  return (
    <>
      <Grid container>
        <Grid
          item
          sm={12}
          md={6}
          className={`${styles.taskList} ${styles.documents}`}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <h4>Documents</h4>
            <VeraButton variant="text" onClick={() => setUploadShow(true)}>
              Add Documents
            </VeraButton>
          </Stack>
          <Stack gap={1} className={styles.uploadedDoc}>
            <h5>Uploaded</h5>

            {files.length > 0
              ? files.map((file) => {
                  return (
                    <div className={styles.item}>
                      {file.name}
                      <IconButton onClick={() => removeFile(file)}>
                        <Bin />
                      </IconButton>
                    </div>
                  );
                })
              : "No files uploaded"}
          </Stack>
        </Grid>
      </Grid>
      <UploadDoc
        removeFile={removeFile}
        uploadShow={uploadShow}
        files={files}
        setFiles={setFiles}
        setUploadShow={setUploadShow}
      />
    </>
  );
};

export default Documents;
