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
  horariosYPrecios,
  setHorariosYPrecios,
  isMultipleEdit,
}) => {
  const institution = useSelector((state) => state.institution);

  const [min, setMin] = useState(new Date());

  const [max, setMax] = useState(new Date());

  const [disabled, setDisabled] = useState(true);

  const { excluirDiasNoLaborales, porcentajeSenia } = horariosYPrecios;

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
    horarios: [nuevoHorario],
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setHorariosYPrecios((form) => {
        return { ...form, [e.target.name]: e.target.checked };
      });
    } else {
      setHorariosYPrecios((form) => {
        return { ...form, [e.target.name]: e.target.value };
      });
    }
  };

  const handleGuardarHorariosYPrecios = () => {
    setLoading(true);

    setHorariosYPrecios((body) => {
      return { ...body, ["schedules"]: horarios };
    });

    setOpen(false);
  };

  const handleClose = () => {
    setLoading(true);
    setOpen(false);
  };

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

  const handleAddNewDatesSchedules = () => {
    console.log("agregando nuevos dias y horarios");
    console.log(nuevoDiaYHorario);

    const newDayAndSchedule = [...diasYHorarios, nuevoDiaYHorario];

    console.log(newDayAndSchedule);
    setDiasYHorarios(newDayAndSchedule);
  };

  const removeHorario = (id, diaYHorarioId) => {
    if (window.confirm("Esta Seguro que desea eliminar este horario?" + id)) {
      const diasYHorariosUpdated = diasYHorarios.map((diaYHorario) => {
        if (diaYHorario.id === diaYHorarioId) {
          const horariosUpdated = diaYHorario.horarios.filter(
            (horario) => horario.id !== id
          );

          return {
            ...diaYHorario,
            horarios: horariosUpdated,
          };
        }

        return diaYHorario;
      });

      setDiasYHorarios(diasYHorariosUpdated);
    }
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
        id: "",
        dias: daysSelected,
        horarios: [
          {
            id: "",
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

          {diasYHorarios.map((diaYHorario, key) => {
            diaYHorario.id = key;
            //diaYHorario.id = uuidv4();
            return (
              <Paper className={classes}>
                <Box key={key} textAlign="center" sx={{ m: 4 }}>
                  <Box textAlign="left" sx={{ mt: 4 }}>
                    <p>Dias de la Semana</p>
                    <SelectWeekDays
                      setDaysSelected={setDaysSelected}
                      setHorariosYPrecios={setHorariosYPrecios}
                      daysSelected={daysSelected}
                      daysAndTimesId={diaYHorario.id}
                      fieldsToShow={fieldsToShow}
                    />
                  </Box>
                  <Box textAlign="left" sx={{ mt: 4 }}>
                    <p>Horarios</p>

                    <List>
                      {diaYHorario.horarios.map((horario) => (
                        <ListItem key={horario.id}>
                          <ScheduleAndPrice
                            key={key}
                            horario={horario}
                            diaYHorarioId={diaYHorario.id}
                            removeHorario={removeHorario}
                            setHorarios={setHorarios}
                            setHorariosYPrecios={setHorariosYPrecios}
                            min={min}
                            max={max}
                            fieldsToShow={fieldsToShow}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Box textAlign="center" sx={{ mt: 2, pb: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => handleAddNewSchedule(key)}
                      >
                        Agregar Mas Horarios
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            );
          })}
        </DialogContent>

        <Box textAlign="center">
          <IconButton
            color="secondary"
            aria-label="delete"
            size="large"
            disabled={
              (daysSelected
                .map((daySelected) => daySelected.selected)
                .every((d) => d === false) ||
                daysSelected
                  .map((daySelected) => daySelected.selected)
                  .every((d) => d === true)) &&
              disableAddMoreDays
            }
          >
            <AddCircleIcon
              onClick={handleAddNewDatesSchedules}
              sx={{ fontSize: 50 }}
            />
          </IconButton>
        </Box>

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
