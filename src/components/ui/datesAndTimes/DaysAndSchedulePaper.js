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
import ScheduleAndPrice from "../../ScheduleAndPrice";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 30,
  lineHeight: "30px",
}));

const DaysAndSchedulePaper = ({
  diaYHorario,
  diaYHorarioId,
  setHorarios,
  key,
  removeDaysAndSchedule,
}) => {
  const { id } = diaYHorario;

  const classes = useStyles();

  const [daysSelected, setDaysSelected] = useState([
    { label: "Lunes", value: 1, daysAndTimesId: null, selected: false },
    { label: "Martes", value: 2, daysAndTimesId: null, selected: false },
    { label: "Miercoles", value: 3, daysAndTimesId: null, selected: false },
    { label: "Jueves", value: 4, daysAndTimesId: null, selected: false },
    { label: "Viernes", value: 5, daysAndTimesId: null, selected: false },
    { label: "Sabado", value: 6, daysAndTimesId: null, selected: false },
    { label: "Domingo", value: 7, daysAndTimesId: null, selected: false },
  ]);

  const nuevoHorario = {
    id: "",
    from: new Date(),
    to: new Date(new Date().setHours(new Date().getHours() + 1)),
    price: "",
    enabled: true,
  };

  const [horariosYPrecios, setHorariosYPrecios] = useState([]);

  const [diasYHorarios, setDiasYHorarios] = useState([]);

  const handleAddNewSchedule = (id) => {
    console.log("agregando nuevo horario para la card -> " + id);
    console.log(nuevoHorario);

    console.log(diasYHorarios);

    const diasYHorariosUpdated = diasYHorarios.map((diaYHorario) => {
      if (diaYHorario.id === id) {
        const horariosUpdated = [...diaYHorario.horarios, nuevoHorario];
        return {
          ...diaYHorario,
          horarios: horariosUpdated,
        };
      } else {
        return diaYHorario;
      }
    });

    setDiasYHorarios(diasYHorariosUpdated);
  };

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
                //daysOptions={diaYHorario.dias}
                setDaysSelected={setDaysSelected}
                setHorariosYPrecios={setHorariosYPrecios}
                daysSelected={daysSelected}
                daysAndTimesId={diaYHorarioId}
              />
            </Grid>
            <Grid item>
              <Box textAlign={"center"}>
                <p>Horarios</p>
                <SchedulerFromTo />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton>
            <DeleteIcon
              onClick={() => {
                removeDaysAndSchedule(id, diaYHorarioId);
              }}
              fontSize="inherit"
              sx={{
                color: pink[500],
                width: 50,
                height: 50,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DaysAndSchedulePaper;
