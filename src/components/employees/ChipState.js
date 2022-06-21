import React from 'react'
import Chip from '@mui/material/Chip';
import DoneIcon from "@mui/icons-material/Done";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: 'green',
                },
                colorSecondary: {
                    backgroundColor: 'red',
                },
            },
        },
    },
});

const ChipState = ({ rowData, renderType }) => {
  return (
    <ThemeProvider theme={theme}>
    <Chip
        onDelete={renderType === "group" ? (rowData) : (rowData["estado"]) && (() => { })}
        color={renderType === "group" ? (rowData ? "primary" : "secondary") : ((rowData["estado"] ? "primary" : "secondary"))}
        deleteIcon={<DoneIcon />}
        label={
            renderType === "group" ? (rowData ? "Activo" : "Inactivo") : (rowData["estado"] ? "Activo" : "Inactivo") 
        }
    />
</ThemeProvider>
  )
}

export default ChipState