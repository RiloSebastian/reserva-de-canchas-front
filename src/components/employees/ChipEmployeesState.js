import React from "react";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "green",
        },
        colorSecondary: {
          backgroundColor: "red",
        },
      },
    },
  },
});

const ChipEmployeesState = ({ rowData, renderType }) => {
  const state = () => {
    const state = renderType === "group" ? rowData : rowData["state"];
    switch (state) {
      case "ACTIVE":
        return { state: "Activo", color: "primary" };
      case "SUSPENDED":
        return { state: "Inactivo", color: "secondary" };
      default:
        break;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Chip
        color={state().color}
        deleteIcon={<DoneIcon />}
        label={state().state}
      />
    </ThemeProvider>
  );
};

export default ChipEmployeesState;
