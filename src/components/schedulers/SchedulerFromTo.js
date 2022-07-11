import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import { pink } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

import { useConfirm } from "material-ui-confirm";
import { ConfirmProvider } from "material-ui-confirm";
import { red } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";

import moment from "moment";

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

const useStyles = makeStyles((theme) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 30,
  lineHeight: "30px",
}));

const SchedulerFromTo = ({
  detail,
  handleChangeHorarios,
  diaYHorarioId,
  details,
  setDiasYHorarios,
  handleDeleteHorarios,
}) => {
  const confirm = useConfirm();

  const { from, to, id } = detail;

  const handleChangeFrom = (e) => {
    console.log("HANDLE CHANGE FROM HORARIO");
    console.log(id);
    handleChangeHorarios(diaYHorarioId, id, e, to);
  };

  const handleChangeTo = (e) => {
    console.log("HANDLE CHANGE TO HORARIO");
    console.log(detail.id);
    handleChangeHorarios(diaYHorarioId, id, from, e);
  };

  const removeHorario = (horarioId, diaYHorarioId) => {
    console.log("REMOVER HORARIO PARA LOS DIAS SELECCIONADOS");

    confirm({
      title: "¿Esta Seguro que desea eliminar este horario?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("ELIMINANDO HORARIOS");

        handleDeleteHorarios(horarioId, diaYHorarioId);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  useEffect(() => {
    console.log("CARGANDO HORARIOS DESDE - HASTA");
    console.log(detail);
    console.log(handleChangeHorarios);
    console.log(diaYHorarioId);
    console.log(details);
    console.log(setDiasYHorarios);
  }, []);

  return (
    <Grid sx={{ m: 1 }} container spacing={3} alignItems="center">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid item xs>
          <MobileTimePicker
            label="Desde"
            name="from"
            value={from}
            onChange={handleChangeFrom}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs>
          <MobileTimePicker
            label="Hasta"
            name="to"
            value={to}
            onChange={handleChangeTo}
            renderInput={(params) => <TextField {...params} />}
            /* shouldDisableTime={(timeValue, clockType) => {
              if (clockType === "minutes" && timeValue !== from.getMinutes()) {
                return true;
              }

              return false;
            }}*/
            minTime={new Date(new Date(from).setHours(moment(from).hour() + 1))}
          />
        </Grid>
      </LocalizationProvider>
      <Grid item xs>
        <IconButton
          disabled={details.length === 1}
          fontSize="inherit"
          sx={{ color: pink[500] }}
          onClick={() => {
            removeHorario(id, diaYHorarioId);
          }}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SchedulerFromTo;
