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

function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === "" ? null : value}
    />
  );
}

function TimePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TimePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === "" ? null : value}
    />
  );
}

const onSubmit = async (values) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
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

const AdvancePaymentConfig = (props) => {
  const [advancePaymentPeriod, setAdvancePaymentPeriod] = useState(24);

  const handleChange = (event) => {
    setAdvancePaymentPeriod(event.target.value || "");
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {};

  const handleReset = () => {};

  const [values, setValues] = useState({
    firstName: "Palermo Tenis",
    address: "Honduras 5460",
    email: "palermotenis@email.com",
    phone: "1146584589",
    state: "Alabama",
    country: "USA",
  });

  return (
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
          <Button color="primary" variant="contained">
            Guardar Detalles de Seña
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AdvancePaymentConfig;
