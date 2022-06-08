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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
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

  const [showMessageError, setShowMessageError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleMessageError = (message) => {
    setErrorMessage(message)
  }


  const handleClose = () => {
    setShowMessageError(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    /*  console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    localStorage.setItem(
        "user",
        JSON.stringify({
          roles: ["ROLE_ADMIN"],
        })
      );

      history.push("/dashboard/reservas");  */

    /* localStorage.setItem(
        "user",
        JSON.stringify({
          roles: ["ROLE_CUSTOMER"],
        })
      );

      history.push("/customer/home"); */


    try {
      const user = await AuthService.login(
        data.get("username"),
        data.get("password")
      ).then((data) => data)

      console.log(user);

      if (user.roles[0] === "ROLE_CUSTOMER") {
        history.push("/customer/home");
      } else {
        history.push("/dashboard/reservas");
      }
    } catch (err) {
      console.error("error al obtener usuario");
      console.log(err);

      handleMessageError(err.data.error);
      setShowMessageError(true);
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
              {/*<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
          />*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ ...rightLink.color, mt: 3, mb: 2 }}
              >
                {"Iniciar Sesion"}
              </Button>
              <Grid container>
                {/*<Grid item xs>
                  <Link to="/forgot-pass" variant="body2">
                    Olvidaste la Contraseña?
                  </Link>
        </Grid>*/}
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
      <Dialog
        open={showMessageError}
        onClose={handleClose}
        style={{ padding: '0px 0px 0px 0px' }}
      >
        <Alert onClose={handleClose} severity="error">
          <AlertTitle >Atencion!</AlertTitle>
          {errorMessage}
        </Alert>
      </Dialog>
    </React.Fragment>
  );
};

export default SignIn;
