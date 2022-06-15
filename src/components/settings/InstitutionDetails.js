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

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

export const InstitutionDetails = (props) => {
  const institution = useSelector((state) => state.institution);
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(change({ type: e.target.name, data: e.target.value }));
  };

  useEffect(() => {

    console.log("renderizando componente para los detalles de la institucion")
    console.log(institution)
  }, []);

  return (
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
                value={institution.address}
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
              <TextField
                fullWidth
                label="Numero de Telefono"
                name="phone"
                onChange={handleChange}
                value={institution.institutionTel}
                variant="outlined"
              />
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
          <Button color="primary" variant="contained">
            Guardar Cambios
          </Button>
        </Box>
      </Card>
    </form>
  );
};
