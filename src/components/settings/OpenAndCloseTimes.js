import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import SchedulerFromTo from "../schedulers/SchedulerFromTo";
import { makeStyles } from "@material-ui/core/styles";
import SelectWeekDays from "../formularios-datos/SelectWeekDays";
import DaysAndSchedulePaper from "../ui/datesAndTimes/DaysAndSchedulePaper";
import ButtonAddMoreDatesAndTime from "../ui/datesAndTimes/ButtonAddMoreDatesAndTime";

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

const days = [
  "Todos los Días",
  "Lunes a Viernes",
  "Sabados",
  "Domingos",
  "Feriados",
];

function getStyles(day1, day, theme) {
  return {
    fontWeight:
      day.indexOf(day1) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const OpenAndCloseTimes = ({
  props,
  state,
  dispatch,
  setHorariosYPrecios,
}) => {
  const useStyles = makeStyles((theme) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 30,
    lineHeight: "30px",
  }));

  const classes = useStyles();

  const theme = useTheme();

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
  };

  const nuevoDiaYHorario = {
    id: "",
    dias: daysSelected,
    horarios: [nuevoHorario],
  };

  const [day, setDay] = useState([]);

  const handleChange = (e) => {
    console.log("handleChange");
    console.log(day);
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const [from, setFrom] = useState(new Date("2020-01-01 8:00"));
  const [to, setTo] = useState(new Date("2020-01-01 23:00"));

  const [diasYHorarios, setDiasYHorarios] = useState([]);

  const handleAddNewDatesSchedules = () => {
    console.log("agregando nuevos dias y horarios");
    console.log(nuevoDiaYHorario);

    const newDayAndSchedule = [...diasYHorarios, nuevoDiaYHorario];

    console.log(newDayAndSchedule);
    setDiasYHorarios(newDayAndSchedule);
  };

  const removeDaysAndSchedule = (id, diaYHorarioId) => {
    if (
      window.confirm(
        "Esta Seguro que desea eliminar estos dias y horarios?" + diaYHorarioId
      )
    ) {
      const diasYHorariosUpdated = diasYHorarios.filter(
        (diaYHorario) => diaYHorario.id !== diaYHorarioId
      );

      setDiasYHorarios(diasYHorariosUpdated);
    }
  };

  useEffect(() => {
    setDiasYHorarios([nuevoDiaYHorario]);
  }, []);

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Horarios de Apertura y Cierre" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <FormControl sx={{ m: 1 }}>
                {diasYHorarios.map((diaYHorario, key) => {
                  diaYHorario.id = key;
                  return (
                    <DaysAndSchedulePaper
                      setDaysSelected={setDaysSelected}
                      daysSelected={daysSelected}
                      diaYHorarioId={diaYHorario.id}
                      diaYHorario={diaYHorario}
                      removeDaysAndSchedule={removeDaysAndSchedule}
                    />
                  );
                })}
                <ButtonAddMoreDatesAndTime
                  daysSelected={daysSelected}
                  handleAddNewDatesSchedules={handleAddNewDatesSchedules}
                />
              </FormControl>
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
            Guardar Horarios
          </Button>
        </Box>
      </Card>
    </form>
  );
};
