import React, { useState } from "react";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import MultipleSelectChips from "../ui/MultipleSelectChips";

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

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SelectWeekDays = ({
  daysOptions,
  setDaysSelected,
  setHorariosYPrecios,
  daysSelected = { daysSelected },
}) => {
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  const [value, setValue] = useState([]);
  const [error, setError] = useState("");

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      <MultipleSelectChips
        label="Dias"
        value={value}
        setValue={setValue}
        options={daysOptions}
        error={error}
        setError={setError}
        setDaysSelected={setDaysSelected}
        daysSelected={daysSelected}
      />
    </Paper>
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

export default SelectWeekDays;
