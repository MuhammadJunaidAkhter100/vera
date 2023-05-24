import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { IconButton } from "@mui/material";
import VeraButton from "../../../components/VeraButton";

// styles & assets
import styles from "./component.module.scss";
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload-icon.svg";
import { ReactComponent as Bin } from "../../../assets/icons/bin-icon.svg";

const UploadDoc = ({
  uploadShow,
  files,
  setFiles,
  setUploadShow,
  removeFile,
}) => {
  const handleClose = () => {
    setUploadShow(false);
  };

  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      //   setDragActive(true);
    } else if (e.type === "dragleave") {
      //  setDragActive(false);
      console.log("drag leave");
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    //    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles((files) => [...files, e.dataTransfer.files[0]]);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      setFiles((files) => [...files, e.target.files[0]]);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <Dialog
      open={uploadShow}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.uploadModal}
    >
      <DialogTitle id="alert-dialog-title">Upload Documents</DialogTitle>
      <input
        ref={inputRef}
        className={styles.inputFileUpload}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <DialogContent>
        <div
          className={styles.uploadWrapper}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadIcon />
          <h5>
            Drag & drop files or <u onClick={() => onButtonClick()}>Browse</u>
          </h5>
          <p>
            Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
          </p>
        </div>
        <Stack gap={1} className={styles.uploadedDoc}>
          <h5>Uploaded</h5>

          {files.length > 0
            ? files.map((file, index) => {
                return (
                  <div key={index} className={styles.item}>
                    {file.name}
                    <IconButton onClick={() => removeFile(file)}>
                      <Bin />
                    </IconButton>
                  </div>
                );
              })
            : "No files Uploaded"}
        </Stack>
      </DialogContent>
      <DialogActions>
        <VeraButton variant="contained" onClick={handleClose}>
          UPLOAD FILES
        </VeraButton>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDoc;
