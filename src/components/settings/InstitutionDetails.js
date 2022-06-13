import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const institutionDetails = useSelector((state) => state.institution);

  /* const [values, setValues] = useState({
    firstName: "Palermo Tenis",
    address: "Honduras 5460",
    email: "palermotenis@email.com",
    phone: "1146584589",
    state: "Alabama",
    country: "USA",
  }); */

  const handleChange = (event) => {
    /* setValues({
      ...values,
      [event.target.name]: event.target.value,
    }); */
  };

  useEffect(() => { }, []);

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
                name="institution_name"
                onChange={handleChange}
                required
                value={institutionDetails.name}
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
                value={institutionDetails.address}
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
                value={institutionDetails.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Numero de Telefono"
                name="phone"
                onChange={handleChange}
                value={institutionDetails.phone}
                variant="outlined"
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
          <Button color="primary" variant="contained">
            Guardar Cambios
          </Button>
        </Box>
      </Card>
    </form>
  );
};
