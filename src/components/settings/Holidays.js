import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay from "@mui/lab/PickersDay";
import startOfDay from "date-fns/startOfDay";
import FeriadoService from "../../services/feriados/FeriadoService";
import moment from "moment";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export const Holidays = (props) => {
  const [values, setValues] = useState([]);

  const findDate = (dates, date) => {
    const dateTime = date;
    return dates.find((item) => item === dateTime);
  };

  const findIndexDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.findIndex((item) => item.getTime() === dateTime);
  };

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {

    console.log("renderPickerDay")
    console.log(date)

    if (!values) {
      return <PickersDay {...pickersDayProps} />;
    }

    const selected = findDate(values, date.format("YYYY-MM-DD"));

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        selected={selected}
      />
    );
  };

  useEffect(async() => {

    const feriados = await FeriadoService.getAllFeriados().then((data) => data);

    const array = [];
    
    feriados.forEach(feriado => {
      array.push(moment(new Date(2022, feriado.mes - 1, feriado.dia)).format("YYYY-MM-DD"))
    });
    
    console.log("setValues");
    console.log(array);
    setValues(array)

  }, [])


  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Feriados" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  label="Week picker"
                  value={values}
                  onChange={(newValue) => {
                    //copying the values array
                    /* const array = [...values];
                    const date = startOfDay(newValue);
                    const index = findIndexDate(array, date);
                    if (index >= 0) {
                      array.splice(index, 1);
                    } else {
                      array.push(date);
                    }
                    console.log(array);
                    setValues(array); */
                  }}
                  renderDay={renderPickerDay}
                  renderInput={(params) => <TextField {...params} />}
                  //inputFormat="'Week of' MMM d"
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Guardar Feriados
          </Button>
        </Box>
      </Card>
    </form>
  );
};
