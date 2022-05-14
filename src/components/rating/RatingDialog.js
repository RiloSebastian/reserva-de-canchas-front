import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HoverRating from "./HoverRating";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        multiline: {
          fontWeight: 'bold',
          fontSize: '20px',
          color: 'purple',
          width: '50vw'
        }
      }
    }
  }


});

const RatingDialog = ({ open, setOpenFeedbackModal, reservationFeedback, updateFeedback }) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('sm');

  const handleClickOpen = () => {
    setOpenFeedbackModal(true);
  };

  const handleClose = () => {
    setOpenFeedbackModal(false);
  };

  const handleSendFeedback = () => {

    console.log("handleSendFeedback")
    console.log(reservationFeedback)

    updateFeedback(reservationFeedback.reservation_id);
    //setFeedbackSended(true);
    /* setReservationFeedback((prevState) => {
      return {
        ...prevState,
        feedbackSended: true,
      };
    }); */

    setOpenFeedbackModal(false);
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}>
      <DialogTitle>Dejanos tu Opinion </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Como calificarias la Institucion?
        </DialogContentText>
        <Box sx={{ m: 1 }} />

        <HoverRating />

        <Box sx={{ m: 2 }} />


        <DialogContentText>
          Tambien podes agregar un comentario
        </DialogContentText>
        <Box sx={{ m: 1 }} />
        <ThemeProvider theme={theme}>
          <TextField
            label="Dejanos tu comentario (Opcional)"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        </ThemeProvider>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSendFeedback}>Enviar Feedback</Button>
      </DialogActions>
    </Dialog>

  );
};

export default RatingDialog;
