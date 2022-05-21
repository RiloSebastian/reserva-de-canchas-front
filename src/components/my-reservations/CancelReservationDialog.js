import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import AlertInformation from "./AlertInformation";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        multiline: {
          fontWeight: "bold",
          fontSize: "20px",
          color: "purple",
          width: "50vw",
        },
      },
    },
  },
});

const CancelReservationDialog = ({
  open,
  selectedReservation,
  setOpenCancelReservationModal,
  updateRervationStatus,
  setLoading,
}) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const handleClickOpen = () => {
    setOpenCancelReservationModal(true);
  };

  const handleClose = () => {
    setOpenCancelReservationModal(false);
    setLoading(false);
  };

  const handleCancelReservation = () => {
    console.log("handleCancelReservation");
    console.log(selectedReservation);

    updateRervationStatus(selectedReservation.reservation_id);
    //setFeedbackSended(true);
    /* setselectedReservation((prevState) => {
      return {
        ...prevState,
        feedbackSended: true,
      };
    }); */

    setOpenCancelReservationModal(false);
    setLoading(false);
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Cancelar Reserva </DialogTitle>
      <DialogContent>
        <AlertInformation returnableDeposit={selectedReservation && selectedReservation.returnableDeposit} />
        <Box sx={{ m: 1 }} />
        <Box sx={{ m: 2 }} />
        <DialogContentText>
          ¿Estas seguro que desea cancelar la reserva?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No, Mantener Reserva</Button>
        <Button onClick={handleCancelReservation}>Si, Cancelar Reserva</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelReservationDialog;
