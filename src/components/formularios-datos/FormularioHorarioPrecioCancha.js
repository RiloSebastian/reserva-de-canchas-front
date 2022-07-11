import React, { createContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
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
import ScheduleAndPrice from "./../ScheduleAndPrice";
import SelectWeekDays from "./SelectWeekDays";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import { days } from "../../utils/days/days";
import { v4 as uuidv4 } from "uuid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonAddMoreDatesAndTime from "../ui/datesAndTimes/ButtonAddMoreDatesAndTime";

import FormControl from "@mui/material/FormControl";
import DaysAndSchedulePaper from "../ui/datesAndTimes/DaysAndSchedulePaper";
import { useConfirm } from "material-ui-confirm";
import { pink } from "@mui/material/colors";
import { getNextFromTime } from "../../validations/validationTime";

const useStyles = makeStyles((theme) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 30,
  lineHeight: "30px",
}));

const FormularioHorarioPrecioCancha = ({
  open,
  setOpen,
  schedules,
  setSchedules,
  isMultipleEdit,
}) => {
  const confirm = useConfirm();
  const institution = useSelector((state) => state.institution);

  const [noSchedulesLoadedOpen, setNoSchedulesLoadedOpen] = useState(false);


  const [min, setMin] = useState(new Date());

  const [max, setMax] = useState(new Date());

  const [disabled, setDisabled] = useState(true);

  //const { excluirDiasNoLaborales, porcentajeSenia } = horariosYPrecios;

  const classes = useStyles();

  const [daysSelected, setDaysSelected] = useState([]);

  const [disableAddMoreDays, setDisableAddMoreDays] = useState(false);

  const [loading, setLoading] = useState(false);

  const [withSenia, setWithSenia] = useState(false);

  const [fieldsToShow, setFieldsToShow] = useState({
    delete: false,
    enabled: false,
    readOnly: false,
  });

  const [horario, setHorario] = useState({
    id: "",
    desde: moment(new Date("2018-01-01T00:00:00.000Z")),
    hasta: moment(new Date("2018-01-01T00:00:00.000Z")),
    precio: "",
    horarioHabilitado: true,
  });

  const [senia, setSenia] = useState();

  const [horarios, setHorarios] = useState([]);

  const [diasYHorarios, setDiasYHorarios] = useState([]);

  const [dates, setDates] = useState([]);

  const nuevoHorario = {
    id: "",
    from: min,
    to: max,
    price: "",
    enabled: true,
  };

  const nuevoDiaYHorario = {
    id: "",
    dias: daysSelected,
    details: [nuevoHorario],
  };

  const handleChange = (e) => {
    /* if (e.target.type === "checkbox") {
      setHorariosYPrecios((form) => {
        return { ...form, [e.target.name]: e.target.checked };
      });
    } else {
      setHorariosYPrecios((form) => {
        return { ...form, [e.target.name]: e.target.value };
      });
    } */
  };

  const handleGuardarHorariosYPrecios = () => {
    console.log("GUARDANDO PRECIOS Y HORARIOS DE LA CANCHA")
    console.log(horarios)
    /* setLoading(true);

    setHorariosYPrecios((body) => {
      return { ...body, ["schedules"]: horarios };
    });

    setOpen(false); */
  };

  const handleClose = () => {
    setLoading(true);
    setOpen(false);
  };

  const handleAddNewDatesSchedules = () => {
    setDisabled(true);
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

  const handleAddNewSchedule = (id) => {
    console.log("agregando nuevo horario para la card -> " + id);

    const diaYHorario = diasYHorarios.filter((diaYHorario) => diaYHorario.id === id)
    const from = getNextFromTime(diaYHorario[0].details);

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

  const handleDisableAddNewDatesSchedules = () => {
    console.log("VALIDANDO DIAS SELECCIONADOS");

    const addNewDaysAndSchedulesAvailable = daysSelected
      .filter(
        (daySelected) =>
          daySelected.daysAndTimesId ===
          diasYHorarios[diasYHorarios.length - 1].id
      )
      .map((daySelected) => daySelected.selected)
      .every((d) => d === false);

    setDisableAddMoreDays(addNewDaysAndSchedulesAvailable);
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

  useEffect(() => {
    const minTime = new Date(
      new Date(
        new Date().setHours(moment(institution.scheduleMinTime).hour())
      ).setMinutes(0)
    );

    const maxTime = new Date(
      new Date(
        new Date().setHours(moment(institution.scheduleMaxTime).hour())
      ).setMinutes(0)
    );

    console.log("SETEANDO HORARIOS MINIMOS Y MAXIMOS PARA LAS CANCHAS");
    console.log(minTime);
    console.log(maxTime);

    setMin(minTime);

    setMax(maxTime);

    setDiasYHorarios([
      {
        id: uuidv4(),
        dias: daysSelected,
        details: [
          {
            id: uuidv4(),
            from: minTime,
            to: maxTime,
            price: "",
            enabled: true,
          },
        ],
      },
    ]);
  }, []);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    console.log("VALIDANDO CADA VEZ QUE SE SELECCIONA UN DIA");
    console.log(daysSelected);

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

        console.log(
          daysSelected.map((daySelected) => daySelected.daysAndTimesId)
        );

        if (
          daysSelected
            .map((daySelected) => daySelected.selected)
            .every((d) => d === true) ||
          !daysSelected
            .map((daySelected) => daySelected.daysAndTimesId)
            .includes(diaYHorario.id)
        ) {
          console.log("DESHABILITAR BOTON PARA AGREGAR MAS DIAS");
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      });
    }
  }, [daysSelected]);

  useEffect(() => {
    //Obtener los dias habiles de la institucion

    let institutionsDaysAvailable = [];

    if (institution.schedules) {
      institution.schedules.forEach((schedule) => {
        const daysAndTimesId = uuidv4();

        schedule.daysAvailable.forEach((dayAvailable) => {
          institutionsDaysAvailable.push({
            label:
              dayAvailable.charAt(0).toUpperCase() +
              dayAvailable.slice(1).toLowerCase(),
            value: dayAvailable,
            daysAndTimesId,
            selected: false,
          });
        });
      });

      const arraySorted = institutionsDaysAvailable.sort((a, b) => {
        return days[a.label] - days[b.label];
      });

      console.log("setear los dias habiles de la institucion");
      console.log(arraySorted);

      setDaysSelected(arraySorted);
    } else {
      setDaysSelected([
        { label: "Lunes", value: 1, daysAndTimesId: null, selected: false },
        { label: "Martes", value: 2, daysAndTimesId: null, selected: false },
        { label: "Miercoles", value: 3, daysAndTimesId: null, selected: false },
        { label: "Jueves", value: 4, daysAndTimesId: null, selected: false },
        { label: "Viernes", value: 5, daysAndTimesId: null, selected: false },
        { label: "Sabado", value: 6, daysAndTimesId: null, selected: false },
        { label: "Domingo", value: 7, daysAndTimesId: null, selected: false },
      ]);
    }
  }, [institution.schedules]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Precios Y Horarios</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configure las fechas, horarios y precios para las canchas
            seleccionadas.
          </DialogContentText>

          {isMultipleEdit && (
            <Box textAlign="left" sx={{ m: 4 }}>
              <TextField
                disabled={withSenia}
                label="Porcentaje de Seña"
                id="porcentaje"
                sx={{ m: 1, width: "25ch" }}
                name="senia"
                onChange={handleChange}
                value={senia}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <FormControl sx={{ m: 1 }}>
                <List>
                  {diasYHorarios.map((diaYHorario) => (
                    <ListItem key={diaYHorario.id}>
                      <Paper className={classes}>
                        <Box key={diaYHorario.id} textAlign="center" sx={{ m: 4 }}>
                          <Box textAlign="left" sx={{ mt: 4 }}>
                            <p>Dias de la Semana</p>
                            <SelectWeekDays
                              setDaysSelected={setDaysSelected}
                              daysSelected={daysSelected}
                              daysAndTimesId={diaYHorario.id}
                              fieldsToShow={fieldsToShow}
                            />
                          </Box>
                          <Box textAlign="left" sx={{ mt: 4 }}>
                            <p>Horarios</p>

                            <List>
                              {diaYHorario.details.map((horario) => (
                                <ListItem key={horario.id}>
                                  <ScheduleAndPrice
                                    handleChangeHorarios={handleChangeHorarios}
                                    horario={horario}
                                    diaYHorarioId={diaYHorario.id}
                                    setHorarios={setHorarios}
                                    min={min}
                                    max={max}
                                    fieldsToShow={fieldsToShow}
                                    handleDeleteHorarios={handleDeleteHorarios}
                                    details={diaYHorario.details}
                                  />
                                </ListItem>
                              ))}
                            </List>

                            <Box textAlign="center" sx={{ mt: 2, pb: 2 }}>
                              <Button
                                variant="outlined"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={() => handleAddNewSchedule(diaYHorario.id)}
                              >
                                Agregar Mas Horarios
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                        <ListItemSecondaryAction>
                          <Grid
                            item
                            sx={{
                              width: 40,
                              height: 40,
                            }}
                          >
                            <IconButton
                              disabled={diasYHorarios.length === 1}
                              onClick={() => {
                                handleDelete(diaYHorario);
                              }}
                              aria-label="delete"
                              size="large"
                              sx={{
                                color: pink[500],
                                width: 40,
                                height: 40,
                              }}
                            >
                              <DeleteIcon
                                fontSize="inherit"
                                sx={{
                                  width: 40,
                                  height: 40,
                                }}
                              />
                            </IconButton>
                          </Grid>
                        </ListItemSecondaryAction>
                      </Paper>
                    </ListItem>
                  ))}
                </List>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <ButtonAddMoreDatesAndTime
          daysSelected={daysSelected}
          handleAddNewDatesSchedules={handleAddNewDatesSchedules}
          disabled={disabled}
        />

        <Box textAlign="center" sx={{ m: 2 }}>
          <LoadingButton
            color="secondary"
            onClick={handleGuardarHorariosYPrecios}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            disabled={daysSelected
              .map((daySelected) => daySelected.selected)
              .every((d) => d === false)}
          >
            Guardar Horarios y Precios
          </LoadingButton>
        </Box>
      </Dialog>
    </div>
  );
};

export default FormularioHorarioPrecioCancha;
