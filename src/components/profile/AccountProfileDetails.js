import React, { useEffect, useState } from "react";
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

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import es from "react-phone-input-2/lang/es.json";
import ar from "react-phone-input-2/lang/ar.json";

import UserService from "../../services/user.service";
import { useConfirm } from "material-ui-confirm";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";

export const AccountProfileDetails = (props) => {
  const { user } = props;

  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const [enabledModify, setEnabledModify] = useState(true);

  const [values, setValues] = useState(user);

  /* const [values, setValues] = useState({
    firstName: "Carlos",
    lastName: "Perez",
    email: "demo@reservatucancha.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  }); */

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value || value.trim() === "") {
          return "Nombre de la Institución es Requerido";
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
        if (!value || value.trim() === "") {
          return "Email es Requerido";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Introduzca una dirección de correo electrónico válida";
        } else {
          return "";
        }
      case "phone":
        if (!value) {
          return "Número de Telefono es Requerido";
        } else if (
          !value.match(/^[+]?[(]?[0-9]{1,4}[)]?[\s]?[0-9]{4}[-]?[0-9]{4}$/)
        ) {
          return "Introduce un número de Teléfono válido.";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const handleChange = (e) => {
    console.log("SETEANDO VALORES A");
    console.log(
      "[e.target.name]: " +
        e.target.name +
        " [e.target.value]: " +
        [e.target.value]
    );

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
    console.log("[phone]: ");
    console.log(value.toString());

    setErrors((prevState) => {
      return {
        ...prevState,
        phone: validate("phone", value.toString()),
      };
    });
    setValues((prevState) => {
      return {
        ...prevState,
        phone: value,
      };
    });
  };

  const handleConfirmChanges = () => {
    console.log("VALIDAR LA CONTRASEñA ACTUAL ANTES DE CONFIRMAR EL CAMBIO");

    console.log("CONFIRMAR LOS CAMBIOS");

    confirm({
      title: "¿Esta Seguro que desea Cambiar la Contraseña?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("actualizando contraseña");
        console.log(values);

        handleSubmitChanges(values);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleSubmitChanges = async (values) => {
    console.log("handleSubmitChanges");

    try {
      const updateUserPass = await UserService.updatePassword(
        user.id,
        values.newPassword
      );
    } catch (error) {}
  };

  const validateErrors = () => {
    console.log("VALIDANDO SI TODOS LOS INPUTS SON CORRECTOS");
    console.log(errors);
    if (
      errors.name === "" &&
      errors.lastName === "" &&
      errors.email === "" &&
      errors.phone === ""
    ) {
      setEnabledModify(false);
    } else {
      setEnabledModify(true);
    }
  };

  useEffect(() => {
    validateErrors();
  }, [errors]);

  useEffect(() => {
    setValues(user);
  }, [user]);

  return (
    <>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader
            subheader="La información se puede editar."
            title="Perfil"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                  helperText={errors.name}
                  error={errors.name}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                  helperText={errors.lastName}
                  error={errors.lastName}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electronico"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                  helperText={errors.email}
                  error={errors.email}
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
                  placeholder="+54 (11) 1234-1234"
                  value={user.telephone}
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
                    if (errors.phone !== "") {
                      return "Numero Invalido: " + value + ", " + country.name;
                    } else {
                      return true;
                    }
                  }}
                />
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
              disabled={enabledModify}
              onClick={handleConfirmChanges}
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
