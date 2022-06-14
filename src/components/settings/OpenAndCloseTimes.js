import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import InstitucionService from "../../services/instituciones/InstitucionService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { ConfirmProvider } from "material-ui-confirm";
import { red } from "@mui/material/colors";
import { pink } from "@mui/material/colors";
import { v4 as uuidv4 } from 'uuid';

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

function getStyles(day1, day, theme) {
  return {
    fontWeight:
      day.indexOf(day1) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const OpenAndCloseTimes = ({ props, state, setHorariosYPrecios, institution_id }) => {

  const confirm = useConfirm();

  const dispatch = useDispatch();

  const configuration = useSelector((state) => state.configuration);

  const updateDays = (dayUpdated) => {
    dispatch({ type: "UPDATE_DAYS_AND_SCHEDULES", days: dayUpdated });
  };

  const addNewDaysAndSchechedules = (dayUpdated) => {
    dispatch({ type: "add", days: dayUpdated });
  };

  const removeDaysAndSchechedules = () => {
    dispatch({ type: "remove" });
  };

  const useStyles = makeStyles((theme) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 30,
    lineHeight: "30px",
  }));

  const classes = useStyles();

  const theme = useTheme();

  const [institutionSchedule, setInstitutionSchedule] = useState({
    forType: "INSTITUTION",
    daysAvailable: [],
    details: [],
  });

  const [disabled, setDisabled] = useState(true);

  const [daysSelected, setDaysSelected] = useState([
    { label: "Lunes", value: "LUNES", daysAndTimesId: null, selected: false },
    { label: "Martes", value: "MARTES", daysAndTimesId: null, selected: false },
    { label: "Miercoles", value: "MIERCOLES", daysAndTimesId: null, selected: false },
    { label: "Jueves", value: "JUEVES", daysAndTimesId: null, selected: false },
    { label: "Viernes", value: "VIERNES", daysAndTimesId: null, selected: false },
    { label: "Sabado", value: "SABADO", daysAndTimesId: null, selected: false },
    { label: "Domingo", value: "DOMINGO", daysAndTimesId: null, selected: false },
  ]);

  const nuevoDiaYHorario = {
    id: "",
    daysAvailable: [],
    horario: {
      from: new Date("2020-01-01 8:00"),
      to: new Date("2020-01-01 23:00"),
    },
  };

  const [day, setDay] = useState([]);

  const handleChange = (e) => {
    console.log("handleChange");
    console.log(day);
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const [diasYHorarios, setDiasYHorarios] = useState([]);

  const handleAddNewDatesSchedules = () => {
    console.log("agregando nuevos dias y horarios");
    console.log(nuevoDiaYHorario);
    console.log("Dias Seleccionados");
    console.log(daysSelected);

    const newDayAndSchedule = [...diasYHorarios, { ...nuevoDiaYHorario, id: uuidv4() }];

    console.log(newDayAndSchedule);
    setDiasYHorarios(newDayAndSchedule);
  };

  const removeDaysAndSchedule = (diaYHorarioId) => {
    if (
      window.confirm(
        "Esta Seguro que desea eliminar estos dias y horarios?" + diaYHorarioId
      )
    ) {
      console.log("removiendo dias y horarios");
      console.log(diasYHorarios);
      const diasYHorariosUpdated = diasYHorarios.filter(
        (diaYHorario) => diaYHorario.id !== diaYHorarioId
      );

      console.log("y quedan !!! ");
      console.log(diasYHorariosUpdated);

      setDiasYHorarios(diasYHorariosUpdated);
    }
  };

  const handleChangeHorarios = (diaYHorarioId, from, to) => {
    const diasYHorariosUpdated = diasYHorarios.map(day => {
      if (day.id === diaYHorarioId) {
        return {
          ...day,
          horario: {
            from,
            to
          },
        }
      }
      return day;
    })
    setDiasYHorarios(diasYHorariosUpdated);
  }

  useEffect(async () => {

    try {
      //obtener horarios seteados de la institucion

      const institutionSchedules = await InstitucionService.getInstitutionSchedules("62a655985154182a24d057c8")
        .then((data) => data);

      console.log("horarios obtenidos")
      console.log(institutionSchedules)

      //setDiasYHorarios([nuevoDiaYHorario]);

    } catch (error) {
      console.log("error al obtener horarios de instituciones")
      console.log(error)

      setDiasYHorarios([{ ...nuevoDiaYHorario, id: uuidv4() }]);
    }

  }, []);

  const handleAddDaysAvailable = () => {

    const diasYhorariosToUpload = [];

    diasYHorarios.forEach(diaYHorario => {

      const daysOfTheWeek = daysSelected
        .filter(daySelected => daySelected.daysAndTimesId === diaYHorario.id)
        .map(day => day.value)

      console.log("SETEANDO DIAS DE LA SEMANA")
      console.log(daysOfTheWeek)

      const diasYHorariosUpdated = diasYHorarios.find(diaYHorarioToUpdate => {
        if (diaYHorarioToUpdate.id === diaYHorario.id) {
          return {
            ...diaYHorarioToUpdate,
            daysAvailable: daysOfTheWeek,
          }
        }

      })

      diasYhorariosToUpload.push({ ...diasYHorariosUpdated, daysAvailable: daysOfTheWeek });

    })

    return diasYhorariosToUpload;
  }


  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    //Validar si es necesario desabilitar el boton de agregar mas horarios

    if (diasYHorarios.length === 1) {

      if (daysSelected.map((daySelected) => daySelected.selected).every(d => d === true)) {
        setDisabled(true)
        return
      }

      if (daysSelected.map((daySelected) => daySelected.selected).includes(true)) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }

    } else {

      //Validar los ids asignados a cada dia

      diasYHorarios.forEach(diaYHorario => {
        if (!daysSelected.map((daySelected) => daySelected.daysAndTimesId).includes(diaYHorario.id) &&
          daysSelected.map((daySelected) => daySelected.selected).every(d => d === true)
        ) {
          const diasYHorariosUpdated = diasYHorarios.filter(
            (d) => d.id !== diaYHorario.id
          );
          setDiasYHorarios(diasYHorariosUpdated);
        }

        if (daysSelected.map((daySelected) => daySelected.selected).every(d => d === true)) {
          setDisabled(true)

        } else {
          setDisabled(false)
        }

      })
    }
  }, [daysSelected]);

  const handleDelete = item => {
    confirm({
      title: '¿Esta Seguro que desea eliminar este horario?',
      cancellationText: 'Cancelar'
    })
      .then(() => {

        const dayUpdated = daysSelected.map(day => {
          if (day.daysAndTimesId === item.id) {
            return {
              ...day,
              selected: false,
              daysAndTimesId: null
            }
          }
          return day;
        })
        setDaysSelected(dayUpdated);

        setDiasYHorarios(diasYHorarios.filter(other => other.id !== item.id))
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleSubmitSchedules = () => {
    console.log("subiendo horarios de la institucion")

    const data = handleAddDaysAvailable();

    try {

      const schedulesCreated = InstitucionService.createInstitutionSchedules(institution_id, data);


    } catch (error) {

    }

  }

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Horarios de Apertura y Cierre" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <FormControl sx={{ m: 1 }}>

                <List>
                  {diasYHorarios.map((item) => (
                    <ListItem key={item.id}>
                      <DaysAndSchedulePaper
                        setDaysSelected={setDaysSelected}
                        daysSelected={daysSelected}
                        diaYHorarioId={item.id}
                        diaYHorario={item}
                        removeDaysAndSchedule={removeDaysAndSchedule}
                        handleChangeHorarios={handleChangeHorarios}
                      />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => handleDelete(item)}>
                          <DeleteIcon
                            fontSize="inherit"
                            sx={{
                              margin: -20,
                              color: red[900],
                              width: 40,
                              height: 40,
                            }}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <ButtonAddMoreDatesAndTime
                  daysSelected={daysSelected}
                  handleAddNewDatesSchedules={handleAddNewDatesSchedules}
                  disabled={disabled}
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
          <Button onClick={handleSubmitSchedules} color="primary" variant="contained">
            Guardar Horarios
          </Button>
        </Box>
      </Card>
    </form>
  );
};
