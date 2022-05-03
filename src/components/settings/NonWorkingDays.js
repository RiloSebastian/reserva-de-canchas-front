import { useState } from "react";
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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay from "@mui/lab/PickersDay";
import startOfDay from "date-fns/startOfDay";

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

export const NonWorkingDays = (props) => {
  const [values, setValues] = useState([]);

  const findDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.find((item) => item.getTime() === dateTime);
  };

  const findIndexDate = (dates, date) => {
    const dateTime = date.getTime();
    return dates.findIndex((item) => item.getTime() === dateTime);
  };

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!values) {
      return <PickersDay {...pickersDayProps} />;
    }

    const selected = findDate(values, date);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        selected={selected}
      />
    );
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Dias No Laborales" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="Week picker"
                value={values}
                onChange={(newValue) => {
                  //copying the values array
                  const array = [...values];
                  const date = startOfDay(newValue);
                  const index = findIndexDate(array, date);
                  if (index >= 0) {
                    array.splice(index, 1);
                  } else {
                    array.push(date);
                  }
                  console.log(array);
                  setValues(array);
                }}
                renderDay={renderPickerDay}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="'Week of' MMM d"
              />
            </LocalizationProvider>
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
            Guardar Dias No Laborales
          </Button>
        </Box>
      </Card>
    </form>
  );
};
