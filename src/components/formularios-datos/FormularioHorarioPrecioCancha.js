import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
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
import ScheduleAndPrice from "./../ScheduleAndPrice";
import SelectWeekDays from "./SelectWeekDays";

const FormularioHorarioPrecioCancha = ({
  open,
  setOpen,
  horariosYPrecios,
  setHorariosYPrecios,
  isMultipleEdit,
}) => {
  const { excluirDiasNoLaborales, porcentajeSenia } = horariosYPrecios;

  //const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [withSenia, setWithSenia] = useState(false);

  const [horario, setHorario] = useState({
    id: "",
    desde: moment(new Date("2018-01-01T00:00:00.000Z")),
    hasta: moment(new Date("2018-01-01T00:00:00.000Z")),
    precio: "",
    horarioHabilitado: true,
  });

  const [senia, setSenia] = useState();

  const [horarios, setHorarios] = useState([]);

  const [dates, setDates] = useState([]);

  const nuevoHorario = {
    id: "",
    from: new Date(),
    to: new Date(new Date().setHours(new Date().getHours() + 1)),
    price: "",
    enabled: true,
  };

  useEffect(() => {
    //traer los horarios guardados por la institucion
    //getHorarios();

    const newSchedule = [...horarios, nuevoHorario];
    setHorarios(newSchedule);
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setHorariosYPrecios((form) => {
        return { ...form, [e.target.name]: e.target.checked };
      });
    } else {
      setHorariosYPrecios((form) => {
        return { ...form, [e.target.name]: e.target.value };
      });
    }
  };

  const handleGuardarHorariosYPrecios = () => {
    setLoading(true);

    setHorariosYPrecios((body) => {
      return { ...body, ["schedules"]: horarios };
    });

    // saveHorarios(horarios);

    setOpen(false);
  };

  const handleClose = () => {
    setLoading(true);
    setOpen(false);
  };

  const handleAddNewSchedule = () => {
    console.log("agregando nuevo horario");
    console.log(nuevoHorario);

    const newSchedule = [...horarios, nuevoHorario];

    console.log(newSchedule);
    setHorarios(newSchedule);
  };

  const removeHorario = (id) => {
    if (window.confirm("Esta Seguro que desea eliminar este horario?" + id)) {
      setHorarios((horarios) => {
        return horarios.filter((horario) => horario.id !== id);
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Precios Y Horarios</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Configure las fechas, horarios y precios para las canchas
            seleccionadas.
          </DialogContentText>

          <Box textAlign="center" sx={{ mt: 4 }}>
            {/*<SelectDate setHorariosYPrecios={setHorariosYPrecios} />*/}
            <p>Dias de la Semana</p>
            <SelectWeekDays setHorariosYPrecios={setHorariosYPrecios} />
          </Box>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ m: 1 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="excluirDiasNoLaborales"
                      checked={excluirDiasNoLaborales}
                      onChange={handleChange}
                      defaultChecked
                    />
                  }
                  label="Excluir dias no Laborales"
                />
              </FormGroup>
            </Box>
          </Grid>
          {isMultipleEdit && (
            <Box textAlign="left" sx={{ m: 4 }}>
              <TextField
                disabled={withSenia}
                label="Porcentaje de Seña"
                id="porcentaje"
                sx={{ m: 1, width: "25ch" }}
                name="senia"
                onChange={handleChange}
                value={senia}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {horarios.map((horario, key) => {
            horario.id = key;

            return (
              <Box key={key} textAlign="center" sx={{ m: 4 }}>
                <ScheduleAndPrice
                  key={key}
                  horario={horario}
                  removeHorario={removeHorario}
                  setHorarios={setHorarios}
                  setHorariosYPrecios={setHorariosYPrecios}
                />
              </Box>
            );
          })}
        </DialogContent>

        <Box textAlign="center">
          <IconButton color="secondary" aria-label="delete" size="large">
            <AddCircleIcon
              onClick={handleAddNewSchedule}
              sx={{ fontSize: 50 }}
            />
          </IconButton>
        </Box>

        <Box textAlign="center" sx={{ m: 2 }}>
          <LoadingButton
            color="secondary"
            onClick={handleGuardarHorariosYPrecios}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Guardar Horarios y Precios
          </LoadingButton>
        </Box>
      </Dialog>
    </div>
  );
};

export default FormularioHorarioPrecioCancha;
