import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  Fragment,
} from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AuthService from "../../services/auth.service";
import AppAppBar from "../home/modules/views/AppAppBar";
import { Link, useHistory } from "react-router-dom";
import InstitucionService from "../../services/instituciones/InstitucionService";
import GeoLocalizacionService from "../../services/geolocalizacion/GeoLocalizacionService";
import ComboBox from "../../components/ui/ComboBox";
import AlertMessageComponent from "../../components/ui/AlertMessageComponent";

const themeTextArea = createTheme({
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

/* const reducer = (state, action) => {
  console.log("action", action.data);
  switch (action.type) {
    case "institutionTel":
      return { ...state, institutionTel: formatTelephoneNumber(action.data) };
    case "expDate":
      return { ...state, expDate: formatExpirationDate(action.data) };
    case "securityCode": {
      console.log("securityCode", action.data);
      return { ...state, securityCode: formatCVC(action.data) };
    }
    case "cardOwner":
      return { ...state, cardOwner: action.data };
    default:
      return state;
  }
}; */

const SignUpInstitution = () => {
  let history = useHistory();

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [showMessageError, setShowMessageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userRole: "ROLE_ADMIN",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [institutionData, setInstitutionData] = useState({
    name: "",
    address: {
      geometry: {
        coordinates: ["", ""],
        type: "Point",
      },
      langAddress: "",
    },
    institutionTel: "",
    description: "",
  });

  const [open, setOpen] = useState(false);

  const [addressObtained, setAddressObtained] = useState([]);

  const handleClose = () => {
    setShowMessageError(false);
  };

  const handleMessageError = (message) => {
    setErrorMessage(message);
  };

  const handleInstitutionChange = async (event) => {
    console.info("Seteando datos de la institucion");
    console.info("Seteando datos para " + event.target.name);
    setInstitutionData({
      ...institutionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = async (event) => {
    console.info("Seteando datos del admin ");
    console.info("Seteando datos para " + event.target.name);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log("creando admin e institucion");
    console.log(values);

    try {
      const adminUser = await AuthService.register(
        values.firstName,
        values.lastName,
        values.userRole,
        values.email,
        values.password,
      ).then((data) => data);

      const managers = [adminUser.email];

      const data = { ...institutionData, managers };

      console.log("enviando datos de la institucion");
      console.log(data);

      const institution = await InstitucionService.create(data).then((data) => data);

      history.push({
        pathname: "/account-confirmation",
        state: values.firstName,
      });
    } catch (err) {
      console.error("error al crear admin e institucion");
      console.error(err);

      if (err.data === undefined || err.data === null) {

        handleMessageError(
          Object.values(err).map((error, idx) => (
            <Fragment key={error}>
              {<br />}
              {error}
              {<br />}
            </Fragment>
          ))
        );

      } else {
        handleMessageError(
          Object.values(err.data).map((error, idx) => (
            <Fragment key={error}>
              {<br />}
              {error}
              {<br />}
            </Fragment>
          ))
        );
      }



      setShowMessageError(true);
    }
  };

  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
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
              Registra tu Club
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Box>
                <Box display="flex">
                  <Box flex={1} mr="1em">
                    <Typography variant="h6" gutterBottom>
                      Institucion
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          value={institutionData.name}
                          id="name"
                          label="Nombre de la Institucion"
                          name="name"
                          autoComplete="Nombre de la Institucion"
                          onChange={handleInstitutionChange}
                        />
                      </Grid>
                    </Grid>

                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                      Direccion
                    </Typography>

                    <ComboBox
                      autoComplete="given-name"
                      name="address"
                      required
                      fullWidth
                      id="address"
                      label="Direccion de la Institucion"
                      institutionData={institutionData}
                      setInstitutionData={setInstitutionData}
                    />

                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                      Telefono
                    </Typography>

                    <TextField
                      autoComplete="given-name"
                      name="institutionTel"
                      value={institutionData.institutionTel}
                      required
                      fullWidth
                      id="institutionTel"
                      label="Telefono de la Institucion"
                      onChange={handleInstitutionChange}
                    />
                    <Box sx={{ m: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Descripcion
                    </Typography>

                    <ThemeProvider theme={themeTextArea}>
                      <TextField
                        autoComplete="given-name"
                        multiline
                        rows={5}
                        name="description"
                        value={institutionData.description}
                        required
                        variant="outlined"
                        fullWidth
                        id="description"
                        label="Dejanos una breve descripcion de la Institucion"
                        onChange={handleInstitutionChange}
                      />
                    </ThemeProvider>
                  </Box>

                  <Box flex={1} ml="1em">
                    <Box display="flex">
                      <Box flex={2} mr="1em">
                        <Typography variant="h6" gutterBottom>
                          Administrador
                        </Typography>
                        <Box>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                autoComplete="given-name"
                                name="firstName"
                                value={values.firstName}
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                value={values.lastName}
                                autoComplete="family-name"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                id="email"
                                label="Correo Electronico"
                                name="email"
                                value={values.email}
                                autoComplete="email"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="password"
                                value={values.password}
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="confirmpassword"
                                value={values.confirmpassword}
                                label="Confirmar Contraseña"
                                type="password"
                                id="confirmpassword"
                                autoComplete="new-password"
                                onChange={handleChange}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Toolbar>
                <TextField
                  name="role"
                  id="role"
                  value="ROLE_ADMIN"
                  type="hidden"
                />
                <Box
                  sx={{ padding: 0 }}
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  <LoadingButton
                    fullWidth
                    color="secondary"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    type="submit"
                  >
                    Registrar Institucion
                  </LoadingButton>
                </Box>
              </Toolbar>
              <Grid container justifyContent="flex-start">
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

export default SignUpInstitution;
