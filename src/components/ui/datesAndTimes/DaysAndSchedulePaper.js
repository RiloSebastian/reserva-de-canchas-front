import React, { useEffect, useState } from "react";
import SchedulerFromTo from "../../schedulers/SchedulerFromTo";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SelectWeekDays from "../../formularios-datos/SelectWeekDays";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";
import { getNextFromTime } from "../../../validations/validationTime";

const useStyles = makeStyles((theme) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 30,
  lineHeight: "30px",
}));

const DaysAndSchedulePaper = ({
  diasYHorarios,
  setDiasYHorarios,
  diaYHorario,
  setHorario,
  daysSelected,
  setDaysSelected,
  handleChangeHorarios,
}) => {
  const nuevoHorario = {
    id: "",
    from: new Date(),
    to: new Date(new Date().setHours(new Date().getHours() + 1)),
    price: "",
    enabled: true,
  };

  const nuevoHorarioInstitucion = {
    id: "",
    from: new Date(),
    to: new Date(new Date().setHours(new Date().getHours() + 1)),
  };

  const handleAddNewSchedule = (id) => {
    console.log("agregando nuevo horario para la card -> " + id);

    const from = getNextFromTime(diaYHorario.details);

    const nuevoHorario = {
      id: uuidv4(),
      from,
      to: new Date(new Date(from).setHours(new Date(from).getHours() + 1)),
    };

    console.log(nuevoHorario);

    const diasYHorariosUpdated = diasYHorarios.map((diaYHorario) => {
      if (diaYHorario.id === id) {
        console.log("HORARIOS PARA LOS DIAS SELECCIONADOS ENCONTRADO");
        console.log(diaYHorario);

        const horariosUpdated = [...diaYHorario.details, nuevoHorario];

        console.log("HORARIOS ACTUALIZADOS LUEGO DE AGREGAR UNO NUEVO");
        console.log(horariosUpdated);
        return {
          ...diaYHorario,
          details: horariosUpdated,
        };
      } else {
        return diaYHorario;
      }
    });

    setDiasYHorarios(diasYHorariosUpdated);
  };

  const handleDeleteHorarios = (horarioId, diaYHorarioId) => {
    console.log("HANDLE DELETE HORARIOS");
    console.log("HORARIO " + horarioId);

    console.log(diasYHorarios);
    console.log(diaYHorarioId);

    const diasYHorariosUpdated = diasYHorarios.map((day) => {
      if (day.id === diaYHorarioId) {
        const horariosUpdated = day.details.filter(
          (horario) => horario.id !== horarioId
        );

        return {
          ...day,
          details: horariosUpdated,
        };
      }
      return day;
    });

    console.log(" HORARIOS ACTUALIZADOS");
    console.log(diasYHorariosUpdated);
    setDiasYHorarios(diasYHorariosUpdated);
  };

  useEffect(() => {
    console.log("LOADING DIAS Y HORARIOS");

    console.log(diaYHorario);
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <SelectWeekDays
                setDaysSelected={setDaysSelected}
                daysSelected={daysSelected}
                daysAndTimesId={diaYHorario.id}
              />
            </Grid>
            <Grid item>
              <Box textAlign={"center"}>
                <p>Horarios</p>
                {diaYHorario.details.map((detail, key) => {
                  return (
                    <SchedulerFromTo
                      handleChangeHorarios={handleChangeHorarios}
                      diaYHorarioId={diaYHorario.id}
                      details={diaYHorario.details}
                      detail={detail}
                      setDiasYHorarios={setDiasYHorarios}
                      handleDeleteHorarios={handleDeleteHorarios}
                    />
                  );
                })}
              </Box>
              <Box textAlign="center" sx={{ mt: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => handleAddNewSchedule(diaYHorario.id)}
                >
                  Agregar Mas Horarios
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DaysAndSchedulePaper;
