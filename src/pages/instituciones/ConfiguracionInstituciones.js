import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { InstitutionDetails } from "../../components/settings/InstitutionDetails";
import { NonWorkingDays } from "../../components/settings/NonWorkingDays";
import { OpenAndCloseTimes } from "../../components/settings/OpenAndCloseTimes";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Reserva Tu Cancha
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ConfiguracionInstituciones = () => {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 2,
              pb: 8,
            }}
          >
            <Container
              sx={{
                margin: 0,
              }}
              maxWidth="lg"
            >
              <Typography sx={{ mb: 3 }} variant="h4">
                <InstitutionDetails />
              </Typography>
              {/*<SettingsNotifications />*/}
              <NonWorkingDays />
              <Box sx={{ pt: 3 }}>
                {/*<SettingsNotifications />*/}
                <OpenAndCloseTimes />
              </Box>
            </Container>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ConfiguracionInstituciones;
