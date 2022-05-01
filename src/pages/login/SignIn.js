import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import withRoot from "./../home/modules/withRoot";
import AppAppBar from "./../home/modules/views/AppAppBar";
import { green, grey, red } from "@mui/material/colors";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    /*const user = await AuthService.login(
      data.get("username"),
      data.get("password")
    ).then((data) => data);

    console.log(user.roles[0]);

    if (user.roles[0] === "ROLE_CUSTOMER") {
      history.push("/dashboard/home");
    } else {
      history.push("/dashboard/reservas");
    }*/
    AuthService.login(data.get("username"), data.get("password")).then(
      (data) => {
        console.log(data);
        if (data.roles[0] === "ROLE_CUSTOMER") {
          history.push({
            pathname: "/dashboard/home",
            state: "data sended",
          });
        } else {
          history.push({
            pathname: "/dashboard/reservas",
            state: "data sended",
          });
        }
      }
    );
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
    </React.Fragment>
  );
};

export default SignIn;
