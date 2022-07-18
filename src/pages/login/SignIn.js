import React, { useState, useEffect } from "react";
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
import {
  getByAdminEmail,
  getInstitutionSchedules,
  setInstitution,
} from "../../actions/institution";
import EmailService from "../../services/email/EmailService";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

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

  const [showMessageError, setShowMessageError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const handleUserInput = (e) => {
    console.log("handleUserInput");
    console.log(
      "[e.target.name]: " +
        [e.target.name] +
        " [e.target.value]: " +
        [e.target.value]
    );
    console.log("handleUserInput");

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

    try {
      const user = await AuthService.login(
        data.get("username"),
        data.get("password")
      ).then((data) => data);

      console.log("obteniendo info del login");
      console.log(user);

      const userRole = user.roles[0];
      switch (userRole) {
        case "ROLE_CUSTOMER":
          console.log("ROLE_CUSTOMER");
          history.push("/customer/home");
          break;
        case "ROLE_ADMIN":
          console.log("ROLE_ADMIN");

          //setear info de la institucion asociada
          console.log("Abrir dashboard");

          const institution = await InstitucionService.getByAdminEmail(
            user.email
          )
            .then((data) => data)
            .catch((err) => Promise.reject(err.response));
          console.log(
            "obteniendo la info de la institucion para dejarlo en el store"
          );

          console.log(institution);

          dispatch(setInstitution(institution));

          history.push("/dashboard/reservas");

          break;
        case "ROLE_EMPLOYEE":
          console.log("ROLE_EMPLOYEE");
          break;
        case "ROLE_COACH":
          console.log("ROLE_COACH");
          break;
        case "ROLE_SUPER_ADMIN":
          console.log("ROLE_SUPER_ADMIN");
          break;
        default:
          console.log(
            `Lo sentimos, no existen permisos para este rol > ${userRole}.`
          );
      }
    } catch (err) {
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

  useEffect(() => {
    console.log("ACTUALIZAR EL ESTADO DE LA CUENTA");
    if (accountState) {
      setOpenSnackbar({
        open: true,
        autoHideDuration: 6000,
        severity: "success",
        message:
          "Tu cuenta se encuentra habilidata. Ya podes ingresar con tu usuario y contraseña",
      });
    } else {
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
                  //onChange={handleChange('password')}
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
