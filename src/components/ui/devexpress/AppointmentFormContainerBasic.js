import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Notes from "@mui/icons-material/Notes";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocationOn from "@mui/icons-material/LocationOn";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import Create from "@mui/icons-material/Create";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const PREFIX = "Demo";
// #FOLD_BLOCK
const classes = {
  content: `${PREFIX}-content`,
  header: `${PREFIX}-header`,
  closeButton: `${PREFIX}-closeButton`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  button: `${PREFIX}-button`,
  picker: `${PREFIX}-picker`,
  wrapper: `${PREFIX}-wrapper`,
  icon: `${PREFIX}-icon`,
  textField: `${PREFIX}-textField`,
  addButton: `${PREFIX}-addButton`,
};

// #FOLD_BLOCK
const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: "100%",
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: "right",
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  [`& .${classes.wrapper}`]: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));

const AppointmentFormContainerBasic = ({
  visible,
  visibleChange,
  appointmentData,
  cancelAppointment,
  target,
  onHide,
  commitChanges,
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [appointmentChanges, setAppointmentChanges] = useState({});

  const isNewAppointment = appointmentData.id === undefined;

  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges,
  };

  const pickerEditorProps = (field) => ({
    // keyboard: true,
    value: displayAppointmentData[field],
    onChange: (date) =>
      changeAppointment({
        field: [field],
        changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
    ampm: false,
    inputFormat: "DD/MM/YYYY HH:mm",
    onError: () => null,
  });

  const endDatePickerProps = pickerEditorProps("endDate");

  const applyChanges = isNewAppointment
    ? () => commitAppointment("added")
    : () => commitAppointment("changed");

  const getAppointmentData = () => {
    return appointmentData;
  };
  const getAppointmentChanges = () => {
    return appointmentChanges;
  };

  const changeAppointment = ({ field, changes }) => {
    const nextChanges = {
      ...getAppointmentChanges(),
      [field]: changes,
    };

    setAppointmentChanges(nextChanges);
  };

  const commitAppointment = (type) => {
    const appointment = {
      ...getAppointmentData(),
      ...getAppointmentChanges(),
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    setAppointmentChanges({});
  };

  const cancelChanges = () => {
    setAppointmentChanges({});
    visibleChange();
    cancelAppointment();
  };

  const startDatePickerProps = pickerEditorProps("startDate");

  const textEditorProps = (field) => ({
    variant: "outlined",
    onChange: ({ target: change }) =>
      changeAppointment({
        field: [field],
        changes: change.value,
      }),
    value: displayAppointmentData[field] || "",
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  return (
    <>
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <StyledDiv>
          <div style={{ marginTop: 75 }} className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
              size="large"
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField {...textEditorProps("title")} />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Start Date"
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...startDatePickerProps}
                />
                <DateTimePicker
                  label="End Date"
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...endDatePickerProps}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.wrapper}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="repeat"
              />
            </div>
            <div className={classes.wrapper}>
              <MailIcon className={classes.icon} color="action" />
              <TextField {...textEditorProps("Email")} />
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField {...textEditorProps("Email")} />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  commitAppointment("deleted");
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? "Create" : "Save"}
            </Button>
          </div>
        </StyledDiv>
      </AppointmentForm.Overlay>
    </>
  );
};

export default AppointmentFormContainerBasic;
