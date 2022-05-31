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
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AppAppBar from "../home/modules/views/AppAppBar";

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

const tiposDeUsuarios = [
  {
    key: "ROLE_CUSTOMER",
    name: "Cliente",
  },
  {
    key: "ROLE_ADMIN",
    name: "Administrador de Institucion",
  },
];

function getStyles(name, tipoUsuario, theme) {
  return {
    fontWeight:
      tipoUsuario.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [tipoUsuario, setTipoUsuario] = useState([]);

  const [open, setOpen] = useState(false);

  const [openInstitution, setOpenInstitution] = useState(
    new Date("2014-08-18T08:00:00")
  );
  const [closeInstitution, setCloseInstitution] = useState(
    new Date("2014-08-18T23:00:00")
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    console.log(event.target);
    setTipoUsuario(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      horarioApertura: data.get("horarioApertura"),
    });

    AuthService.register(
      data.get("firstName"),
      data.get("lastName"),
      data.get("tipoUsuario"),
      data.get("email"),
      data.get("password")
    )
      .then(
        //TODO: agregar redireccionamiento para confirmar la cuenta 
      )
      .catch(function (rej) {
        //here when you reject the promise
        console.log(rej);
        handleOpen();
      });
  };

  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }

  const handleChangeOpen = (newValue) => {
    setOpenInstitution(newValue);
  };

  const handleChangeClose = (newValue) => {
    setCloseInstitution(newValue);
  };

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
                    />

                    <Box mt="1em" />

                    <Typography variant="h6" gutterBottom>
                      Horarios de la institucion
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box display="flex">
                        <Box flex={1} mr="0.5em">
                          <Stack spacing={3}>
                            <TimePicker
                              label="Horario Apertura"
                              name="horarioApertura"
                              value={openInstitution}
                              onChange={handleChangeOpen}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Stack>
                        </Box>
                        <Box flex={1} ml="0.5em">
                          <Stack spacing={3}>
                            <TimePicker
                              label="Horario Clausura"
                              name="horarioClausura"
                              value={closeInstitution}
                              onChange={handleChangeClose}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Stack>
                        </Box>
                      </Box>
                    </LocalizationProvider>
                  </Box>

                  <Box flex={1} ml="1em">
                    <Box display="flex">
                      <Box flex={2} mr="1em">
                        <Typography variant="h6" gutterBottom>
                          Administrador
                        </Typography>
                        <Box
                          component="form"
                          noValidate
                          onSubmit={handleSubmit}
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
                <Box
                  sx={{ padding: 0 }}
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                >
                  <LoadingButton
                    fullWidth
                    color="secondary"
                    onClick={handleSubmit}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
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
