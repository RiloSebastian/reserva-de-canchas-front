import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import AppAppBar from "./../home/modules/views/AppAppBar";
import AuthService from "../../services/auth.service";

import AlertMessageComponent from "../../components/ui/AlertMessageComponent";
import InstitucionService from "../../services/instituciones/InstitucionService";
import { useDispatch } from "react-redux";
import { getByAdminEmail } from "../../actions/institution";
import EmailService from "../../services/email/EmailService";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to={"#"}>
        RESERVA TU CANCHA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

const SignIn = (props) => {
  let history = useHistory();

  const dispatch = useDispatch();

  const [showMessageError, setShowMessageError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleMessageError = (message) => {
    setErrorMessage(message);
  };

  const handleClose = () => {
    setShowMessageError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const user = await AuthService.login(
        data.get("username"),
        data.get("password")
      ).then((data) => data);

      console.log("obteniendo info del login");
      console.log(user);

      if (user.roles[0] === "ROLE_CUSTOMER") {
        history.push("/customer/home");
      } else {
        //setear info de la institucion asociada

        try {
          console.log("Abrir dashboard");

          console.log(
            "obteniendo la info de la institucion para dejarlo en el store"
          );

          const institution = dispatch(getByAdminEmail(data.get("username")));

          console.log(institution);

          history.push("/dashboard/reservas");
        } catch (error) {
          console.log("Catcheando el error de la institucion");
          console.log(error);
        }
      }
    } catch (err) {
      console.error("error al obtener usuario");
      console.log(err);

      if (err.data.error === "Esta cuenta no esta habilitada") {
        //Renviar link de confirmacion
        console.error("La cuenta no esta habilidata - reenviar correo");

        try {
          const emailReSended = await EmailService.sendVerificationEmail(
            data.get("username")
          ).then((data) => data);

          handleMessageError(
            `${err.data.error}. Por Favor, Revisa tu correo y hace Click en el link que te enviamos para habilitar tu cuenta`
          );
          setShowMessageError(true);
        } catch (error) {
          handleMessageError(
            `${err.data.error}. Por Favor, Revisa tu correo y hace Click en el link que te enviamos para habilitar tu cuenta`
          );
          setShowMessageError(true);
        }
      } else {
        handleMessageError(err.data.error);
        setShowMessageError(true);
      }
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ ...rightLink.color }} component="h1" variant="h5">
              {"Iniciar Sesion"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario/Correo Electronico"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ ...rightLink.color, mt: 3, mb: 2 }}
              >
                {"Iniciar Sesion"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Aun no tienes una Cuenta? Registrarse"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <AlertMessageComponent
        showMessageError={showMessageError}
        handleClose={handleClose}
        errorMessage={errorMessage}
      />
    </React.Fragment>
  );
};

export default SignIn;
