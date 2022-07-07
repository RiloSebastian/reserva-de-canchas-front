import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { connectProps } from "@devexpress/dx-react-core";
import { blue, green, orange, red, yellow } from "@mui/material/colors";
import { styled, darken, alpha, lighten } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TableCell from "@mui/material/TableCell";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {
  ViewState,
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
} from "@devexpress/dx-react-scheduler";
import classNames from "clsx";
import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  Resources,
  DragDropProvider,
  DayView,
  WeekView,
  ViewSwitcher,
  GroupingPanel,
  ConfirmationDialog,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import WbSunny from "@mui/icons-material/WbSunny";
import FilterDrama from "@mui/icons-material/FilterDrama";
import Opacity from "@mui/icons-material/Opacity";
import ColorLens from "@mui/icons-material/ColorLens";
import { owners } from "../../utils/data/tasks";
import { institutionConfigs } from "../../assets/mocks/institutionConfigs";
import { reservations } from "./appointments/appointments";
import { TodayButtonMessages } from "./localization-messages/TodayButtonMessages";
import { ConfirmationDialogMessages } from "./localization-messages/ConfirmationDialogMessages";
import DataCell from "../../components/schedulers/DataCell";
import Utils from "../../utils/utils";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
import { getInstitutionSchedules } from "../../actions/institution";
import {
  validateEndtDayTime,
  validateStartDayTime,
} from "../../validations/validationTime";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { LOAD_INSTITUTION_TIMES } from "../../actions/types";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppointmentFormContainerBasic from "../../components/ui/devexpress/AppointmentFormContainerBasic";
import { set } from "date-fns";
import { AppointmentFormMessages } from "./localization-messages/AppointmentFormMessages";
import AppointmentFormActions from "../../components/ui/devexpress/AppointmentFormActions";

moment.locale("es");

const PREFIX = "Demo";

const classes = {
  cell: `${PREFIX}-cell`,
  content: `${PREFIX}-content`,
  text: `${PREFIX}-text`,
  textWeek: `${PREFIX}-textWeek`,
  sun: `${PREFIX}-sun`,
  cloud: `${PREFIX}-cloud`,
  rain: `${PREFIX}-rain`,
  sunBack: `${PREFIX}-sunBack`,
  cloudBack: `${PREFIX}-cloudBack`,
  rainBack: `${PREFIX}-rainBack`,
  opacity: `${PREFIX}-opacity`,
  appointment: `${PREFIX}-appointment`,
  apptContent: `${PREFIX}-apptContent`,
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  flexContainer: `${PREFIX}-flexContainer`,
  tooltipContent: `${PREFIX}-tooltipContent`,
  tooltipText: `${PREFIX}-tooltipText`,
  title: `${PREFIX}-title`,
  icon: `${PREFIX}-icon`,
  circle: `${PREFIX}-circle`,
  textCenter: `${PREFIX}-textCenter`,
  dateAndTitle: `${PREFIX}-dateAndTitle`,
  titleContainer: `${PREFIX}-titleContainer`,
  container: `${PREFIX}-container`,
  weekendCell: `${PREFIX}-weekendCell`,
  weekendCellAvailable: `${PREFIX}-weekendCellAvailable`,
  weekEnd: `${PREFIX}-weekEnd`,
  nonWorkingCell: `${PREFIX}-nonWorkingCell`,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getBorder = (theme) =>
  `1px solid ${
    theme.palette.mode === "light"
      ? lighten(alpha(theme.palette.divider, 1), 0.88)
      : darken(alpha(theme.palette.divider, 1), 0.68)
  }`;

const DayScaleCell = (props) => (
  <MonthView.DayScaleCell
    {...props}
    style={{ textAlign: "center", fontWeight: "bold" }}
  />
);

// #FOLD_BLOCK
const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekEnd}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
  })
);

// #FOLD_BLOCK
const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
  ({ theme: { palette } }) => ({
    [`&.${classes.weekendCell}`]: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      "&:hover": {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      "&:focus": {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
    },
    [`&.${classes.nonWorkingCell}`]: {
      backgroundColor: "#9b6467!important",
    },
  })
);

const isRestTime = (date) =>
  date.getDay() === 0 || date.getDay() === 6 || date.getHours() === 13;

// #FOLD_BLOCK
const StyledOpacity = styled(Opacity)(() => ({
  [`&.${classes.rain}`]: {
    color: "#4FC3F7",
  },
}));
// #FOLD_BLOCK
const StyledWbSunny = styled(WbSunny)(() => ({
  [`&.${classes.sun}`]: {
    color: "#FFEE58",
  },
}));
// #FOLD_BLOCK
const StyledFilterDrama = styled(FilterDrama)(() => ({
  [`&.${classes.cloud}`]: {
    color: "#90A4AE",
  },
}));

// #FOLD_BLOCK
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.cell}`]: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    borderLeft: getBorder(theme),
    "&:first-of-type": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
  [`&.${classes.sunBack}`]: {
    backgroundColor: "#FFFDE7",
  },
  [`&.${classes.cloudBack}`]: {
    backgroundColor: "#ECEFF1",
  },
  [`&.${classes.rainBack}`]: {
    backgroundColor: "#E1F5FE",
  },
  [`&.${classes.opacity}`]: {
    opacity: "0.5",
  },
}));
// #FOLD_BLOCK
const StyledDivText = styled("div")(() => ({
  [`&.${classes.text}`]: {
    padding: "0.5em",
    textAlign: "center",
  },
}));
// #FOLD_BLOCK
const StyledWeekDivText = styled("div")(() => ({
  [`&.${classes.textWeek}`]: {
    textAlign: "center",
  },
}));
// #FOLD_BLOCK
const StyledDivContent = styled("div")(() => ({
  [`&.${classes.content}`]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
}));

// #FOLD_BLOCK
const StyledAppointmentsAppointment = styled(Appointments.Appointment)(() => ({
  [`&.${classes.appointment}`]: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6,
    },
  },
}));

// #FOLD_BLOCK
const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    margin: "0 auto",
  },
}));

// #FOLD_BLOCK
const StyledAppointmentsAppointmentContent = styled(
  Appointments.AppointmentContent
)(() => ({
  [`&.${classes.apptContent}`]: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
    },
  },
}));

const appointments = [
  {
    id: 0,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 23, 9, 30),
    endDate: new Date(2018, 6, 23, 11, 30),
    ownerId: 1,
  },
  {
    id: 1,
    title: "Monthly Planning",
    startDate: new Date(2018, 5, 28, 9, 30),
    endDate: new Date(2018, 5, 28, 11, 30),
    ownerId: 1,
  },
  {
    id: 2,
    title: "Recruiting students",
    startDate: new Date(2018, 6, 9, 12, 0),
    endDate: new Date(2018, 6, 9, 13, 0),
    ownerId: 2,
  },
  {
    id: 3,
    title: "Oil Painting",
    startDate: new Date(2018, 6, 18, 14, 30),
    endDate: new Date(2018, 6, 18, 15, 30),
    ownerId: 2,
  },
  {
    id: 4,
    title: "Open Day",
    startDate: new Date(2018, 6, 20, 12, 0),
    endDate: new Date(2018, 6, 20, 13, 35),
    ownerId: 6,
  },
  {
    id: 5,
    title: "Watercolor Landscape",
    startDate: new Date(2018, 6, 6, 13, 0),
    endDate: new Date(2018, 6, 6, 14, 0),
    rRule: "FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816",
    exDate: "20180713T100000Z,20180727T100000Z",
    ownerId: 2,
  },
  {
    id: 6,
    title: "Meeting of Instructors",
    startDate: new Date(2018, 5, 28, 12, 0),
    endDate: new Date(2018, 5, 28, 12, 30),
    rRule: "FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727",
    exDate: "20180705T090000Z,20180719T090000Z",
    ownerId: 5,
  },
  {
    id: 7,
    title: "Oil Painting for Beginners",
    startDate: new Date(2018, 6, 3, 11, 0),
    endDate: new Date(2018, 6, 3, 12, 0),
    rRule: "FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801",
    exDate: "20180710T080000Z,20180724T080000Z",
    ownerId: 3,
  },
  {
    id: 8,
    title: "Watercolor Workshop",
    startDate: new Date(2018, 6, 9, 11, 0),
    endDate: new Date(2018, 6, 9, 12, 0),
    ownerId: 3,
  },
];

const resources = [
  {
    fieldName: "ownerId",
    title: "Owners",
    instances: owners,
  },
];

const WeatherIcon = ({ id }) => {
  switch (id) {
    case 0:
      return <StyledOpacity className={classes.rain} fontSize="large" />;
    case 1:
      return <StyledWbSunny className={classes.sun} fontSize="large" />;
    case 2:
      return <StyledFilterDrama className={classes.cloud} fontSize="large" />;
    default:
      return null;
  }
};

// #FOLD_BLOCK
const CellBase = React.memo(
  ({
    startDate,
    formatDate,
    otherMonth,
    // #FOLD_BLOCK
  }) => {
    const iconId = Math.abs(Math.floor(Math.sin(startDate.getDate()) * 10) % 3);
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
      ? { day: "numeric", month: "long" }
      : { day: "numeric" };
    return (
      <StyledTableCell
        tabIndex={0}
        className={classNames({
          [classes.cell]: true,
          [classes.rainBack]: iconId === 0,
          [classes.sunBack]: iconId === 1,
          [classes.cloudBack]: iconId === 2,
          [classes.opacity]: otherMonth,
        })}
      >
        <StyledDivContent className={classes.content}>
          <WeatherIcon classes={classes} id={iconId} />
        </StyledDivContent>
        <StyledDivText className={classes.text}>
          {formatDate(startDate, formatOptions)}
        </StyledDivText>
      </StyledTableCell>
    );
  }
);

const CellWeekBase = React.memo(({ startDate, endDate }) => {
  return (
    <StyledWeekDivText className={classes.textWeek}> $ 1200</StyledWeekDivText>
  );

  /* return (
      <StyledTableCell className={classNames({
        [classes.rainBack]: true,
      })}>
        <StyledWeekDivText className={classes.textWeek}> $ 1200</StyledWeekDivText>
      </StyledTableCell>
    ); */
});

const TimeTableCell = CellBase;

const TimeTableCellWeek2 = CellWeekBase;

const Appointment = ({ ...restProps }) => {
  console.log("devolviendo appointments");
  console.log({ ...restProps.data });

  const appointmentData = { ...restProps };

  return (
    <StyledAppointmentsAppointment
      {...restProps}
      className={classes.appointment}
    />
  );
};

const AppointmentContent = ({ ...restProps }) => (
  <StyledAppointmentsAppointmentContent
    {...restProps}
    className={classes.apptContent}
  />
);

const filterTasks = (items, sport_id) =>
  items.filter((task) => task.sport_id === sport_id);

const filterCourts = (courts, sport_id) =>
  courts.filter((court) => court.sport_id === sport_id);

const gettingCourts = () => {
  let courtsArray = [];

  institutionConfigs.sports.forEach((sport) => {
    sport.courts.forEach((court) => {
      courtsArray.push({
        ...court,
        text: court.name,
        id: court.court_id,
        sport_id: court.sport_id,
      });
    });
  });

  return courtsArray;
};
const courts = gettingCourts();

const gettingSports = () => {
  let sportsArray = [];

  institutionConfigs.sports.forEach((sport) => {
    sportsArray.push({
      ...sport,
      color: green,
      text: sport.name,
      id: sport.sport_id,
    });
  });

  return sportsArray;
};
const sports = gettingSports();

const ReservaGridCustom2 = () => {
  const dispatch = useDispatch();

  let history = useHistory();

  //const institution = useSelector((state) => state.institution);

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [previousAppointment, setPreviousAppointment] = useState(undefined);
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const [isNewAppointment, setIsNewAppointment] = useState(false);

  const [institutionHasCourts, setInstitutionHasCourts] = useState(true);

  const [startDayHour, setStartDayHour] = useState(7);
  const [endDayHour, setEndDayHour] = useState(23);
  const [busyTimes, setBusyTimes] = useState([]);

  const [workingDays, setWorkingDays] = useState([]);

  // const [allowAdding, setAllowAdding] = useState(true);

  const [addedAppointment, setAddedAppointment] = useState({});

  const [appointmentChanges, setAppointmentChanges] = useState({});

  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const [showAlert, setShowAlert] = useState(false);

  const DayScaleCellWeek = ({ ...restProps }) => {
    const { startDate } = restProps;
    if (Utils.isWeekend(startDate, workingDays)) {
      return (
        <StyledWeekViewDayScaleCell
          {...restProps}
          className={classes.weekEnd}
        />
      );
    }
    return <StyledWeekViewDayScaleCell {...restProps} />;
  };

  const TimeTableCellWeek = ({ onDoubleClick, ...restProps }) => {
    const { startDate, className } = restProps;
    const isDisableDate =
      Utils.isHoliday(startDate) || Utils.isWeekend(startDate, workingDays);
    const isDinner = Utils.isDinner(startDate, busyTimes);

    let allowAdding = true;

    if (isDisableDate || isDinner) {
      allowAdding = false;
    }

    return (
      <StyledWeekViewTimeTableCell
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
        {...restProps}
      >
        <DataCell
          isDisableDate={isDisableDate}
          isDinner={isDinner}
          allowAdding={allowAdding}
          itemData={{ ...restProps }}
          //busyTimes={busyTimes}
        />
      </StyledWeekViewTimeTableCell>
    );
  };

  /*  const TimeTableCellWeek = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => {
     const allowAdding = true
     return (
       < StyledWeekViewTimeTableCell
         onDoubleClick={allowAdding ? onDoubleClick : undefined}
         {...restProps}
       >
         <DataCell
           // setAllowAdding={setAllowAdding}
           workingDays={workingDays}
           itemData={{ ...restProps }}
           busyTimes={busyTimes}
         />
       </StyledWeekViewTimeTableCell >
     )
   }
   ), []); */

  const [grouping, setGrouping] = useState([
    {
      resourceName: "court_id",
    },
  ]);

  const filterTasks = (items, sport_id) =>
    items.filter((task) => task.sport_id === sport_id);

  const [appointments, setAppointments] = useState([
    {
      id: 0,
      title: "Sebastian",
      court_id: [1],
      sport_id: 1,
      price: 1200.0,
      startDate: new Date(2018, 6, 23, 9, 30),
      endDate: new Date(2018, 6, 23, 11, 30),
    },
    {
      id: 1,
      title: "Martiniano",
      court_id: [4],
      sport_id: 2,
      startDate: new Date(2018, 5, 28, 9, 30),
      endDate: new Date(2018, 5, 28, 11, 30),
    },
    {
      id: 2,
      title: "Alejandro",
      court_id: [1],
      sport_id: 1,
      price: 1200.0,
      startDate: new Date(2018, 6, 9, 12, 0),
      endDate: new Date(2018, 6, 9, 13, 0),
    },
    {
      id: 3,
      title: "Franco",
      court_id: [5],
      sport_id: 2,
      price: 1200.0,
      startDate: new Date(2018, 6, 18, 14, 30),
      endDate: new Date(2018, 6, 18, 15, 30),
    },
    {
      id: 4,
      title: "Claudio",
      court_id: [4],
      sport_id: 2,
      price: 1200.0,
      startDate: new Date(2018, 6, 20, 12, 0),
      endDate: new Date(2018, 6, 20, 13, 35),
    },
    {
      id: 5,
      title: "Claudio",
      court_id: [5],
      sport_id: 2,
      price: 1200.0,
      startDate: new Date(2018, 6, 6, 13, 0),
      endDate: new Date(2018, 6, 6, 14, 0),
      rRule: "FREQ=WEEKLY;BYDAY=FR;UNTIL=20180816",
      exDate: "20180713T100000Z,20180727T100000Z",
    },
    {
      id: 6,
      title: "Maria Belen",
      court_id: [4],
      sport_id: 2,
      price: 1200.0,
      startDate: new Date(2018, 5, 28, 12, 0),
      endDate: new Date(2018, 5, 28, 12, 30),
      rRule: "FREQ=WEEKLY;BYDAY=TH;UNTIL=20180727",
      exDate: "20180705T090000Z,20180719T090000Z",
    },
    {
      id: 7,
      title: "Agustin",
      court_id: [4],
      sport_id: 2,
      price: 1200.0,
      startDate: new Date(2018, 6, 3, 11, 0),
      endDate: new Date(2018, 6, 3, 12, 0),
      rRule: "FREQ=WEEKLY;BYDAY=TU;UNTIL=20180801",
      exDate: "20180710T080000Z,20180724T080000Z",
    },
    {
      id: 8,
      title: "Roger Federer",
      court_id: [5],
      sport_id: 2,
      price: 1200.0,
      startDate: new Date(2018, 6, 9, 11, 0),
      endDate: new Date(2018, 6, 9, 12, 0),
    },
  ]);
  const [currentSport, setCurrentSport] = useState(0);

  const [resources, setResources] = useState([
    {
      fieldName: "court_id",
      title: "Courts",
      instances: courts,
      allowMultiple: true,
    },
  ]);

  const sportChange = (value) => {
    const nextResources = [
      {
        fieldName: "court_id",
        title: "Courts",
        instances: value > 0 ? filterCourts(courts, value) : courts,
        allowMultiple: true,
      },
    ];

    setCurrentSport(value);
    setResources(nextResources);
  };

  const handleCommitChanges = ({ added, changed, deleted }) => {
    console.log("ENTRANDO A HANDLE COMMIT CHANGES");
    console.log(added);
    console.log(changed);
    console.log(deleted);
    let newData = appointments;
    if (added) {
      const startingAddedId =
        appointments.length > 0
          ? appointments[appointments.length - 1].id + 1
          : 0;
      newData = [...appointments, { id: startingAddedId, ...added }];
    }
    if (changed) {
      console.log("ENTRANDO AL CHANGED");
      newData = appointments.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      /* newData = appointments.filter(
        (appointment) => appointment.id !== deleted
      ); */
      setDeletedAppointmentId(deleted);
      toggleConfirmationVisible();
    }
    setAppointments(newData);
  };

  const StyledPrioritySelectorItem = styled("div")(
    ({ theme: { palette, spacing }, color }) => ({
      [`& .${classes.bullet}`]: {
        backgroundColor: color ? color[400] : palette.divider,
        borderRadius: "50%",
        width: spacing(2),
        height: spacing(2),
        marginRight: spacing(2),
        display: "inline-block",
      },
      [`&.${classes.prioritySelectorItem}`]: {
        display: "flex",
        alignItems: "center",
      },
      [`& .${classes.priorityText}`]: {
        "@media (max-width: 500px)": {
          display: "none",
        },
      },
      [`& .${classes.priorityShortText}`]: {
        "@media (min-width: 500px)": {
          display: "none",
        },
      },
    })
  );

  const PrioritySelectorItem = ({ color, name: resourceTitle }) => {
    const name = resourceTitle;

    return (
      <StyledPrioritySelectorItem
        className={classes.prioritySelectorItem}
        color={color}
      >
        <span className={classes.bullet} />
        <span className={classes.priorityText}>{name}</span>
      </StyledPrioritySelectorItem>
    );
  };

  const StyledFormControl = styled(FormControl)(({ theme: { spacing } }) => ({
    [`&.${classes.prioritySelector}`]: {
      minWidth: 140,
      marginLeft: spacing(2),
      "@media (max-width: 500px)": {
        minWidth: 0,
        fontSize: "0.75rem",
        marginLeft: spacing(0.5),
      },
    },
  }));

  const PrioritySelector = ({ sportChange, sport }) => {
    return (
      <StyledFormControl
        className={classes.prioritySelector}
        variant="standard"
      >
        <Select
          disableUnderline
          value={sport}
          onChange={(e) => {
            sportChange(e.target.value);
          }}
        >
          {sports.map(({ sport_id, color, name }) => (
            <MenuItem value={sport_id} key={sport_id.toString()}>
              <PrioritySelectorItem color={color} name={name} />
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    );
  };

  const FlexibleSpace = ({ sport, sportChange, ...restProps }) => (
    <StyledToolbarFlexibleSpace
      {...restProps}
      className={classes.flexibleSpace}
    >
      <PrioritySelector sport={sport} sportChange={sportChange} />
    </StyledToolbarFlexibleSpace>
  );

  const flexibleSpace = connectProps(FlexibleSpace, () => {
    return {
      sport: currentSport,
      sportChange: sportChange,
    };
  });

  const handleChangeEditingAppointment = (editingAppointment) => {
    console.log("handleChangeEditingAppointment");
    console.log(editingAppointment);

    /* const isValidAppointment = Utils.isValidAppointment(
      addedAppointment,
      addedAppointment,
      workingDays,
      busyTimes
    );
    if (!isValidAppointment) {
      addedAppointment.cancel = true;
      console.log("MOSTRANDO ALERTA 3");
      setShowAlert(true);
      setAllowAdding(false);
      setEditingAppointment(editingAppointment);
      return;
    }
    setAllowAdding(true); */
    setEditingAppointment(editingAppointment);
  };

  const toggleConfirmationVisible = () => {
    console.log("ENTRANDO AL toggleConfirmationVisible");

    setConfirmationVisible(!confirmationVisible);
  };

  const toggleEditingFormVisibility = () => {
    setEditingFormVisible(!editingFormVisible);
  };

  /* const appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
    const currentAppointment =
      appointments.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        this.setState({
          editingAppointment: previousAppointment,
          isNewAppointment: false,
        });
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges: handleCommitChanges,
      visibleChange: toggleEditingFormVisibility,
      onEditingAppointmentChange: handleChangeEditingAppointment,
      cancelAppointment,
    };
  }); */

  const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
      onFieldChange({ customField: nextValue });
    };

    const currentAppointment =
      appointments.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        this.setState({
          editingAppointment: previousAppointment,
          isNewAppointment: false,
        });
      }
    };

    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        <AppointmentForm.Label text="Correo Electronico" type="title" />
        <AppointmentForm.TextEditor
          value={appointmentData.customField}
          onValueChange={onCustomFieldChange}
          placeholder="Correo Electronico"
        />
        <AppointmentFormActions
          visible={editingFormVisible}
          visibleChange={toggleEditingFormVisibility}
          appointmentData={currentAppointment}
          cancelAppointment={cancelAppointment}
          commitChanges={handleCommitChanges}
          onEditingAppointmentChange={handleChangeEditingAppointment}
        />
      </AppointmentForm.BasicLayout>
    );
  };

  const appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
    const currentAppointment =
      appointments.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        this.setState({
          editingAppointment: previousAppointment,
          isNewAppointment: false,
        });
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges: handleCommitChanges,
      visibleChange: toggleEditingFormVisibility,
      onEditingAppointmentChange: handleChangeEditingAppointment,
      cancelAppointment,
    };
  });

  const handleChangeAddedAppointment = (addedAppointment) => {
    console.log("handleChangeAddedAppointment");
    console.log(addedAppointment);

    const isValidAppointment = Utils.isValidAppointment(
      addedAppointment,
      addedAppointment,
      workingDays,
      busyTimes
    );
    if (addedAppointment && !isValidAppointment) {
      addedAppointment.cancel = true;
      console.log("MOSTRANDO ALERTA 1");
      setShowAlert(true);
      //setAllowAdding(false);
      setAddedAppointment(addedAppointment);
      return;
    }
    // setAllowAdding(true);
    setAddedAppointment(addedAppointment);
  };

  const handleChangeAppointmentChanges = (appointmentChanges) => {
    console.log("handleChangeAppointmentChanges");
    console.log(appointmentChanges);

    const isValidAppointment = Utils.isValidAppointment(
      addedAppointment,
      addedAppointment,
      workingDays,
      busyTimes
    );
    if (!isValidAppointment) {
      addedAppointment.cancel = true;
      console.log("MOSTRANDO ALERTA 2");
      setShowAlert(true);
      //setAllowAdding(false);
      setAppointmentChanges(appointmentChanges);
      return;
    }
    // setAllowAdding(true);
    setAppointmentChanges(appointmentChanges);
  };

  const handleCloseAlert = () => {
    console.log("MOSTRANDO ALERTA 4");
    setShowAlert(false);
  };

  const renderCourtPage = () => {
    history.push("/dashboard/canchas");
  };

  const commitDeletedAppointment = () => {
    let newData = appointments;

    newData = appointments.filter(
      (appointment) => appointment.id !== deletedAppointmentId
    );

    setAppointments(newData);
    /* this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId);
   
      return { data: nextData, deletedAppointmentId: null };
    }); */
    toggleConfirmationVisible();
  };

  useEffect(() => {
    console.log("CARGANDO EL COMPONENTE DE RESERVAS");

    const institution = JSON.parse(localStorage.getItem("institution"));
    //OBTENER LAS RESERVAS POR INSTITUCION

    sportChange(1);

    //OBTENER LOS DIAS LABORALES

    //OBTENER LOS HORARIOS DE LA INSTITUCION

    //dispatch(getInstitutionSchedules(institution.id));

    let startDayTime;

    let endDayTime;

    //OBTENER LOS DIAS LABORALES
    if (institution.schedules) {
      institution.schedules.forEach((schedule) => {
        let horariosLaborales = [];
        let diasLaboralesSegmentados = [];

        schedule.daysAvailable.forEach((diaLaboral) => {
          switch (diaLaboral) {
            case "MIERCOLES":
              diaLaboral = "MIÉRCOLES";
              break;
            case "SABADO":
              diaLaboral = "SÁBADO";
              break;
            default:
          }

          console.log("OBTENIENDO DIAS LABORALES DE LA INSTITUCION");
          console.log(
            "dia: " + diaLaboral + " numero: " + moment().day(diaLaboral).day()
          );

          diasLaboralesSegmentados.push(moment().day(diaLaboral).day());

          setWorkingDays((prevState) => {
            return [...prevState, moment().day(diaLaboral).day()];
          });
        });

        //OBTENER LOS HORARIOS HORARIOS PARA CADA DIA LABORAL
        schedule.details.forEach((horario) => {
          console.log("VALIDANDO EL HORARIO MAS TEMPRANO Y MAS TARDE");

          startDayTime = validateStartDayTime(
            startDayTime,
            new Date(horario.timeFrame.from).getHours()
          );

          endDayTime = validateEndtDayTime(
            endDayTime,
            new Date(horario.timeFrame.to).getHours()
          );

          horariosLaborales.push({
            from: new Date(horario.timeFrame.from).getHours(),
            to: new Date(horario.timeFrame.to).getHours(),
          });
        });

        console.log("GUARDANDO HORARIOS LABORALES PARA BUSY TIMES");
        console.log({ ...horariosLaborales, diasLaboralesSegmentados });

        setBusyTimes((prevState) => {
          return [
            ...prevState,
            { horariosLaborales, diasLaboralesSegmentados },
          ];
        });
        //  setBusyTimes(horariosLaborales);
      });

      dispatch({
        type: LOAD_INSTITUTION_TIMES,
        payload: { startDayTime, endDayTime },
      });

      setStartDayHour(startDayTime);
      setEndDayHour(endDayTime);
    }

    //Obtener todas las reservas hechas para la institucion
  }, []);

  const RecurrenceLayoutEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    console.log("RENDERING RecurrenceLayoutEditor PROPS");
    console.log(props);
    return <AppointmentForm.RecurrenceLayout {...props} />;
  };

  const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    console.log("RENDERING TextEditor PROPS");
    console.log(props);
    if (props.type === "multilineTextEditor") {
      return null;
    }
    return <AppointmentForm.TextEditor {...props} />;
  };

  return institutionHasCourts ? (
    <>
      <Paper>
        <Scheduler
          data={filterTasks(appointments, currentSport)}
          locale={"es-ES"}
        >
          <EditingState
            onCommitChanges={handleCommitChanges}
            onEditingAppointmentChange={handleChangeEditingAppointment}
            //onAddedAppointmentChange={handleChangeAddedAppointment}
            /* addedAppointment={addedAppointment}0  
          onAddedAppointmentChange={handleChangeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={handleChangeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={handleChangeEditingAppointment} */
          />
          <ViewState defaultCurrentDate="2018-07-17" />
          <GroupingState grouping={grouping} />
          <WeekView
            cellDuration={60}
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            timeTableCellComponent={TimeTableCellWeek}
            //timeTableCellComponent={TimeTableCellWeek2}
            dayScaleCellComponent={DayScaleCellWeek}
          />

          <DayView cellDuration={60} startDayHour={9} endDayHour={19} />
          <MonthView
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />

          <Appointments
            appointmentComponent={Appointment}
            appointmentContentComponent={AppointmentContent}
          />
          <Resources data={resources} mainResourceName="court_id" />
          <Toolbar flexibleSpaceComponent={flexibleSpace} />
          <DateNavigator />
          <EditRecurrenceMenu />
          <IntegratedGrouping />
          <IntegratedEditing />

          {/* <ConfirmationDialog messages={ConfirmationDialogMessages} /> */}

          <AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
          <AppointmentForm
            //overlayComponent={appointmentForm}
            basicLayoutComponent={BasicLayout}
            visible={editingFormVisible}
            onVisibilityChange={toggleEditingFormVisibility}
            textEditorComponent={TextEditor}
            recurrenceLayoutComponent={RecurrenceLayoutEditor}
            messages={AppointmentFormMessages}
          />
          <GroupingPanel />
          <ViewSwitcher />
          <TodayButton messages={TodayButtonMessages} />
        </Scheduler>
      </Paper>

      <Dialog open={confirmationVisible}>
        <DialogTitle>Eliminar Reserva</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea eliminar esta reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleConfirmationVisible}
            color="primary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={commitDeletedAppointment}
            color="secondary"
            variant="outlined"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="warning"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  ) : (
    <Paper>
      <Box
        width="100%"
        top={0}
        p={4}
        zIndex="modal"
        color="textSecondary"
        bgcolor="background.header"
      >
        <Container maxWidth="md" className={classes.container}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom={true}
            className={classes.header}
          >
            La Institucion aun no Posee Canchas Registradas
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            paragraph={true}
          >
            Haga Click en el siguiente Boton para crear su primer Cancha
          </Typography>
          <Button
            onClick={renderCourtPage}
            variant="contained"
            color="primary"
            className={classes.action}
          >
            Ir al Menu de Canchas
          </Button>
        </Container>
      </Box>
    </Paper>
  );
};
export default ReservaGridCustom2;
