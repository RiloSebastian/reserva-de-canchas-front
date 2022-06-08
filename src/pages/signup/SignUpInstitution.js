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
import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import AppAppBar from "../home/modules/views/AppAppBar";
import { Link, useHistory } from "react-router-dom";
import InstitucionService from "../../services/instituciones/InstitucionService";

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

const SignUpInstitution = () => {
  let history = useHistory();

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [values, setValues] = useState({
    institutionName: "",
    address: "",
    phone: "",
    adminName: "",
    adminLastName: "",
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {

    if (event.target.name === "address") {
      console.info("Buscando geolocalizacion para " + event.target.value);
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
    else {
      console.info("Seteando datos para " + event.target.name);
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }


  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log("creando admin e institucion");
    console.log(data.entries());
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      horarioApertura: data.get("horarioApertura"),
    });

    try {
      const adminUser = await AuthService.register(
        data.get("firstName"),
        data.get("lastName"),
        data.get("role"),
        data.get("email"),
        data.get("password")
      )
        .then((data) => data)

      const institution = await AuthService.register(
        data.get("firstName"),
        data.get("lastName"),
        data.get("role"),
        data.get("email"),
        data.get("password")
      )
        .then((data) => data)

      history.push({
        pathname: "/account-confirmation",
        state: adminUser,
      })

    } catch (err) {

      console.error("error al crear admin e institucion")

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
                          id="institutionName"
                          label="Nombre de la Institucion"
                          name="institutionName"
                          autoComplete="Nombre de la Institucion"
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>

                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                      Direccion
                    </Typography>

                    <TextField
                      autoComplete="given-name"
                      name="address"
                      required
                      fullWidth
                      id="address"
                      label="Direccion de la Institucion"
                      onChange={handleChange}
                    />

                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                      Telefono
                    </Typography>

                    <TextField
                      autoComplete="given-name"
                      name="phone"
                      required
                      fullWidth
                      id="phone"
                      label="Telefono de la Institucion"
                      onChange={handleChange}
                    />
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
                                autoComplete="email"
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                required
                                fullWidth
                                name="password"
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

      <Dialog
        fullWidth={true}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogContent sx={{ padding: 0 }}>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert onClose={handleClose} severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              No se ha podido registrar el usuario !
            </Alert>
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SignUpInstitution;
