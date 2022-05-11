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

import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export const OpenAndCloseTimes = (props) => {
  const [from, setFrom] = useState(new Date("2020-01-01 8:00"));
  const [to, setTo] = useState(new Date("2020-01-01 23:00"));

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Horarios de Apertura y Cierre" />
        <Divider />
        <CardContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <MobileTimePicker
                renderInput={(params) => <TextField {...params} />}
                value={from}
                label="Horario de Apertura"
                onChange={(newValue) => {
                  setFrom(newValue);
                }}
                minTime={new Date(0, 0, 0, 8)}
                maxTime={new Date(0, 0, 0, 18, 45)}
              />
              <MobileTimePicker
                renderInput={(params) => <TextField {...params} />}
                label="Horario de Cierre"
                value={to}
                onChange={(newValue) => {
                  setTo(newValue);
                }}
                shouldDisableTime={(timeValue, clockType) => {
                  /*if (clockType === "hours" && timeValue % 2) {
                    return true;
                  }

                  return false;*/
                  return false;
                }}
              />
            </Stack>
          </LocalizationProvider>
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
            Guardar Horarios
          </Button>
        </Box>
      </Card>
    </form>
  );
};
