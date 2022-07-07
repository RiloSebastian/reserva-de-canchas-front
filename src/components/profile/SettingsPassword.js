import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import EmailService from "../../services/email/EmailService";
import Grid from "@mui/material/Grid";
import { set } from "date-fns";
import UserService from "../../services/user.service";
import { useConfirm } from "material-ui-confirm";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";

export const SettingsPassword = (props) => {
  const { user } = props;
  const confirm = useConfirm();

  const [enabledModify, setEnabledModify] = useState(true);

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const [values, setValues] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
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
          return undefined;
        }
      case "newPassword":
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
        } else if (value === values.password) {
          return "Ingrese una Contraseña diferente a la actual";
        } else if (values.confirmPassword && value !== values.confirmPassword) {
          return "Nueva contraseña y Confirmar Contraseña deben ser Iguales";
        } else if (values.confirmPassword && value === values.confirmPassword) {
          return undefined;
        } else {
          return undefined;
        }
      case "confirmPassword":
        if (!value) {
          return "Confirmar Contraseña es requerido";
        } else if (value !== values.newPassword) {
          return "Nueva contraseña y Confirmar Contraseña deben ser Iguales";
        } else {
          return undefined;
        }
      default: {
        return "";
      }
    }
  };

  const validateErrors = () => {
    console.log("VALIDANDO SI TODOS LOS INPUTS SON CORRECTOS");
    console.log(errors);
    if (
      errors.password === undefined &&
      errors.newPassword === undefined &&
      errors.confirmPassword === undefined
    ) {
      setEnabledModify(false);
    } else {
      setEnabledModify(true);
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

    // setEnabledModify(validateErrors());
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
    } catch (error) { }
  };

  useEffect(() => {
    validateErrors();
  }, [errors]);

  return (
    <>
      <form {...props}>
        <Card>
          <CardHeader subheader="Cambiar Contraseña" title="Contraseña" />
          <Divider />
          <CardContent>
            <Grid spacing={2} item xs={12}>
              <FormControl error={errors.password} fullWidth variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-password">
                  Contraseña Actual
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
                  label="Contraseña Actual"
                  name="password"
                />
                <FormHelperText>{errors.password}</FormHelperText>
              </FormControl>
            </Grid>
            <Box sx={{ mt: 3 }} />
            <Grid item xs={12}>
              <FormControl
                error={errors.newPassword}
                fullWidth
                variant="outlined"
              >
                <InputLabel required htmlFor="outlined-adornment-password">
                  Nueva Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showNewPassword ? "text" : "password"}
                  value={values.newPassword}
                  onChange={handleUserInput}
                  onBlur={handleUserInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showNewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Nueva Contraseña"
                  name="newPassword"
                />
                <FormHelperText>{errors.newPassword}</FormHelperText>
              </FormControl>
            </Grid>
            <Box sx={{ mt: 3 }} />
            <Grid item xs={12}>
              <FormControl
                error={errors.confirmPassword}
                fullWidth
                variant="outlined"
              >
                <InputLabel required htmlFor="outlined-adornment-password">
                  Confirmar Nueva Contraseña
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
                  label="Confirmar Nueva Contraseña"
                  name="confirmPassword"
                />
                <FormHelperText>{errors.confirmPassword}</FormHelperText>
              </FormControl>
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
              onClick={handleConfirmChanges}
              disabled={enabledModify}
              color="primary"
              variant="contained"
            >
              Cambiar Contraseña
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
