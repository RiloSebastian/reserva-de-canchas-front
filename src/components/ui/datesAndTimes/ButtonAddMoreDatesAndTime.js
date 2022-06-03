import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const ButtonAddMoreDatesAndTime = ({
  daysSelected,
  handleAddNewDatesSchedules,
}) => {
  return (
    <Box textAlign="center">
      <IconButton
        color="secondary"
        aria-label="delete"
        size="large"
        disabled={
          !daysSelected
            .map((daySelected) => daySelected.selected)
            .includes(false)
        }
      >
        <AddCircleIcon
          onClick={handleAddNewDatesSchedules}
          sx={{ fontSize: 50 }}
        />
      </IconButton>
    </Box>
  );
};

export default ButtonAddMoreDatesAndTime;
