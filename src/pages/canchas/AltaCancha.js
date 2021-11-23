import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import imagenVacia from "../../assets/no-image.png";

const AltaCancha = () => {
  const tipos = ["Cemento", "Tierra", "Pasto Sintetico", "Ladrillo"];

  const [form, setform] = useState({
    id: -1,
    nombre: "",
    descripcion: "",
    porcentajeSenia: -1,
    tipo: "",
    imagenes: [imagenVacia, imagenVacia],
  });

  const handleChange = (prop) => (event) => {
    setform({ ...form, [prop]: event.target.value });
  };

  const handleImgChange = (e) => {
    let fileObj = [];
    let fileArray = [];

    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setform({
      ...form,
      ["imagenes"]: fileArray,
    });
  };

  return (
    <div>
      <h1 style={{fontSize: "60px"}}>Alta De Cancha</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={8}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ".MuiTextField-root": { m: 1, width: "50%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="nombre"
                label="Nombre"
                variant="outlined"
                value={form.nombre}
                onChange={handleChange("nombre")}
              />
              <TextField
                id="descripcion"
                label="Descripcion"
                variant="outlined"
                multiline
                rows={4}
                value={form.descripcion}
                onChange={handleChange("descripcion")}
              />
              <TextField
                id="porcentaje-senia"
                label="Porcentaje De Seña"
                variant="outlined"
                type="number"
                value={form.porcentajeSenia}
                onChange={handleChange("porcentajeSenia")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                id="tipo-cancha"
                select
                label="Select"
                helperText="Seleccione el tipo de Cancha"
                value={form.tipo}
                onChange={handleChange("tipo")}
              >
                {tipos.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
              <Button />
            </Box>
          </Grid>
          <Grid item sx={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <img src={form.imagenes[0]} height="250" width="250" />
                <img src={form.imagenes[1]} height="250" width="250" />
              </div>
              <Button variant="contained" component="label">
                Subir Imagenes
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImgChange}
                />
              </Button>
              <Button style={{ "margin-top": "10px" }} variant="contained">
                Asignar Horarios y Precios
              </Button>
            </Box>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div style={{width: "50%"}}>
            <Button variant="contained" color="success" fullWidth={true}>
              Guardar Cambios
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AltaCancha;
