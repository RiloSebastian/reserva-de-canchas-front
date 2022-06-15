import React, { useEffect, useState } from "react";
import SchedulerFromTo from "../../schedulers/SchedulerFromTo";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SelectWeekDays from "../../formularios-datos/SelectWeekDays";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import moment from "moment";
import ScheduleAndPrice from "../../ScheduleAndPrice";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 30,
  lineHeight: "30px",
}));

const DaysAndSchedulePaper = ({
  diaYHorario,
  diaYHorarioId,
  setHorario,
  daysSelected,
  setDaysSelected,
  handleChangeHorarios,
}) => {

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <SelectWeekDays
                setDaysSelected={setDaysSelected}
                setHorarios={setHorario}
                daysSelected={daysSelected}
                daysAndTimesId={diaYHorarioId}
                diaYHorario={diaYHorario}
              />
            </Grid>
            <Grid item>
              <Box textAlign={"center"}>
                <p>Horarios</p>
                <SchedulerFromTo handleChangeHorarios={handleChangeHorarios} diaYHorarioId={diaYHorario.id} from={diaYHorario.horario.from} to={diaYHorario.horario.to} />
              </Box>
              <Box textAlign="center" sx={{ mt: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                //onClick={() => handleAddNewSchedule(key)}
                >
                  Agregar Mas Horarios
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DaysAndSchedulePaper;
