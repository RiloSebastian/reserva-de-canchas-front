import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';

const SelectDate = () => {
    const [desde, setDesde] = useState(moment(new Date()));
    const [hasta, setHasta] = useState(moment(new Date()));

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={2}>
                <DesktopDatePicker
                    label="desde"
                    value={desde}
                    minDate={moment(new Date('2017-01-01'))}
                    onChange={(newValue) => {
                        setDesde(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="hasta"
                    value={hasta}
                    minDate={moment(new Date('2017-01-01'))}
                    onChange={(newValue) => {
                        setHasta(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default SelectDate
