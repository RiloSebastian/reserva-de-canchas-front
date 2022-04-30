import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import moment from 'moment';

const ReservationCalendar = () => {
    const [value, setValue] = React.useState(moment(new Date()));

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    orientation='landscape'
                    openTo='day'
                    toolbarTitle='Seleccion la fecha'
                    value={value}
                    // @ts-expect-error Waiting for making all inner components generics
                    // shouldDisableDate={disableWeekends}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(props) => <TextField {...props} />}
                />
            </LocalizationProvider>
        </React.Fragment>
    );
}

export default ReservationCalendar
