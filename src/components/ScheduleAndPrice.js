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
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
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
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 30,
    lineHeight: '30px',
}));

const ScheduleAndPrice = ({ horario, removeHorario, setHorarios, setHorariosYPrecios }) => {

    const { id, precio, enabled, from, to } = horario;

    const classes = useStyles();

    //const [desde, setDesde] = useState(moment());
    //const [hasta, setHasta] = useState(moment());

    //const handleChange = (event) => {
    // setHorarioHabilitado(event.target.checked);
    //};

    const handleChange = (e) => {

        if (e.target.type === 'checkbox') {
            setHorarios((horarios) => {

                let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, [e.target.name]: e.target.checked } : horario);

                return [...horariosUpdated];

            });
        } else {

            setHorarios((horarios) => {

                let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, [e.target.name]: e.target.value } : horario);

                return [...horariosUpdated];
            });
        }

    }

    /* useEffect(() => {
 
         let fromTime = moment(moment(from, 'HH:mm'));
         let toTime = moment(moment(to, 'HH:mm'));
 
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
     }, [from, to])*/

    useEffect(() => {

        setHorarios((horarios) => {

            let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, ['from']: from } : horario);

            return [...horariosUpdated];
        });

        setHorarios((horarios) => {

            let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, ['to']: to } : horario);

            return [...horariosUpdated];
        });

    }, []);

    return (
        <Paper className={classes}>
            <Grid container spacing={3} alignItems="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs>
                        <MobileTimePicker
                            label="Desde"
                            name="from"
                            value={from}
                            onChange={(newValue) => {

                                /* setHorariosYPrecios((body) => {
                                     return { ...body, ['schedules']: horarios };
                                 });*/

                                setHorarios((horarios) => {

                                    let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, ['from']: newValue } : horario);

                                    return [...horariosUpdated];
                                });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs>
                        <MobileTimePicker
                            label="Hasta"
                            name="to"
                            value={to}
                            onChange={(newValue) => {

                                setHorarios((horarios) => {

                                    let horariosUpdated = horarios.map((horario) => horario.id === id ? { ...horario, ['to']: newValue } : horario);

                                    return [...horariosUpdated];
                                });

                                /*     setHorariosYPrecios((body) => {
     
                                         return { ...body, ['schedules']: horarios };
                                     });*/
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            shouldDisableTime={(timeValue, clockType) => {

                                if (clockType === 'minutes' && timeValue !== from.getMinutes()) {
                                    return true;
                                }

                                return false;
                            }}
                            minTime={new Date(new Date(from).setHours(from.getHours() + 1))}
                        />
                    </Grid>
                </LocalizationProvider >

                <Grid item xs>
                    <TextField
                        name='price'
                        value={precio}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="Precio /hr"
                        onChange={handleChange}
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
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
                        control={<Switch name='enabled' onChange={handleChange} checked={enabled} color="primary" />}
                        label={enabled ? 'Activo' : 'Inactivo'}
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
