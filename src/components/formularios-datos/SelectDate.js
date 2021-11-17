import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Box from '@mui/material/Box';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import Grid from '@mui/material/Grid';

const SelectDate = ({ setDates }) => {

    const [desde, setDesde] = useState(moment(new Date()));
    const [hasta, setHasta] = useState(moment(new Date()));

    useEffect(() => {

        let dates = getDates(desde, hasta);

        setDates(dates);

    }, [desde, hasta]);

    const getDates = (startDate, stopDate) => {
        let dateArray = [];
        let currentDate = moment(startDate);
        let lastDate = moment(stopDate);
        while (currentDate <= lastDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <MobileDatePicker
                        label="Desde"
                        value={desde}
                        onChange={(newValue) => {
                            setDesde(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MobileDatePicker
                        label="Hasta"
                        value={hasta}
                        onChange={(newValue) => {
                            setHasta(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}

export default SelectDate
