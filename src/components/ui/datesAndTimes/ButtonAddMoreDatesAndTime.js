import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const ButtonAddMoreDatesAndTime = ({
  daysSelected,
  handleAddNewDatesSchedules,
  disabled
}) => {
  return (
    <Box textAlign="center">
      <IconButton
        color="secondary"
        aria-label="delete"
        size="large"
        disabled={disabled}
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
