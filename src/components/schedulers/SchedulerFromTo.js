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

const SchedulerFromTo = ({ from, to, handleChangeHorarios, diaYHorarioId }) => {

  const classes = useStyles();

  const handleChangeFrom = (e) => {

    handleChangeHorarios(diaYHorarioId, e, to)

  };

  const handleChangeTo = (e) => {

    handleChangeHorarios(diaYHorarioId, from, e)

  };

  useEffect(() => { }, []);

  return (
    <Grid container alignItems="center">
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
            shouldDisableTime={(timeValue, clockType) => {
              if (clockType === "minutes" && timeValue !== from.getMinutes()) {
                return true;
              }

              return false;
            }}
            minTime={new Date(new Date(from).setHours(from.getHours() + 1))}
          />
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
};

export default SchedulerFromTo;
