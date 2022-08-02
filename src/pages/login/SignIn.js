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
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AppAppBar from "./../home/modules/views/AppAppBar";

import { useDispatch } from "react-redux";
import AlertMessageComponent from "../../components/ui/AlertMessageComponent";
import EmailService from "../../services/email/EmailService";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import { login, logout, retrieveUser } from "../../actions/auth";
import { retrieveInstitutionByAdmainEmail } from "../../actions/institution";
import { retrieveCourts } from "../../actions/court";
import { retrieveInstitutionReservations } from "../../actions/reservations";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const [accountState, setAccountState] = useState(history.location.state);

  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "username":
        if (!value) {
          return "Email es Requerido";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Introduzca una dirección de correo electrónico válida";
        } else {
          return "";
        }
      case "password":
        if (!value) {
          return "La Contraseña es Requerida";
        } else if (value.length < 6) {
          return "Por favor complete con al menos 6 caracteres";
        } else if (!value.match(/[a-z]/g)) {
          return "Por favor, Ingrese al menos una minúscula.";
        } else if (!value.match(/[A-Z]/g)) {
          return "Por favor, Ingrese al menos una mayúscula.";
        } else if (!value.match(/[0-9]/g)) {
          return "Por favor, Ingrese al menos valor numérico.";
        } else if (!value.match(/[!@#&:;'.,?_/*~$^=<>\(\)–\[\{}\]\+]/g)) {
          return "Por favor, Ingrese al menos un caracter especial.";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [showMessageError, setShowMessageError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const handleUserInput = (e) => {
    setErrors((prevState) => {
      return {
        ...prevState,
        [e.target.name]: validate(e.target.name, e.target.value),
      };
    });
    setValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMessageError = (message) => {
    setErrorMessage(message);
  };

  const handleClose = () => {
    setShowMessageError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(login(data.get("username"), data.get("password")))
      .then((user) => {
        dispatch(retrieveUser(user.id));
        const userRole = user.roles[0];
        switch (userRole) {
          case "ROLE_CUSTOMER":
            console.log("ROLE_CUSTOMER");
            history.push("/customer/home");
            break;
          case "ROLE_ADMIN":
            console.log("ROLE_ADMIN");

            return dispatch(retrieveInstitutionByAdmainEmail(user.email))
              .then((data) => {
                return dispatch(retrieveCourts(data.id))
                  .then((data) => {
                    console.log("Abrir dashboard");
                    history.push("/dashboard/reservas");
                  })
                  .catch((err) => {
                    console.log("Abrir dashboard");
                    history.push("/dashboard/reservas");
                    //dispatch(logout());
                    //return Promise.reject(err);
                  });
              })
              .catch((err) => {
                if (err.status === 404) {
                  handleMessageError(err.data.message);
                  setShowMessageError(true);
                }
                dispatch(logout());
                return Promise.reject(err);
              });

            break;
          case "ROLE_EMPLOYEE":
            console.log("ROLE_EMPLOYEE");
            dispatch(retrieveInstitutionByAdmainEmail(user.id));

            console.log("Abrir dashboard");
            history.push("/dashboard/reservas");
            break;
          case "ROLE_COACH":
            console.log("ROLE_COACH");
            return dispatch(retrieveInstitutionByAdmainEmail(user.email))
              .then((data) => {
                return dispatch(retrieveCourts(data.id))
                  .then((data) => {
                    console.log("Abrir dashboard");
                    history.push("/dashboard/reservas");
                  })
                  .catch((err) => {
                    console.log("Abrir dashboard");
                    history.push("/dashboard/reservas");
                    //dispatch(logout());
                    //return Promise.reject(err);
                  });
              })
              .catch((err) => {
                if (err.status === 404) {
                  handleMessageError(err.data.message);
                  setShowMessageError(true);
                }
                dispatch(logout());
                return Promise.reject(err);
              });
            break;
          case "ROLE_SUPER_ADMIN":
            console.log("ROLE_SUPER_ADMIN");
            break;
          default:
            console.log(
              `Lo sentimos, no existen permisos para este rol > ${userRole}.`
            );
        }
      })
      .catch(async (err) => {
        setLoading(false);
        console.error("error al obtener usuario");
        console.log(err);

        if (err.status === 404) {
          handleMessageError(err.data.message);
          setShowMessageError(true);
        } else if (err.data.error === "Esta cuenta no esta habilitada") {
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
              `${err.data.error}. Hubo un error al enviar tu correo de confirmacion, por favor intenta mas tarde`
            );
            setShowMessageError(true);
          }
        } else {
          handleMessageError(err.data.error);
          setShowMessageError(true);
        }
      });
  };

  useEffect(() => {
    console.log("ACTUALIZAR EL ESTADO DE LA CUENTA");
    setAccountState(undefined);
    if (accountState !== undefined) {
      if (accountState.accountEnable) {
        setOpenSnackbar({
          open: true,
          autoHideDuration: 10000,
          severity: "success",
          message:
            "Tu cuenta se encuentra habilidata. Ya podes ingresar con tu usuario y contraseña",
        });
      } else if (!accountState.accountEnable) {
        setOpenSnackbar({
          open: true,
          autoHideDuration: 10000,
          severity: "error",
          message:
            "Tu cuenta aun no ha sido habilidata. Hubo un error al enviar tu correo de confirmacion, por favor intenta mas tarde",
        });
      }
    }
  }, [accountState]);

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
                value={values.username}
                onChange={handleUserInput}
                onBlur={handleUserInput}
                helperText={errors.username}
                error={errors.username}
              />
              <FormControl error={errors.password} fullWidth variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleUserInput}
                  onBlur={handleUserInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                  name="password"
                />
                <FormHelperText>{errors.password}</FormHelperText>
              </FormControl>
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
      <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            autoHideDuration={openSnackbar.autoHideDuration}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={openSnackbar.open}
            onClose={handleCloseSnackbar}
          >
            <Alert
              severity={openSnackbar.severity}
              onClose={handleCloseSnackbar}
              sx={{ width: "100%" }}
            >
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
