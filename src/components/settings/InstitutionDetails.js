import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import ComboBox from "../ui/ComboBox";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { change } from "../../actions/institution";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import es from "react-phone-input-2/lang/es.json";

import InstitucionService from "../../services/instituciones/InstitucionService";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";
import { useConfirm } from "material-ui-confirm";

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

export const InstitutionDetails = (props) => {
  const confirm = useConfirm();
  const institution = useSelector((state) => state.institution);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const [values, setValues] = useState(institution);

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
  });

  const handleChange = (e) => {
    dispatch(change({ type: e.target.name, data: e.target.value }));
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

  const handleMessageLoaded = (isSuccess) => {
    if (isSuccess) {
      setSnackbar({
        message: "Los Horarios se han Guardado Exitosamente !",
        severity: "success",
      });
    } else {
      setSnackbar({
        message:
          "Hubo un error al intentar guardar los Horarios. Vuelva a intentarlo",
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
        console.log("subiendo horarios de la institucion");

        handleUploadChanges(values);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleUploadChanges = async (data) => {
    try {
      const institutionDetails = await InstitucionService.update(
        institution.id,
        data
      ).then((data) => data);

      handleMessageLoaded(true);
    } catch (error) {
      handleMessageLoaded(false);
    }
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
                  value={institution.name}
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
                  address={institution.address}
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
                  value={institution.email}
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
                  value={institution.institutionTel}
                  localization={es}
                  country="ar"
                  enableAreaCodes={["ar"]}
                  enableAreaCodeStretch={true}
                  onlyCountries={["ar"]}
                  masks={{ ar: "(..) ....-...." }}
                  onChange={handleOnChange}
                />
                {/* <TextField
                fullWidth
                label="Numero de Telefono"
                name="phone"
                onChange={handleChange}
                value={institution.institutionTel}
                variant="outlined"
              /> */}
              </Grid>
              <Grid item md={6} xs={12}>
                <ThemeProvider theme={themeTextArea}>
                  <TextField
                    autoComplete="given-name"
                    multiline
                    rows={5}
                    name="description"
                    value={institution.description}
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

      <CustomizedSnackbars
        message={snackbar.message}
        severity={snackbar.severity}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};
