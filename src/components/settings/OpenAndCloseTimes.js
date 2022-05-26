import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import SchedulerFromTo from "../schedulers/SchedulerFromTo";
import { makeStyles } from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  'Todos los Días',
  'Lunes a Viernes',
  'Sabados',
  'Domingos',
  'Feriados',
];

function getStyles(day1, day, theme) {
  return {
    fontWeight:
      day.indexOf(day1) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const OpenAndCloseTimes = ({ props, state, dispatch }) => {

  const useStyles = makeStyles((theme) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 30,
    lineHeight: "30px",
  }));

  const classes = useStyles();

  const theme = useTheme();
  const [day, setDay] = useState([]);

  const handleChange = (e) => {
    console.log("handleChange")
    console.log(day)
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const [from, setFrom] = useState(new Date("2020-01-01 8:00"));
  const [to, setTo] = useState(new Date("2020-01-01 23:00"));

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Horarios de Apertura y Cierre" />
        <Divider />
        <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">Dias</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    name="schedules"
                    value={state.schedules}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Dias" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((day) => (
                          <Chip key={day} label={day} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {days.map((day) => (
                      <MenuItem
                        key={day}
                        value={day}
                        style={getStyles(day, day, theme)}
                      >
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <SchedulerFromTo />
            </Grid>
        </CardContent >
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
