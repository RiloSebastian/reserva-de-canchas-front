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
  setOpenCancelReservationModal,
  reservationFeedback,
  updateRservationStatus,
}) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const handleClickOpen = () => {
    setOpenCancelReservationModal(true);
  };

  const handleClose = () => {
    setOpenCancelReservationModal(false);
  };

  const handleCancelReservation = () => {
    console.log("handleCancelReservation");
    console.log(reservationFeedback);

    updateRservationStatus(reservationFeedback.reservation_id);
    //setFeedbackSended(true);
    /* setReservationFeedback((prevState) => {
      return {
        ...prevState,
        feedbackSended: true,
      };
    }); */

    setOpenCancelReservationModal(false);
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
        <DialogContentText>
          ¿Estas seguro que desea cancelar la reserva?
        </DialogContentText>
        <Box sx={{ m: 1 }} />

        <Box sx={{ m: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No, Mantener Reserva</Button>
        <Button onClick={handleCancelReservation}>Si, Cancelar Reserva</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelReservationDialog;
