import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import MultipleSelectChips from "../ui/MultipleSelectChips";

const SelectWeekDays = ({
  setDaysSelected,
  daysSelected,
  daysAndTimesId,
  diaYHorario,
  readOnly,
}) => {
  const [value, setValue] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    daysSelected.forEach((daySelected) => {
      if (daySelected.selected === true) {
        console.log("SETEANDO CADA DIA SELECCIONADO");
        setValue((prevState) => {
          return [...prevState, daySelected.value];
        });
      }
    });
  }, []);

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
        error={error}
        setError={setError}
        setDaysSelected={setDaysSelected}
        daysSelected={daysSelected}
        daysAndTimesId={daysAndTimesId}
        diaYHorario={diaYHorario}
        readOnly={readOnly}
      />
    </Paper>
  );
};

export default SelectWeekDays;
