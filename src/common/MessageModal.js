import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";

import Box from "@mui/material/Box";
import { Markup } from "interweave";
import "./common.scss";
const MessageModal = ({ open, title, content, onClose, error, timeOut }) => {
  useEffect(() => {
    if (open) {
      setTimeout(
        () => {
          onClose(false);
        },
        timeOut ? timeOut : 3000
      );
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <Dialog
      className="vera-success-modal"
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => onClose(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={error && "error"}>
        {title}
        <IconButton
          edge="start"
          sx={{ color: "white" }}
          onClick={() => onClose(false)}
          aria-label="close"
        >
          x{/* <CloseCircleOutlined /> */}
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box className="delete-content">
            <Markup content={content} />
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
