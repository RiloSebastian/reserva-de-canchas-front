import React, { useEffect, useState } from "react";
import SchedulerFromTo from '../../schedulers/SchedulerFromTo'
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SelectWeekDays from '../../formularios-datos/SelectWeekDays';
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
import ScheduleAndPrice from '../../ScheduleAndPrice';
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 30,
    lineHeight: "30px",
}));

const DaysAndSchedulePaper = ({ diaYHorarioId, setHorarios, key }) => {

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


    const [diaYHorario, setDiaYHorario] = useState([]);

    const [diasYHorarios, setDiasYHorarios] = useState([]);

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
            /*  setHorarios((horarios) => {
              return horarios.filter((horario) => horario.id !== id);
            }); */

            setDiasYHorarios(diasYHorariosUpdated);
        }
    };

    const handleAddNewSchedule = (id) => {
        console.log("agregando nuevo horario para la card -> " + id);
        console.log(nuevoHorario);

        //const newSchedule = [...horarios, nuevoHorario];

        console.log(diasYHorarios);
        //setHorarios(newSchedule);

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
        /* setDiasYHorarios((prevState) => {
          return [
            {
              ...prevState,
              horarios: [...horarios, nuevoHorario],
            },
          ];
        }); */
    };

    return (
        <>
            <Paper className={classes}>
                <Box textAlign="center" sx={{ m: 4 }}>
                    <Box textAlign="left" sx={{ mt: 4 }}>
                        {/*<SelectDate setHorariosYPrecios={setHorariosYPrecios} />*/}
                        <p>Dias de la Semana</p>
                        <SelectWeekDays
                            //daysOptions={diaYHorario.dias}
                            setDaysSelected={setDaysSelected}
                            setHorariosYPrecios={setHorariosYPrecios}
                            daysSelected={daysSelected}
                            daysAndTimesId={diaYHorarioId}
                        />
                    </Box>
                    <Box textAlign="left" sx={{ mt: 4 }}>
                        <p>Horarios</p>
                        {diaYHorario && diaYHorario.horarios.map((horario, key) => {
                            horario.id = key;
                            return (
                                <ScheduleAndPrice
                                    key={key}
                                    horario={horario}
                                    diaYHorarioId={diaYHorarioId}
                                    removeHorario={removeHorario}
                                    setHorarios={setHorarios}
                                    setHorariosYPrecios={setHorariosYPrecios}
                                />
                            );
                        })}

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
            <SchedulerFromTo />
        </>
    )
}

export default DaysAndSchedulePaper