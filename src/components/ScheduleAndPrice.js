import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 30,
    lineHeight: '30px',
}));

const ScheduleAndPrice = ({ horario, removeHorario, setHorarios, setHorariosYPrecios }) => {

    const { id, precio, horarioHabilitado, desde, hasta } = horario;

    const classes = useStyles();

    //const [desde, setDesde] = useState(moment());
    //const [hasta, setHasta] = useState(moment());

    //const handleChange = (event) => {
    // setHorarioHabilitado(event.target.checked);
    //};

    const handleChange = (e) => {

        if (e.target.type === 'checkbox') {
            setHorarios((horarios) => {

                console.log('modificando horarios')
                console.log(horarios)

                let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, [e.target.name]: e.target.checked } : horario);

                console.log('despues de modificarlos')
                console.log(horariosUpdated)

                return [...horariosUpdated];

            });
        } else {

            setHorarios((horarios) => {

                console.log('modificando horarios')
                console.log(horarios)

                let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, [e.target.name]: e.target.value } : horario);

                console.log('despues de modificarlos')
                console.log(horariosUpdated)

                return [...horariosUpdated];
            });
        }

    }

    useEffect(() => {

        let fromTime = moment(moment(desde, 'HH:mm'));
        let toTime = moment(moment(hasta, 'HH:mm'));

        console.log(fromTime)
        console.log(toTime)

        let duration = moment.duration(toTime.diff(fromTime));

        console.log(duration)

        let diff = duration.hours();
        let array = [];

        for (var i = 0; diff > i; i++) {
            let result = moment(fromTime).add(i, 'hours').format('HH:mm')
            array.push({
                result
            })
        }

        console.log(array)
    }, [desde, hasta])

    useEffect(() => {
        console.log('en useeffect')
        console.log(horario)
    }, [])

    return (
        <Paper className={classes}>
            <Grid container spacing={3} alignItems="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs>
                        <MobileTimePicker
                            label="Desde"
                            name="desde"
                            value={desde}
                            onChange={(newValue) => {
                                setHorarios((horarios) => {

                                    let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, ['desde']: newValue } : horario);

                                    return [...horariosUpdated];
                                });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs>
                        <MobileTimePicker
                            label="Hasta"
                            name="hasta"
                            value={hasta}
                            onChange={(newValue) => {
                                setHorarios((horarios) => {

                                    let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, ['hasta']: newValue } : horario);

                                    return [...horariosUpdated];
                                });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            shouldDisableTime={(timeValue, clockType) => {

                                console.log('desde')
                                console.log(desde)
                                if (clockType === 'minutes' && timeValue !== desde.getMinutes()) {
                                    return true;
                                }

                                return false;
                            }}
                            minTime={new Date(new Date(desde).setHours(desde.getHours() + 1))}
                        />
                    </Grid>
                </LocalizationProvider >

                <Grid item xs>
                    <TextField
                        name='precio'
                        value={precio}
                        label="Precio /hr"
                        onChange={handleChange}
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs>
                    {/*<Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />*/}
                    <FormControlLabel
                        control={<Switch name='horarioHabilitado' onChange={handleChange} checked={horarioHabilitado} color="primary" />}
                        label={horarioHabilitado ? 'Activo' : 'Inactivo'}
                        labelPlacement="activo"
                    />
                </Grid >
                <Grid item xs>
                    <IconButton onClick={() => { removeHorario(id) }} aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" sx={{ color: pink[500] }} />
                    </IconButton>
                </Grid>
            </Grid >
        </Paper>
    )
}

export default ScheduleAndPrice
