import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AdvancePaymentConfig from "../../components/settings/AdvancePaymentConfig";
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

              <Box sx={{ pt: 3 }}>
                {/*<SettingsNotifications />*/}
                <NonWorkingDays />
              </Box>
              <Box sx={{ pt: 3 }}>
                {/*<SettingsNotifications />*/}
                <OpenAndCloseTimes />
              </Box>
              <Box sx={{ pt: 3 }}>
                {/*<SettingsNotifications />*/}
                <AdvancePaymentConfig />
              </Box>
            </Container>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ConfiguracionInstituciones;
