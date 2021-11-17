import React from 'react';
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


const useStyles = makeStyles((theme) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 30,
    lineHeight: '30px',
}));

const ScheduleAndPrice = () => {

    const classes = useStyles();

    const [desde, setDesde] = React.useState(moment(new Date('2018-01-01T00:00:00.000Z')));
    const [hasta, setHasta] = React.useState(moment(new Date('2018-01-01T00:00:00.000Z')));

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Paper className={classes}>
            <Grid container spacing={3} alignItems="center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs>
                        <MobileTimePicker
                            label="Desde"
                            value={desde}
                            onChange={(newValue) => {
                                setDesde(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs>
                        <MobileTimePicker
                            label="Hasta"
                            value={hasta}
                            onChange={(newValue) => {
                                setHasta(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </LocalizationProvider >

                <Grid item xs>
                    <TextField
                        label="Precio /hr"
                        id="outlined-start-adornment"
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" sx={{ color: pink[500] }} />
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Grid >
            </Grid >
        </Paper>
    )
}

export default ScheduleAndPrice
