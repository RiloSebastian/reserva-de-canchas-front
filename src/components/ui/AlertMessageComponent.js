import React from "react";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AlertMessageComponent = ({
  showMessageError,
  handleClose,
  errorMessage,
}) => {
  return (
    <Dialog
      open={showMessageError}
      onClose={handleClose}
      style={{ padding: "0px 0px 0px 0px" }}
    >
      <Alert onClose={handleClose} severity="error">
        <AlertTitle>Atencion!</AlertTitle>
        {errorMessage}
      </Alert>
    </Dialog>
  );
};

export default AlertMessageComponent;
