import React, { useEffect, useState } from "react";
import { connectProps } from "@devexpress/dx-react-core";
import {
  EditingState,
  GroupingState,
  IntegratedEditing,
  IntegratedGrouping,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  DayView,
  DragDropProvider,
  EditRecurrenceMenu,
  GroupingPanel,
  MonthView,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import LowPriority from "@mui/icons-material/LowPriority";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import { Card } from "@mui/material";
import { blue, green, orange, red, yellow } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import AppointmentFormContainerBasic from "./appointments/appointment-form-components/AppointmentFormContainerBasic";
import { reservations } from "./appointments/appointments";
import { AppointmentFormMessages } from "./localization-messages/AppointmentFormMessages";
import { ConfirmationDialogMessages } from "./localization-messages/ConfirmationDialogMessages";
import { EditRecurrenceMenuMessages } from "./localization-messages/EditRecurrenceMenuMessages";
import TextEditor from "./TextEditor";
import { institutionConfigs } from "../../assets/mocks/institutionConfigs";
import { set } from "date-fns";

const sportsDeprecated = [
  { text: "Futbol", id: 1, color: green },
  { text: "Tenis", id: 2, color: red },
  { text: "Basquet", id: 3, color: orange },
  { text: "Volley", id: 4, color: yellow },
];

const courtsDeprecated = [
  {
    text: "Cancha 1",
    id: 1,
    color: green,
  },
  {
    text: "Cancha 2",
    id: 2,
    color: green,
  },
  {
    text: "Cancha 3",
    id: 3,
    color: green,
  },
  {
    text: "Cancha 4",
    id: 4,
    color: green,
  },
  {
    text: "Cancha 5",
    id: 5,
    color: green,
  },
];

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

const priorityData = [
  { text: "Low Priority", id: 1, color: green },
  { text: "High Priority", id: 2, color: orange },
];

const findColorByGroupId = (id) =>
  priorityData.find((item) => item.id === id).color;

const getIconById = (id) => (id === 1 ? LowPriority : PriorityHigh);

const PREFIX = "Demo";

const classes = {
  flexibleSpace: `${PREFIX}-flexibleSpace`,
  prioritySelector: `${PREFIX}-prioritySelector`,
  prioritySelectorItem: `${PREFIX}-prioritySelectorItem`,
  cell: `${PREFIX}-cell`,
  headerCell: `${PREFIX}-headerCell`,
  icon: `${PREFIX}-icon`,
};

const stylesByPriority = sports.reduce(
  (acc, sport) => ({
    ...acc,
    [`cell${sport.name.replace(" ", "")}`]: {
      backgroundColor: alpha(sport.color[400], 0.1),
      "&:hover": {
        backgroundColor: alpha(sport.color[400], 0.15),
      },
      "&:focus": {
        backgroundColor: alpha(sport.color[400], 0.2),
      },
    },
    [`headerCell${sport.name.replace(" ", "")}`]: {
      backgroundColor: alpha(sport.color[400], 0.1),
      "&:hover": {
        backgroundColor: alpha(sport.color[400], 0.1),
      },
      "&:focus": {
        backgroundColor: alpha(sport.color[400], 0.1),
      },
    },
  }),
  {}
);

const StyledToolbarFlexibleSpace = styled(Toolbar.FlexibleSpace)(() => ({
  [`&.${classes.flexibleSpace}`]: {
    margin: "0 auto 0 0",
  },
}));

const useGroupingStyles = (Component, group) => {
  const color = blue;
  return styled(Component)(({ theme }) => ({
    [`&.${classes.cell}`]: {
      backgroundColor: alpha(color[400], 0.1),
      "&:hover": {
        backgroundColor: alpha(color[400], 0.15),
      },
      "&:focus": {
        backgroundColor: alpha(color[400], 0.2),
      },
    },
    [`&.${classes.headerCell}`]: {
      textAlign: "center",
      backgroundColor: alpha(color[400], 0.1),
      "&:hover": {
        backgroundColor: alpha(color[400], 0.1),
      },
      "&:focus": {
        backgroundColor: alpha(color[400], 0.1),
      },
    },
    [`&.${classes.icon}`]: {
      paddingLeft: theme.spacing(1),
      verticalAlign: "middle",
    },
  }));
};

const TimeTableCell = React.memo(({ groupingInfo, ...restProps }) => {
  const StyledComponent = useGroupingStyles(
    DayView.TimeTableCell,
    groupingInfo[0]
  );
  return (
    <StyledComponent
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const DayScaleCell = React.memo(({ groupingInfo, ...restProps }) => {
  const StyledComponent = useGroupingStyles(
    DayView.DayScaleCell,
    groupingInfo[0]
  );
  return (
    <StyledComponent
      className={classes.headerCell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const AllDayCell = React.memo(({ groupingInfo, ...restProps }) => {
  const StyledComponent = useGroupingStyles(AllDayPanel.Cell, groupingInfo[0]);
  return (
    <StyledComponent
      className={classes.cell}
      groupingInfo={groupingInfo}
      {...restProps}
    />
  );
});

const GroupingPanelCell = React.memo(({ group, ...restProps }) => {
  const StyledComponent = useGroupingStyles(GroupingPanel.Cell, group);
  //const Icon = getIconById(group.id);
  return (
    <StyledComponent
      className={classes.headerCell}
      group={group}
      {...restProps}
    ></StyledComponent>
  );
});

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

const FlexibleSpace = ({ sport, sportChange, ...restProps }) => (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <PrioritySelector sport={sport} sportChange={sportChange} />
  </StyledToolbarFlexibleSpace>
);

const PrioritySelector = ({ sportChange, sport }) => {
  const currentSport = sport > 1 ? sports[sport - 1] : {};
  return (
    <StyledFormControl className={classes.prioritySelector} variant="standard">
      <Select
        disableUnderline
        value={sport}
        onChange={(e) => {
          sportChange(e.target.value);
        }}
        renderValue={() => (
          <PrioritySelectorItem
            name={currentSport.name}
            color={currentSport.color}
          />
        )}
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

const appointmentComponent = (props) => {
  return <Appointments.Appointment {...props} />;
};

const ReservaGridCustom = () => {
  //TODO: obtener los deportes, canchas y horarios de cada cancha para armar la grilla de las reservas

  const [data, setData] = useState(reservations);

  const [currentSport, setCurrentSport] = useState(0);

  const [currentSportCell, setCurrentSportCell] = useState(0);

  const [currentSportId, setCurrentSportId] = useState(0);

  const [addedAppointment, setAddedAppointment] = useState({});

  const [appointmentChanges, setAppointmentChanges] = useState({});

  const [editingAppointment, setEditingAppointment] = useState({});

  const [resources, setResources] = useState([
    {
      fieldName: "id",
      title: "Reservations",
      instances: reservations,
      allowMultiple: true,
    },
    {
      fieldName: "court_id",
      title: "Courts",
      instances: courts,
      allowMultiple: true,
    },
    {
      fieldName: "sport_id",
      title: "Sport",
      isMain: true,
      instances: sports,
    },
  ]);

  const [grouping, setGrouping] = useState([
    {
      resourceName: "sport_id",
    },
    {
      resourceName: "court_id",
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date(2022, 3, 5));

  const [currentViewName, setCurrentViewName] = useState("day");

  const filterTasks = (items, sport_id) =>
    items.filter((task) => !sport_id || task.sport_id === sport_id);

  const filterCourts = (courts, sport_id) =>
    courts.filter((court) => !sport_id || court.sport_id === sport_id);

  const sportChange = (value) => {
    const nextResources = [
      {
        fieldName: "id",
        title: "Reservations",
        instances: reservations,
        allowMultiple: true,
      },
      {
        fieldName: "court_id",
        title: "Courts",
        instances: value > 0 ? filterCourts(courts, value) : courts,
        allowMultiple: true,
      },
      {
        fieldName: "sport_id",
        title: "Sport",
        instances: value > 0 ? [sports[value - 1]] : sports,
      },
    ];

    setCurrentSport(value);
    setResources(nextResources);
  };

  const flexibleSpace = connectProps(FlexibleSpace, () => {
    return {
      sport: currentSport,
      sportChange: sportChange,
    };
  });

  const handleDateChange = (newCurrentDate) => {
    setCurrentDate(newCurrentDate);
  };

  const handleCurrentViewName = (newCurrentViewName) => {
    setCurrentViewName(newCurrentViewName);
  };

  const handleCommitChanges = ({ added, changed, deleted }) => {
    let newData = data;
    if (added) {
      console.log("added");
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      newData = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      console.log("changed");
      newData = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      console.log("deleted");
      newData = data.filter((appointment) => appointment.id !== deleted);
    }
    setData(newData);
  };

  const handleChangeAddedAppointment = (addedAppointment) => {
    console.log("handleChangeAddedAppointment");
    console.log(addedAppointment);
    setAddedAppointment(addedAppointment);
  };

  const handleChangeAppointmentChanges = (appointmentChanges) => {
    console.log("handleChangeAppointmentChanges");
    console.log(appointmentChanges);
    setAppointmentChanges(appointmentChanges);
  };

  const handleChangeEditingAppointment = (editingAppointment) => {
    console.log("handleChangeEditingAppointment");
    console.log(editingAppointment);
    setEditingAppointment(editingAppointment);
  };

  useEffect(() => {
    //
  }, []);

  const handleOnChangeCurrentSportCell = () => {
    let newCell = currentSportCell + 1;
    setCurrentSportCell(newCell);
  };

  const handleOnChangeCurrentSportId = (sportId) => {
    setCurrentSportId(sportId);
  };

  const GroupingPanelRow = React.memo(({ children }) => {
    const StyledComponent = useGroupingStyles(GroupingPanel.Row, null);

    console.log("GroupingPanelRow");
    console.log(children);

    console.log("currentSportCell");
    console.log(currentSportCell);

    if (children[1][0].props.group.fieldName === "sport_id") {
      console.log("es deporte");
      console.log(children[1][currentSportCell]);
      console.log(currentSportCell);

      if (children[1][currentSportCell]) {
        handleOnChangeCurrentSportId(
          children[1][currentSportCell].props.group.id
        );

        handleOnChangeCurrentSportCell();
      }

      return (
        <StyledComponent className={classes.headerCell}>
          {children}
        </StyledComponent>
      );
    } else {
      console.log("es cancha");
      console.log(children[1]);
      //si es el ultimo volver a cero los valores!

      console.log("filtrar cancha para el deporte");
      console.log(currentSportId);

      const filtered = children[1].filter((cancha) => {
        console.log("cancha");
        console.log(cancha);

        const value = cancha.props.group.id;
        console.log("value");
        console.log(value);
        switch (value) {
          case 4: {
            console.log("case1");
            return cancha;
          }

          default:
            break;
        }

        /* const deportesFiltrados = sports.filter(
            (sport) => sport.sport_id === 1
          );
          console.log(deportesFiltrados);
  
          if (deportesFiltrados.length > 0) {
            deportesFiltrados[0].courts.forEach((court) => {
              if (court.court_id === cancha.props.group.id) {
                return cancha;
              }
            });
          } */
      });

      return (
        <StyledComponent className={classes.headerCell}>
          {filtered}
        </StyledComponent>
      );
    }
  });

  return (
    <Card>
      <Scheduler
        data={filterTasks(data, currentSport)}
        locale={"es-ES"}
        resources
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={handleDateChange}
          currentViewName={currentViewName}
          onCurrentViewNameChange={handleCurrentViewName}
        />
        <EditingState
          onCommitChanges={handleCommitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={handleChangeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={handleChangeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={handleChangeEditingAppointment}
        />
        <EditRecurrenceMenu messages={EditRecurrenceMenuMessages} />
        <IntegratedEditing />
        <GroupingState grouping={grouping} groupByDate={() => true} />
        <WeekView cellDuration={60} startDayHour={7} endDayHour={24} />
        <WeekView
          cellDuration={60}
          name="work-week"
          displayName="Semana"
          excludedDays={[0, 6]}
          startDayHour={7}
          endDayHour={24}
        />
        <MonthView cellDuration={60} displayName="Mes" />
        <DayView
          cellDuration={60}
          startDayHour={7}
          endDayHour={24}
          displayName="Dia"
          name="day"
        />
        <Toolbar flexibleSpaceComponent={flexibleSpace} />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <ConfirmationDialog messages={ConfirmationDialogMessages} />
        <Appointments appointmentComponent={appointmentComponent} />
        <Resources data={resources} mainResourceName="sport_id" />

        <IntegratedGrouping />

        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
        <AppointmentForm
          messages={AppointmentFormMessages}
          //commandLayoutComponent={CommandLayoutPropsComponent}
          basicLayoutComponent={AppointmentFormContainerBasic}
          textEditorComponent={TextEditor}
        />
        <GroupingPanel
          //rowComponent={GroupingPanelRow}
          cellComponent={GroupingPanelCell}
        />
        <DragDropProvider />
      </Scheduler>
    </Card>
  );
};

export default ReservaGridCustom;
