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

const ChipCourtState = ({ rowData, renderType, states }) => {
  const { enable, disable } = states;
  return (
    <ThemeProvider theme={theme}>
      <Chip
        onDelete={
          renderType === "group" ? rowData : rowData["state"] && (() => {})
        }
        color={
          renderType === "group"
            ? rowData === "ENABLED"
              ? "primary"
              : "secondary"
            : rowData["state"] === "ENABLED"
            ? "primary"
            : "secondary"
        }
        deleteIcon={<DoneIcon />}
        label={
          renderType === "group"
            ? rowData === "ENABLED"
              ? enable
              : disable
            : rowData["state"] === "ENABLED"
            ? enable
            : disable
        }
      />
    </ThemeProvider>
  );
};

export default ChipCourtState;
