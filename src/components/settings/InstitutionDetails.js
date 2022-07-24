import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Fragment, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInstitutionDetails } from "../../actions/institution";
import ComboBox from "../ui/ComboBox";

import PhoneInput from "react-phone-input-2";
import es from "react-phone-input-2/lang/es.json";
import "react-phone-input-2/lib/style.css";

import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useConfirm } from "material-ui-confirm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.data };
    case "address":
      return { ...state, address: action.data };
    case "email": {
      return { ...state, email: action.data };
    }
    case "institutionTel":
      return { ...state, institutionTel: action.data };
    case "description":
      return { ...state, description: action.data };
    default:
      return state;
  }
};

export const InstitutionDetails = (props) => {
  const confirm = useConfirm();
  const institution = useSelector((state) => state.institution);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const [values, setValues] = useReducer(reducer, institution);

  const [errors, setErrors] = useState({
    name: "",
    firstName: "",
    lastName: "",
    userRole: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    institutionTel: "",
  });

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const handleChange = (e) => {
    setValues({ type: e.target.name, data: e.target.value });
    //dispatch(change({ type: e.target.name, data: e.target.value }));
  };

  const handleOnChange = (value) => {
    console.log("Actualizando numero de telefono");
    console.log("[institutionTel]: " + value);

    setErrors((prevState) => {
      return {
        ...prevState,
        institutionTel: validate("institutionTel", value),
      };
    });
    setValues((prevState) => {
      return {
        ...prevState,
        institutionTel: value,
      };
    });
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value || value.trim() === "") {
          return "Nombre de la Institución es Requerido";
        } else {
          return "";
        }
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
      case "institutionTel":
        if (!value || value.trim() === "") {
          return "Número de Telefono es Requerido";
        } else if (!value.match(/^[6-9]\d{9}$/)) {
          return "Introduce un número de Teléfono válido.";
        } else {
          return "";
        }
      case "description":
        if (!value || value.trim() === "") {
          return "La Descripción de la Institución es Requerida";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const handleMessageLoaded = (isSuccess, response) => {
    if (isSuccess) {
      setSnackbar({
        message: "Los Cambios se guardaron Exitosamente!",
        severity: "success",
      });
    } else {
      setSnackbar({
        message: response,
        severity: "error",
      });
    }

    setOpen(true);
  };

  const handleSubmitChanges = async () => {
    confirm({
      title: "¿Esta Seguro que desea Guardar estos Cambios?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("subiendo camios en los detalles de la institucion");

        handleUploadChanges(values);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleUploadChanges = async (data) => {
    dispatch(updateInstitutionDetails(institution.id, data))
      .then((data) => {
        setOpenSnackbar({
          open: true,
          severity: "success",
          message: "Cambios Guardados Exitosamente!",
        });
      })
      .catch((error) => {
        setOpenSnackbar({
          open: true,
          severity: "error",
          message: Object.values(error.data).map((error, idx) => (
            <Fragment key={error}>
              {error}
              {<br />}
            </Fragment>
          )),
        });
      });
    /* try {
      const institutionDetails = await InstitucionService.update(
        institution.id,
        data
      ).then((data) => data);

      handleMessageLoaded(true);
    } catch (error) {
      handleMessageLoaded(false);
    } */
  };

  useEffect(() => {
    console.log("renderizando componente para los detalles de la institucion");
    console.log(institution);
  }, []);

  return (
    <>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader
            subheader="La información se puede editar."
            title="Detalles de la Institucion"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Por favor, especifique su nombre"
                  label="Nombre de la Institucion"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ComboBox
                  autoComplete="given-name"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Direccion de la Institucion"
                  address={values.address}
                  setValues={setValues}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electronico"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <PhoneInput
                  inputStyle={{
                    width: "100%",
                    height: "54px",
                    fontSize: "18px",
                    paddingLeft: "48px",
                    borderRadius: "5px",
                  }}
                  value={values.institutionTel}
                  localization={es}
                  country="ar"
                  enableAreaCodes={["ar"]}
                  enableAreaCodeStretch={true}
                  onlyCountries={["ar"]}
                  masks={{ ar: "(..) ....-...." }}
                  onChange={handleOnChange}
                  isValid={(value, country) => {
                    if (errors.institutionTel !== "") {
                      return "Numero Invalido: " + value + ", " + country.name;
                    } else {
                      return true;
                    }
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <ThemeProvider theme={themeTextArea}>
                  <TextField
                    autoComplete="given-name"
                    multiline
                    rows={5}
                    name="description"
                    value={values.description}
                    required
                    variant="outlined"
                    fullWidth
                    id="description"
                    label="Dejanos una breve descripcion de la Institucion"
                    onChange={handleChange}
                    //onChange={handleInstitutionChange}
                  />
                </ThemeProvider>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button
              onClick={handleSubmitChanges}
              color="primary"
              variant="contained"
            >
              Guardar Cambios
            </Button>
          </Box>
        </Card>
      </form>

      <div>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            autoHideDuration={4000}
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
    </>
  );
};
