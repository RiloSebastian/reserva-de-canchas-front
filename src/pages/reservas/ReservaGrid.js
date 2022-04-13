import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { connectProps } from "@devexpress/dx-react-core";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { alpha, styled } from "@mui/material/styles";
import { green, orange, red, yellow } from "@mui/material/colors";
import LowPriority from "@mui/icons-material/LowPriority";
import PriorityHigh from "@mui/icons-material/PriorityHigh";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  WeekView,
  Toolbar,
  TodayButton,
  AppointmentTooltip,
  DateNavigator,
  Appointments,
  AppointmentForm,
  ViewSwitcher,
  MonthView,
  DayView,
  GroupingPanel,
  DragDropProvider,
  AllDayPanel,
  EditRecurrenceMenu,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import { teal, indigo } from "@mui/material/colors";

import { reservations } from "./appointments/appointments";

const courts = [
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
];

const sports = [
  { text: "Futbol", id: 1, color: green },
  { text: "Tenis", id: 2, color: red },
  { text: "Basquet", id: 3, color: orange },
  { text: "Volley", id: 4, color: yellow },
];

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
    [`cell${sport.text.replace(" ", "")}`]: {
      backgroundColor: alpha(sport.color[400], 0.1),
      "&:hover": {
        backgroundColor: alpha(sport.color[400], 0.15),
      },
      "&:focus": {
        backgroundColor: alpha(sport.color[400], 0.2),
      },
    },
    [`headerCell${sport.text.replace(" ", "")}`]: {
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
  const color = green;
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
  const Icon = getIconById(group.id);
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

const PrioritySelectorItem = ({ color, text: resourceTitle }) => {
  const text = resourceTitle || "All Tasks";
  const shortText = resourceTitle ? text.substring(0, 1) : "All";

  return (
    <StyledPrioritySelectorItem
      className={classes.prioritySelectorItem}
      color={color}
    >
      <span className={classes.bullet} />
      <span className={classes.priorityText}>{text}</span>
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

const FlexibleSpace = ({ priority, priorityChange, ...restProps }) => (
  <StyledToolbarFlexibleSpace {...restProps} className={classes.flexibleSpace}>
    <PrioritySelector priority={priority} priorityChange={priorityChange} />
  </StyledToolbarFlexibleSpace>
);

const PrioritySelector = ({ priorityChange, priority }) => {
  const currentPriority = priority > 0 ? sports[priority - 1] : {};
  return (
    <StyledFormControl className={classes.prioritySelector} variant="standard">
      <Select
        disableUnderline
        value={priority}
        onChange={(e) => {
          priorityChange(e.target.value);
        }}
        renderValue={() => (
          <PrioritySelectorItem
            text={currentPriority.text}
            color={currentPriority.color}
          />
        )}
      >
        <MenuItem value={0}>
          <PrioritySelectorItem />
        </MenuItem>
        {sports.map(({ id, color, text }) => (
          <MenuItem value={id} key={id.toString()}>
            <PrioritySelectorItem color={color} text={text} />
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

const ReservaGrid = () => {
  const [data, setData] = useState(reservations);

  const [currentPriority, setCurrentPriority] = useState(0);

  const priorityChange = (value) => {
    const nextResources = [
      {
        ...resources[0],
        instances: value > 0 ? [reservations[value - 1]] : reservations,
      },
    ];

    setCurrentPriority(value);
    setResources(nextResources);
  };

  const [addedAppointment, setAddedAppointment] = useState({});

  const [appointmentChanges, setAppointmentChanges] = useState({});

  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const flexibleSpace = connectProps(FlexibleSpace, () => {
    return {
      priority: currentPriority,
      priorityChange: priorityChange,
    };
  });

  const [resources, setResources] = useState([
    {
      fieldName: "courtId",
      title: "Courts",
      instances: courts,
      allowMultiple: true,
    },
    {
      fieldName: "sportId",
      title: "Sport",
      instances: sports,
    },
  ]);

  const [grouping, setGrouping] = useState([
    {
      resourceName: "sportId",
    },
    {
      resourceName: "courtId",
    },
  ]);

  const filterTasks = (items, sportId) =>
    items.filter((task) => !sportId || task.sportId === sportId);

  const [currentDate, setCurrentDate] = useState(new Date(2022, 3, 5));

  const [currentViewName, setCurrentViewName] = useState("day");

  const handleDateChange = (newCurrentDate) => {
    setCurrentDate(newCurrentDate);
  };

  const handleCurrentViewName = (newCurrentViewName) => {
    setCurrentViewName(newCurrentViewName);
  };

  const handleCommitChanges = ({ added, changed, deleted }) => {
    let dataChange = data;
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      dataChange = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      dataChange = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      dataChange = data.filter((appointment) => appointment.id !== deleted);
    }
    setData(dataChange);
  };

  const handleChangeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
  };

  const handleChangeAppointmentChanges = (appointmentChanges) => {
    setAppointmentChanges(appointmentChanges);
  };

  const handleChangeEditingAppointment = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  return (
    <Paper>
      <Scheduler
        data={filterTasks(data, currentPriority)}
        height={660}
        locale={"es-ES"}
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
        <EditRecurrenceMenu />
        <IntegratedEditing />
        <GroupingState grouping={grouping} groupByDate={() => true} />
        <WeekView startDayHour={9} endDayHour={19} />
        <WeekView
          name="work-week"
          displayName="Semana"
          excludedDays={[0, 6]}
          startDayHour={9}
          endDayHour={19}
        />
        <MonthView displayName="Mes" />
        <DayView
          startDayHour={8}
          endDayHour={23}
          displayName="Dia"
          name="day"
        />
        <Toolbar flexibleSpaceComponent={flexibleSpace} />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <ConfirmationDialog />
        <Appointments />
        <Resources data={resources} mainResourceName="courtId" />

        <IntegratedGrouping />

        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
        <GroupingPanel cellComponent={GroupingPanelCell} />
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
};

export default ReservaGrid;
