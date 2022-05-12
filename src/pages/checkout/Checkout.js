import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import PreReview from "./PreReview";
import { useHistory } from "react-router-dom";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { green, grey, red } from "@mui/material/colors";
import MisReservas from "./../usuarios/clientes/MisReservas";
import { BASE_URL_CUSTOMERS } from "../routes";

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

const steps = ["Tu Reserva", "Forma de Pago", "Revise Su Reserva"];

function getStepContent(step, courtSelected) {
  console.log("step");
  console.log(step);
  switch (step) {
    case 0:
      return <PreReview reservation={courtSelected} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    case 3:
      return <MisReservas />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

const Checkout = () => {
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);

  const [courtSelected, setCourtSelected] = useState(history.location.state);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
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

  return (
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
                {getStepContent(activeStep, courtSelected)}
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
  );
};

export default Checkout;
