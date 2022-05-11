import React, { useState } from "react";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(2),
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
    "&:first-child": {
      border: "1px solid",
      borderColor: "#692B7C",
      borderRadius: "50%",
    },
  },
}))(ToggleButtonGroup);

const StyledToggle = withStyles({
  root: {
    color: "#692B7C",
    "&$selected": {
      color: "white",
      background: "#692B7C",
    },
    "&:hover": {
      borderColor: "#BA9BC3",
      background: "#BA9BC3",
    },
    "&:hover$selected": {
      borderColor: "#BA9BC3",
      background: "#BA9BC3",
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem",
  },
  selected: {},
})(ToggleButton);

const ToggleDays = () => {
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  return (
    <>
      <StyledToggleButtonGroup
        size="small"
        arial-label="Dias de la Semana"
        value={days}
        onChange={(event, value) => setDays(value)}
      >
        {allWeek.weekdays().map((day, index) => (
          <StyledToggle key={day.key} value={index} aria-label={day.key}>
            {day.label}
          </StyledToggle>
        ))}
      </StyledToggleButtonGroup>
    </>
  );
};

const allWeek = moment.updateLocale("es", {
  weekdays: [
    {
      key: "Sunday",
      label: "D",
    },
    {
      key: "Monday",
      label: "L",
    },
    {
      key: "Tuesday",
      label: "M",
    },
    {
      key: "Wednesday",
      label: "M",
    },
    {
      key: "Thursday",
      label: "J",
    },
    {
      key: "Friday",
      label: "V",
    },
    {
      key: "Saturday",
      label: "S",
    },
  ],
});

const weekend = moment.updateLocale("es", {
  weekdays: ["Sunday", "Saturday"],
});

const SelectWeekDays = ({ setHorariosYPrecios }) => {
  return <ToggleDays />;
};

export default SelectWeekDays;
