import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { pink } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ScheduleAndPrice = ({
  horario,
  diaYHorarioId,
  removeHorario,
  setHorarios,
  setHorariosYPrecios,
  min,
  max,
  fieldsToShow,
}) => {
  const { id, precio, enabled, from, to } = horario;

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setHorarios((horarios) => {
        let horariosUpdated = horarios.map((horario) =>
          horario.id === id
            ? { ...horario, [e.target.name]: e.target.checked }
            : horario
        );

        return [...horariosUpdated];
      });
    } else {
      setHorarios((horarios) => {
        let horariosUpdated = horarios.map((horario) =>
          horario.id === id
            ? { ...horario, [e.target.name]: e.target.value }
            : horario
        );

        return [...horariosUpdated];
      });
    }
  };

  useEffect(() => {
    setHorarios((horarios) => {
      let horariosUpdated = horarios.map((horario) =>
        horario.id === id ? { ...horario, ["from"]: from } : horario
      );

      return [...horariosUpdated];
    });

    setHorarios((horarios) => {
      let horariosUpdated = horarios.map((horario) =>
        horario.id === id ? { ...horario, ["to"]: to } : horario
      );

      return [...horariosUpdated];
    });
  }, []);

  return (
    <Grid container spacing={3} alignItems="center">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid item xs>
          <MobileTimePicker
            label="Desde"
            name="from"
            value={from}
            onChange={(newValue) => {
              setHorarios((horarios) => {
                console.log("modificando horario de cancha desde");
                console.log(horarios);
                let horariosUpdated = horarios.map((horario) =>
                  horario.id === id
                    ? { ...horario, ["from"]: newValue }
                    : horario
                );

                return [...horariosUpdated];
              });
            }}
            renderInput={(params) => <TextField {...params} />}
            minTime={min}
          />
        </Grid>
        <Grid item xs>
          <MobileTimePicker
            label="Hasta"
            name="to"
            value={to}
            onChange={(newValue) => {
              setHorarios((horarios) => {
                let horariosUpdated = horarios.map((horario) =>
                  horario.id === id ? { ...horario, ["to"]: newValue } : horario
                );

                return [...horariosUpdated];
              });
            }}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableTime={(timeValue, clockType) => {
              if (clockType === "minutes" && timeValue !== from.getMinutes()) {
                return true;
              }

              return false;
            }}
            maxTime={max}
            minTime={min}
          />
        </Grid>
      </LocalizationProvider>

      <Grid item xs>
        <TextField
          name="price"
          value={precio}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Precio /hr"
          onChange={handleChange}
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Grid>
      <Grid hidden={fieldsToShow.enabled} item xs>
        <FormControlLabel
          control={
            <Switch
              name="enabled"
              onChange={handleChange}
              checked={enabled}
              color="primary"
            />
          }
          label={enabled ? "Activo" : "Inactivo"}
          labelPlacement="activo"
        />
      </Grid>
      <Grid hidden={fieldsToShow.delete} item xs>
        <IconButton
          onClick={() => {
            removeHorario(id, diaYHorarioId);
          }}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon fontSize="inherit" sx={{ color: pink[500] }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ScheduleAndPrice;
