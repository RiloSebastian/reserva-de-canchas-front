import React, { useState, useReducer, Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import HoverRating from "./HoverRating";
import FeedbackService from "../../services/feedbacks/FeedbackService";
import SnackbarAlertMessageComponent from "./../ui/SnackbarAlertMessageComponent";

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

const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "rating":
      return { ...state, rating: action.data };
    case "review":
      return { ...state, review: action.data };
    case "reviewerEmail":
      return { ...state, reviewerEmail: action.data };
    case "courtId":
      return { ...state, courtId: action.data };
    default:
      return state;
  }
};

const RatingDialog = ({
  open,
  setOpenFeedbackModal,
  reservationFeedback,
  updateFeedback,
}) => {
  const [feedback, dispatch] = useReducer(reducer, {
    rating: "",
    review: "",
    courtId: "",
    reviewerEmail: "",
  });
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const handleClickOpen = () => {
    setOpenFeedbackModal(true);
  };

  const handleClose = () => {
    setOpenFeedbackModal(false);
  };

  const handleChange = (e) => {
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const handleSendFeedback = async () => {
    console.log("handleSendFeedback");
    console.log(reservationFeedback);

    dispatch({ type: "courtId", data: reservationFeedback.court_id });

    try {
      console.log("ENVIANDO FEEDBACK...");
      console.log(feedback);
      const feedBackSended = await FeedbackService.create(feedback).then(
        (data) => data
      );
      updateFeedback(reservationFeedback.reservation_id);
      setOpenSnackbar({
        open: true,
        severity: "success",
        message: "Muchas Gracias! El Feedback ha sigo Enviado!",
      });
    } catch (error) {
      console.log("MANEJANDO EL ERROR AL ENVIAR FEEDBACK");
      console.log(error);
      setOpenSnackbar({
        open: true,
        severity: "error",
        message: Object.values(error.data).map((error, idx) => (
          <Fragment key={error}>
            {<br />}
            {error}
            {<br />}
          </Fragment>
        )),
      });
    }

    //setFeedbackSended(true);
    /* setReservationFeedback((prevState) => {
      return {
        ...prevState,
        feedbackSended: true,
      };
    }); */

    setOpenFeedbackModal(false);
  };

  useEffect(() => {
    console.log("reservationFeedback data");
    console.log(reservationFeedback);
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: "reviewerEmail", data: user.email });
  }, []);

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Dejanos tu Opinion </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Como calificarias la Institucion?
          </DialogContentText>
          <Box sx={{ m: 1 }} />

          <HoverRating handleChange={handleChange} dispatch={dispatch} />

          <Box sx={{ m: 2 }} />

          <DialogContentText>
            Tambien podes agregar un comentario
          </DialogContentText>
          <Box sx={{ m: 1 }} />
          <ThemeProvider theme={theme}>
            <TextField
              name="review"
              label="Dejanos tu comentario (Opcional)"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSendFeedback}>Enviar Feedback</Button>
        </DialogActions>
      </Dialog>
      <SnackbarAlertMessageComponent
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </>
  );
};

export default RatingDialog;
