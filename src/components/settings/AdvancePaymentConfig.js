import React, { useState } from "react";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import InstitucionService from "../../services/instituciones/InstitucionService";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";
import { useConfirm } from "material-ui-confirm";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

const BEFORE_RESERVATION = "anterior a la reserva";

const AdvancePaymentConfig = ({ props, institution }) => {
  const confirm = useConfirm();
  const [advancePaymentPeriod, setAdvancePaymentPeriod] = useState(1);
  const [value, setValue] = useState({});

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const handleChange = (event) => {
    console.log("MODIFICANDO DETALLES DE LA SEñA");
    console.log(event.target.value);
    setAdvancePaymentPeriod(event.target.value || "");
  };

  const handleMessageLoaded = (isSuccess) => {
    if (isSuccess) {
      setSnackbar({
        message: "Los Horarios se han Guardado Exitosamente !",
        severity: "success",
      });
    } else {
      setSnackbar({
        message:
          "Hubo un error al intentar guardar los Horarios. Vuelva a intentarlo",
        severity: "error",
      });
    }

    setOpen(true);
  };

  const handleSubmitChanges = async () => {
    confirm({
      title: "¿Esta Seguro que desea Guardar estos Cambios?",
      cancellationText: "Cancelar",
    })
      .then(() => {
        console.log("subiendo horarios de la institucion");

        handleUploadChanges(value);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleUploadChanges = async (data) => {
    try {
      const schedulesCreated = await InstitucionService.uploadAdvancePayment(
        institution.id,
        data
      ).then((data) => data);
      handleMessageLoaded(true);
    } catch (error) {
      handleMessageLoaded(false);
    }
  };

  return (
    <>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader
            subheader="Indique con cuanto tiempo de anticipacion se puede cancelar una reserva sin retener la seña al cliente."
            title="Detalles de la Seña"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Hasta
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={advancePaymentPeriod}
                    label="Hasta"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>INDEFINIDO</MenuItem>
                    <MenuItem value={12}>12 hs {BEFORE_RESERVATION}</MenuItem>
                    <MenuItem value={24}>1 dia {BEFORE_RESERVATION}</MenuItem>
                    <MenuItem value={48}>2 dias {BEFORE_RESERVATION}</MenuItem>
                    <MenuItem value={72}>3 dias {BEFORE_RESERVATION}</MenuItem>
                  </Select>
                  <FormHelperText>
                    Tiempo limite para Cancelar una Reserva
                  </FormHelperText>
                </FormControl>
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
            <Button
              onClick={handleSubmitChanges}
              color="primary"
              variant="contained"
            >
              Guardar Detalles de Seña
            </Button>
          </Box>
        </Card>
      </form>
      <CustomizedSnackbars
        message={snackbar.message}
        severity={snackbar.severity}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};

export default AdvancePaymentConfig;
