import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { useReducer, useState } from "react";
import moment from "moment";
import CanchaService from "../../services/canchas/CanchaService";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

const ubicaciones = ["Palermo", "Belgrano", "Caballito", "Flores"];

function getHorarios() {
  const items = [];
  new Array(17).fill().forEach((acc, index) => {
    items.push(moment({ hour: index + 7 }).format("H:mm"));
    items.push(moment({ hour: index + 7, minute: 30 }).format("H:mm"));
  });
  return items;
}

const horarios = getHorarios();

const disableDays = (date) => {
  return moment(date).isSame(moment(new Date(2022, 4, 25)));
};

function getStyles(name, selected, theme) {
  return {
    fontWeight:
      selected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FormularioFiltroCanchas = ({ state, dispatch, setInstitutions }) => {
  const theme = useTheme();

  const [deporte, setDeporte] = useState();
  const [ubicacion, setUbicacion] = useState([]);
  const [institucion, setInstitucion] = useState();
  const [value, setValue] = useState(new Date());
  const [checked, setChecked] = useState(true);

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    severity: "",
    autoHideDuration: 4000,
  });

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar((prevState) => {
      return { ...prevState, open: false };
    });
  };

  const handleChange = (e) => {
    console.log("handleChange");
    console.log(e);
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const handleTimePickerChange = (e) => {
    dispatch({ type: "reservation_time", data: e });
  };

  const handleDatePickerChange = (e) => {
    dispatch({ type: "reservation_date", data: e });
  };

  const handleUbicacion = (event) => {
    const {
      target: { value },
    } = event;
    setUbicacion(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleInstitucion = (event) => {
    //setDeporte(event.target.value);
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    console.log(state);

    try {
      const searchResult = await CanchaService.findCourtsByCustomerPreferences(
        state
      ).then((data) => data);
    } catch (error) {
      console.log("error al obtener canchas");
      console.log(error);
      setOpenSnackbar({
        open: true,
        severity: "error",
        message: error.data.message,
      });
      setInstitutions([]);
    }
  };

  return (
    <>
      <Box>
        <Card>
          <CardContent>
            <Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2} columns={11}>
                  <Grid item xs={2.1}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Deporte
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="sport"
                        value={state.sport}
                        label="Deporte"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Futbol</MenuItem>
                        <MenuItem value={20}>Tenis</MenuItem>
                        <MenuItem value={30}>Padel</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.1}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-chip-label">
                        Ubicacion
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        name="location"
                        value={state.location}
                        onChange={handleChange}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Ubicacion"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {ubicaciones.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, ubicacion, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.1}>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                      <FormControl fullWidth>
                        <MobileDatePicker
                          minDate={moment(new Date())}
                          maxDate={moment(new Date()).add(14, "days")}
                          shouldDisableDate={disableDays}
                          label="Fecha"
                          value={state.reservation_date}
                          onChange={(e) => handleDatePickerChange(e)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </FormControl>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2.1}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-chip-label">
                        Horario
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={state.reservation_time}
                        name="reservation_time"
                        onChange={handleChange}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Horario"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {horarios.map((horario) => (
                          <MenuItem
                            key={horario}
                            value={horario}
                            style={getStyles(
                              horario,
                              state.reservation_time,
                              theme
                            )}
                          >
                            {horario}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      sx={{ height: "100%" }}
                      fullWidth
                      type="submit"
                      variant="contained"
                    >
                      Buscar Canchas
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
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

export default FormularioFiltroCanchas;
