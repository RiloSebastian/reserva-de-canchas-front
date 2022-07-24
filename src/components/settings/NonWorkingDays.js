import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PickersDay from "@mui/lab/PickersDay";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
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
import startOfDay from "date-fns/startOfDay";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { useConfirm } from "material-ui-confirm";
import { uploadNonWorkingDays } from "../../actions/institution";
import CustomizedSnackbars from "../ui/CustomizedSnackbars";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

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

export const NonWorkingDays = ({ props, institution }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const [values, setValues] = useState([]);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

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

  const handleMessageLoaded = (isSuccess) => {
    if (isSuccess) {
      setSnackbar({
        message: "Los Dias no Laborales se han Guardado Exitosamente !",
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
        console.log("SUBIENDO LOS DIAS NO LABORALES DE LA INSTITUCION");
        const diasNoLaborales = [];
        values.forEach((element) => {
          diasNoLaborales.push(element.getTime());
        });
        handleUploadChanges(values);
      })
      .catch(() => console.log("Deletion cancelled."));
  };

  const handleUploadChanges = async (data) => {
    dispatch(uploadNonWorkingDays(institution.id, data, true));
    /* try {
      const images = await InstitucionService.uploadNonWorkingDays(
        institution.id,
        data
      ).then((data) => data);

      handleMessageLoaded(true);
    } catch (error) {
      handleMessageLoaded(false);
    } */
  };

  useEffect(() => {
    if (institution.freeDays) {
      let daysOff = [];
      institution.freeDays.map((dayOff) => {
        daysOff.push(new Date(dayOff));
      });
      setValues(daysOff);
    }
  }, [institution.freeDays]);

  return (
    <>
      <form autoComplete="off" noValidate {...props}>
        <Card>
          <CardHeader title="Dias No Laborales" />
          <Divider />
          <CardContent>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Seleccione los Dias no Laborales de la Institucion
                  </Typography>
                  <Demo>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
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
                            inputFormat="'dd-MMMM-yyyyy"
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Demo>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Fechas no laborales Seleccionadas
                  </Typography>
                  <Demo>
                    <List dense={dense}>
                      {values.map((diaNoLaboral) => (
                        <ListItem
                          secondaryAction={
                            <IconButton
                              onClick={(newValue) => {
                                //copying the values array
                                console.log("ELIMINANDO DIA NO LABORAL");
                                console.log(diaNoLaboral);
                                const array = [...values];
                                const date = startOfDay(diaNoLaboral);
                                const index = findIndexDate(
                                  array,
                                  diaNoLaboral
                                );
                                if (index >= 0) {
                                  array.splice(index, 1);
                                } else {
                                  array.push(date);
                                }
                                console.log(array);
                                setValues(array);
                              }}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <EventIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={diaNoLaboral.toDateString()}
                            secondary={secondary ? "Secondary text" : null}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Demo>
                </Grid>
              </Grid>
            </Box>
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
              Guardar Dias No Laborales
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
