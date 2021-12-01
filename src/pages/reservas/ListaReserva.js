import React, { useState, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReservationCalendar from "../../components/ReservationCalendar";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import CardItemReserva from "../../components/items/CardItemReserva";
import { height } from "@mui/system";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import Grid from "@mui/material/Grid";

/* const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
})); */

const ListaReserva = () => {
  const [date, setDate] = React.useState(new Date());

  const [data, setdata] = useState([
    {
      id: 1,
      date: "9 Oct, 2021",
      period: "08:00  -  09:00",
      institution: "Instituto 1",
      field: "Cancha 1",
      state: "CANCELADA",
    },
    {
      id: 2,
      date: "15 Oct, 2021",
      period: "09:00  -  10:00",
      institution: "Instituto 1",
      field: "Cancha 1",
      state: "FINALIZADA",
    },
    {
      id: 3,
      date: "27 Oct, 2021",
      period: "08:00  -  09:00",
      institution: "Instituto 2",
      field: "Cancha 2",
      state: "FINALIZADA",
    },
  ]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* { <>
            <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 8">
                        <Item>RESERVAS</Item>
                    </Box>
                    <Box gridColumn="span 4">
                        <Item>xs=4</Item>
                    </Box>
                    <Box gridColumn="span 5">
                        <Item>
                            <ReservationCalendar />
                        </Item>
                    </Box>
                    <Box gridColumn="span 7">
                        <Item>
                            xs=7
                        </Item>
                    </Box>
                    <Box gridColumn="span 12">

                        <Item>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display='flex' justifyContent='center' alignContent='center'>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                    >
                                        <Tab label="FUTBOL" value="1" />
                                        <Tab label="TENIS" value="2" />
                                        <Tab label="BASQUET" value="3" />
                                        <Tab label="PADEL" value="4" />
                                        <Tab label="HOCKEY" value="5" />
                                        <Tab label="SQUASH" value="6" />
                                        <Tab label="VOLLEY" value="7" />
                                    </Tabs>
                                </Box>
                                <TabPanel value="1">Item One</TabPanel>
                                <TabPanel value="2">Item Two</TabPanel>
                                <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                        </Item>
                    </Box>
                </Box>
            </Box>
        </> } */

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CalendarPicker
              date={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </Grid>
        </Grid>
        <div style={{ width: "80%" }}>
          <h1>Lista de Reservas</h1>
          {data.map((reserva) => (
            <CardItemReserva key={reserva.id} reserva={reserva} />
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ListaReserva;
