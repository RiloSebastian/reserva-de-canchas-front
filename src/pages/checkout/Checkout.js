import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import PaymentService from "../../services/checkout/PaymentService";
import ReservationService from "../../services/reservations/ReservationService";
import { BASE_URL_CUSTOMERS } from "../routes";
import MisReservas from "./../usuarios/clientes/MisReservas";
import PaymentForm from "./PaymentForm";
import PreReview from "./PreReview";
import Review from "./Review";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import SnackbarAlertMessageComponent from "../../components/ui/SnackbarAlertMessageComponent";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Reserva Tu Cancha
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Tu Reserva", "Forma de Pago", "Confirme Su Reserva"];

const theme = createTheme();

const Checkout = () => {
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);

  const [validatedPaymentMethod, setValidatedPaymentMethod] = useState(false);

  const [reservation, setReservation] = useState(history.location.state);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const getStepContent = (step, reservation) => {
    console.log("step");
    console.log(step);
    switch (step) {
      case 0:
        return (
          <PreReview
            reservation={reservation}
            setReservation={setReservation}
          />
        );
      case 1:
        return (
          <PaymentForm
            setValidatedPaymentMethod={setValidatedPaymentMethod}
            setReservation={setReservation}
          />
        );
      case 2:
        return <Review reservation={reservation} />;
      case 3:
        return <MisReservas />;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      console.log("Show PreReview");

      setActiveStep(activeStep + 1);
    }

    if (activeStep === 1) {
      console.log("Validando Medio de Pago");
      handlePaymentValidation();
    }

    if (activeStep === steps.length - 1) {
      console.log("generar la reserva");

      const reservationCreated = createReservation(reservation);

      const data = reservationCreated;

      console.log("reserva generada");
      console.log(data);

      if (data) {
        //setActiveStep(activeStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    if (activeStep === 1) {
      setValidatedPaymentMethod(false);
    }
  };

  useEffect(() => {
    console.log("selected court");
    console.log(history.location.state);
  });

  const handleBackToHome = () => {
    let path = "/home";
    history.push(BASE_URL_CUSTOMERS.base + path);
  };

  const handleMisReservas = () => {
    let path = "/mis-reservas";
    history.push(BASE_URL_CUSTOMERS.base + path);
  };

  const handlePaymentValidation = async () => {
    console.log("mandando a validar el medio de pago");
    console.log(reservation.checkout);

    try {
      const validatedPaymentMethod = await PaymentService.validatePaymentMethod(
        reservation.checkout
      ).then((data) => data);

      console.log("DEVOLVIENDO VALIDAR MEDIO DE PAGO");
      console.log(validatedPaymentMethod);

      setOpenSnackbar({
        open: true,
        severity: "success",
        message: validatedPaymentMethod.message,
      });

      setActiveStep(activeStep + 1);
    } catch (error) {
      console.log("DEVOLVIENDO ERROR AL CHECKOUT");
      console.log(error);

      setOpenSnackbar({
        open: true,
        severity: "error",
        message: error.data.message,
      });
    }
  };

  const createReservation = async (newReservation) => {
    console.log("mandando los datos de la reserva para confirmarla");
    console.log(newReservation);
    try {
      const reservationCreated = await ReservationService.create(
        newReservation
      ).then((data) => data);

      //return reservationCreated;
      setActiveStep(activeStep + 1);
    } catch (error) {
      console.log("DEVOLVIENDO ERROR AL CONFIRMAR LA RESERVA");
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
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <br />
            <Alert severity="info">
              Recuerde que tiene 5 minutos desde que selecciono la cancha para
              confirmar la reserva si no se liberara el turno.
            </Alert>
            <br />
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Gracias Martiniano!
                  </Typography>
                  <Typography variant="subtitle1">
                    Tu Reserva ha sido Confirmada.
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBackToHome} sx={{ mt: 3, ml: 1 }}>
                        Volver al Inicio
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleMisReservas}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1
                        ? "Volver al Inicio"
                        : "Ir a Mis Reservas"}
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, reservation)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Atras
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      disabled={validatedPaymentMethod}
                    >
                      {activeStep === steps.length - 1
                        ? "Confirmar Reserva"
                        : "Siguiente"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
      <SnackbarAlertMessageComponent
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </>
  );
};

export default Checkout;
