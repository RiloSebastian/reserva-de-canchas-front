import React, { Fragment, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AppAppBar from "../home/modules/views/AppAppBar";
import AlertMessageComponent from "../../components/ui/AlertMessageComponent";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import EmailService from "../../services/email/EmailService";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import es from "react-phone-input-2/lang/es.json";
import ar from "react-phone-input-2/lang/ar.json";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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

const SignUp = () => {
  let history = useHistory();

  const theme = useTheme();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userRole: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    telephone: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userRole: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    telephone: "",
  });

  const [showMessageError, setShowMessageError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleMessageError = (message) => {
    setErrorMessage(message);
  };

  const handleClose = () => {
    setShowMessageError(false);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value || value.trim() === "") {
          return "Nombre es Requerido";
        } else {
          return "";
        }
      case "lastName":
        if (!value || value.trim() === "") {
          return "Apellido es Requerido";
        } else {
          return "";
        }
      case "email":
        if (!value) {
          return "Email es Requerido";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Introduzca una dirección de correo electrónico válida";
        } else {
          return "";
        }
      /* case "mobile":
        if (!value || value.trim() === "") {
          return "Mobile number is Required";
        } else if (!value.match(/^[6-9]\d{9}$/)) {
          return "Enter a valid mobile number.";
        } else {
          return "";
        } */
      case "telephone":
        if (!value) {
          return "Número de Telefono es Requerido";
        } else if (
          !value.match(/^[+]?[(]?[0-9]{1,4}[)]?[\s]?[0-9]{4}[-]?[0-9]{4}$/)
        ) {
          return "Introduce un número de Teléfono válido.";
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
      case "confirmPassword":
        if (!value) {
          return "Confirmar Contraseña es requerido";
        } else if (value !== values.password) {
          return "Nueva contraseña y Confirmar Contraseña deben ser Iguales";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
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

  const handleOnChange = (value) => {
    console.log("Actualizando numero de telefono");
    console.log("[telephone]: ");
    console.log(value.toString());

    setErrors((prevState) => {
      return {
        ...prevState,
        telephone: validate("telephone", value.toString()),
      };
    });
    setValues((prevState) => {
      return {
        ...prevState,
        telephone: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validar la DATA

    let validationErrors = {};

    Object.keys(values).forEach((name) => {
      const error = validate(name, values[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors({ errors: validationErrors });
      return;
    }
    if (values.firstName && values.email && values.password) {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        userRole: "ROLE_CUSTOMER",
        telephone: "(11)4252-6997",
      };

      console.log("----data----", data);

      try {
        const registerUser = await AuthService.register(
          data.firstName,
          data.lastName,
          data.userRole,
          data.email,
          data.password,
          data.telephone
        ).then((data) => data);

        console.log("usuario Creado");
        console.log(registerUser);

        //pegarle al endpoint email async

        const emailSended = await EmailService.sendVerificationEmail(
          registerUser.email
        ).then((data) => data);

        history.push({
          pathname: "/account-confirmation",
          state: registerUser,
        });
      } catch (err) {
        console.error("error al registrar usuario");
        console.log(err);

        handleMessageError(
          Object.values(err.data).map((error, idx) => (
            <Fragment key={error}>
              {<br />}
              {error}
              {<br />}
            </Fragment>
          ))
        );
        setShowMessageError(true);
      }
    }

    return;
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
            <Typography component="h1" variant="h5">
              Registrate
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    onChange={handleUserInput}
                    onBlur={handleUserInput}
                    helperText={errors.firstName}
                    error={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleUserInput}
                    onBlur={handleUserInput}
                    helperText={errors.lastName}
                    error={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    inputStyle={{
                      width: "100%",
                      height: "54px",
                      fontSize: "18px",
                      paddingLeft: "48px",
                      borderRadius: "5px",
                    }}
                    placeholder="+54 (11) 1234-1234"
                    value={values.telephone}
                    localization={ar}
                    country="ar"
                    enableAreaCodes={["ar"]}
                    enableAreaCodeStretch={true}
                    onlyCountries={["ar"]}
                    preferredCountries={["ar"]}
                    preserveOrder={["onlyCountries", "preferredCountries"]}
                    masks={{ ar: "(..) ....-...." }}
                    onChange={handleOnChange}
                    isValid={(value, country) => {
                      if (errors.telephone !== "") {
                        return (
                          "Numero Invalido: " + value + ", " + country.name
                        );
                      } else {
                        return true;
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo Electronico"
                    name="email"
                    autoComplete="email"
                    onChange={handleUserInput}
                    onBlur={handleUserInput}
                    helperText={errors.email}
                    error={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={errors.password}
                    fullWidth
                    variant="outlined"
                  >
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={errors.confirmPassword}
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel required htmlFor="outlined-adornment-password">
                      Confirmar Contraseña
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showConfirmPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={handleUserInput}
                      onBlur={handleUserInput}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirmar Contraseña"
                      name="confirmPassword"
                    />
                    <FormHelperText>{errors.confirmPassword}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <TextField
                sx={{ mt: 3, mb: 2 }}
                name="userRole"
                id="userRole"
                value="ROLE_CUSTOMER"
                type="hidden"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Ya tenes una Cuenta? Inicia Sesion
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
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

export default SignUp;
