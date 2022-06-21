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
import { v4 as uuidv4 } from "uuid";

import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

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

export const OpenAndCloseTimes = ({ props, institution }) => {
  const confirm = useConfirm();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const [noSchedulesLoadedOpen, setNoSchedulesLoadedOpen] = useState(false);

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
    {
      label: "Miercoles",
      value: "MIERCOLES",
      daysAndTimesId: null,
      selected: false,
    },
    { label: "Jueves", value: "JUEVES", daysAndTimesId: null, selected: false },
    {
      label: "Viernes",
      value: "VIERNES",
      daysAndTimesId: null,
      selected: false,
    },
    { label: "Sabado", value: "SABADO", daysAndTimesId: null, selected: false },
    {
      label: "Domingo",
      value: "DOMINGO",
      daysAndTimesId: null,
      selected: false,
    },
  ]);

  const nuevoDiaYHorario = {
    id: uuidv4(),
    parentId: institution.id,
    daysAvailable: [],
    details: [
      {
        id: uuidv4(),
        from: new Date("2020-01-01 8:00"),
        to: new Date("2020-01-01 23:00"),
      },
    ],
  };

  const [day, setDay] = useState([]);

  const [diasYHorarios, setDiasYHorarios] = useState([]);

  const handleAddNewDatesSchedules = () => {
    console.log("agregando nuevos dias y horarios");
    console.log(nuevoDiaYHorario);
    console.log("Dias Seleccionados");
    console.log(daysSelected);

    const newDayAndSchedule = [
      ...diasYHorarios,
      { ...nuevoDiaYHorario, id: uuidv4() },
    ];

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

  const handleChangeHorarios = (diaYHorarioId, horarioId, from, to) => {
    console.log("HANDLE CHANGE HORARIOS");

    console.log("DIA Y HORARIO " + diaYHorarioId);
    console.log("HORARIO " + horarioId);
    console.log("DESDE " + from);
    console.log("HASTA " + to);

    const diasYHorariosUpdated = diasYHorarios.map((day) => {
      if (day.id === diaYHorarioId) {
        const horariosUpdated = day.details.map((horario) => {
          if (horario.id === horarioId) {
            return {
              ...horario,
              from,
              to,
            };
          }

          return horario;
        });

        return {
          ...day,
          details: horariosUpdated,
        };
      }
      return day;
    });
    setDiasYHorarios(diasYHorariosUpdated);
  };

  const handleDelete = (item) => {
    confirm({
      title: "¿Esta Seguro que desea eliminar este horario?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        const dayUpdated = daysSelected.map((day) => {
          if (day.daysAndTimesId === item.id) {
            return {
              ...day,
              selected: false,
              daysAndTimesId: null,
            };
          }
          return day;
        });
        setDaysSelected(dayUpdated);

        if (
          diasYHorarios.filter((other) => other.id !== item.id).length === 0
        ) {
          setNoSchedulesLoadedOpen(true);
        }

        setDiasYHorarios(diasYHorarios.filter((other) => other.id !== item.id));
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleMessageLoaded = (isSuccess) => {
    if (isSuccess) {
      setSnackbar({
        message: "Los Horarios se han Guardado Exitosamente !",
        severity: "success",
      });
    } else {
      setSnackbar({
        message:
          "Hubo un error al intentar guardar los Horarios. Vuelva a intentarlo",
        severity: "error",
      });
    }

    setOpen(true);
  };

  const handleOpenDaysAndSchedules = () => {
    if (diasYHorarios.length === 0) {
      handleAddNewDatesSchedules();
    }

    setNoSchedulesLoadedOpen(false);
  };

  const handleAddDaysAvailable = () => {
    const diasYhorariosToUpload = [];

    diasYHorarios.forEach((diaYHorario) => {
      //Setear horarios para los dias seleccionados
      const details = [];

      const daysOfTheWeek = daysSelected
        .filter((daySelected) => daySelected.daysAndTimesId === diaYHorario.id)
        .map((day) => day.value);

      console.log("SETEANDO DIAS DE LA SEMANA");
      console.log(daysOfTheWeek);

      console.log("SETEANDO LOS HORARIOS");
      diaYHorario.details.forEach(({ from, to }) => {
        const timeFrame = {
          from: from.getTime(),
          to: to.getTime(),
        };
        details.push({ timeFrame });
      });

      diasYhorariosToUpload.push({
        parentId: institution.id,
        daysAvailable: daysOfTheWeek,
        details,
        forType: "INSTITUTION",
      });
    });

    return diasYhorariosToUpload;
  };

  const handleSubmitChanges = async () => {
    confirm({
      title: "¿Esta Seguro que desea Guardar estos Cambios?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("subiendo horarios de la institucion");

        if (
          daysSelected
            .map((daySelected) => daySelected.selected)
            .every((d) => d === false)
        ) {
          console.log("NO SE HA SELECCIONADO NINGUNA FECHA");
        } else {
          const data = handleAddDaysAvailable();

          console.log("SUBIENDO DIAS Y HORARIOS DE LA INSTITUCION");
          console.log(data);

          handleUploadChanges(data);
        }
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleUploadChanges = async (data) => {
    try {
      const schedulesCreated =
        await InstitucionService.createInstitutionSchedules(
          institution.id,
          data[0]
        ).then((data) => data);

      console.log(" DIAS Y HORARIOS DE LA INSTITUCION CARGADOS EXITOSAMENTE");
      console.log(schedulesCreated);
      handleMessageLoaded(true);
    } catch (error) {
      console.log(" ERROR AL CARGAR LOS DIAS Y HORARIOS DE LA INSTITUCION ");
      console.log(error);
      handleMessageLoaded(false);
    }
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    //Validar si es necesario desabilitar el boton de agregar mas horarios

    if (diasYHorarios.length === 1) {
      if (
        daysSelected
          .map((daySelected) => daySelected.selected)
          .every((d) => d === true)
      ) {
        setDisabled(true);
        return;
      }

      if (
        daysSelected.map((daySelected) => daySelected.selected).includes(true)
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      //Validar los ids asignados a cada dia

      diasYHorarios.forEach((diaYHorario) => {
        if (
          !daysSelected
            .map((daySelected) => daySelected.daysAndTimesId)
            .includes(diaYHorario.id) &&
          daysSelected
            .map((daySelected) => daySelected.selected)
            .every((d) => d === true)
        ) {
          const diasYHorariosUpdated = diasYHorarios.filter(
            (d) => d.id !== diaYHorario.id
          );
          setDiasYHorarios(diasYHorariosUpdated);
        }

        if (
          daysSelected
            .map((daySelected) => daySelected.selected)
            .every((d) => d === true)
        ) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      });
    }
  }, [daysSelected]);

  useEffect(async () => {
    console.log("datos de la institucion");
    console.log(institution);

    try {
      //obtener horarios seteados de la institucion

      const institutionSchedules =
        await InstitucionService.getInstitutionSchedules(institution.id).then(
          (data) => data
        );

      console.log("horarios obtenidos");
      console.log(institutionSchedules);

      if (institution.schedules) {
        //Cargamos los horarios
        console.log("CARGAMOS LOS HORARIOS DE LA INSTITUCION ENCONTRADOS");
        console.log(institution.schedules);

        const daysAlreadySelected = [];
        const schedulersAlreadySelected = [];

        const daysAndSchedulesAlreadyLoaded = [];

        institution.schedules.forEach((horario) => {
          horario.daysAvailable.forEach((dia) => {
            daysAlreadySelected.push({
              label: dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase(),
              value: dia,
              daysAndTimesId: horario.id,
              selected: true,
            });
          });

          horario.details.forEach(({ timeFrame }) => {
            schedulersAlreadySelected.push({
              id: uuidv4(),
              from: new Date(timeFrame.from),
              to: new Date(timeFrame.to),
            });
          });

          daysAndSchedulesAlreadyLoaded.push({
            id: horario.id,
            parentId: institution.id,
            daysAvailable: horario.daysAvailable,
            details: schedulersAlreadySelected,
          });
        });

        daysSelected.forEach((diaSeleccionado) => {
          if (
            !daysAlreadySelected
              .map((dia) => dia.value)
              .includes(diaSeleccionado.value)
          ) {
            daysAlreadySelected.push(diaSeleccionado);
          }
        });

        const days = {
          Lunes: 1,
          Martes: 2,
          Miercoles: 3,
          Jueves: 4,
          Viernes: 5,
          Sabado: 6,
          Domingo: 7,
        };

        const arraySorted = daysAlreadySelected.sort((a, b) => {
          return days[a.label] - days[b.label];
        });

        setDaysSelected(arraySorted.sort());

        setDiasYHorarios(daysAndSchedulesAlreadyLoaded);
        setNoSchedulesLoadedOpen(false);
      } else {
        setNoSchedulesLoadedOpen(true);
      }

      //setDiasYHorarios([nuevoDiaYHorario]);
    } catch (error) {
      setDiasYHorarios([nuevoDiaYHorario]);
      setNoSchedulesLoadedOpen(true);
    }
  }, []);

  return (
    <>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader title="Horarios de Apertura y Cierre" />
          <Divider />
          <CardContent>
            {noSchedulesLoadedOpen ? (
              <React.Fragment>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Dias y Horarios
                  </Typography>
                  <Typography variant="h5" component="div">
                    La institucion aun no posee horarios de apertura y cierre
                    cargados
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Por favor agregue los horarios haciendo click en el boton de
                    abajo
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={handleOpenDaysAndSchedules}
                    variant="contained"
                    size="small"
                  >
                    Agregar horarios de apertura y cierre a la insittucion
                  </Button>
                </CardActions>
              </React.Fragment>
            ) : (
              <Grid container spacing={3} alignItems="center">
                <Grid item xs>
                  <FormControl sx={{ m: 1 }}>
                    <List>
                      {diasYHorarios.map((diaYHorario) => (
                        <ListItem key={diaYHorario.id}>
                          <DaysAndSchedulePaper
                            diasYHorarios={diasYHorarios}
                            setDaysSelected={setDaysSelected}
                            daysSelected={daysSelected}
                            diaYHorarioId={diaYHorario.id}
                            diaYHorario={diaYHorario}
                            setDiasYHorarios={setDiasYHorarios}
                            removeDaysAndSchedule={removeDaysAndSchedule}
                            handleChangeHorarios={handleChangeHorarios}
                          />
                          <ListItemSecondaryAction>
                            <Grid
                              item
                              sx={{
                                width: 40,
                                height: 40,
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  handleDelete(diaYHorario);
                                }}
                                aria-label="delete"
                                size="large"
                              >
                                <DeleteIcon
                                  fontSize="inherit"
                                  sx={{
                                    color: pink[500],
                                    width: 40,
                                    height: 40,
                                  }}
                                />
                              </IconButton>
                            </Grid>
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
            )}
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button
              disabled={
                noSchedulesLoadedOpen ||
                daysSelected
                  .map((daySelected) => daySelected.selected)
                  .every((d) => d === false)
              }
              onClick={handleSubmitChanges}
              color="primary"
              variant="contained"
            >
              Guardar Horarios
            </Button>
          </Box>
        </Card>
      </form>
      <CustomizedSnackbars
        message={snackbar.message}
        severity={snackbar.severity}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};
