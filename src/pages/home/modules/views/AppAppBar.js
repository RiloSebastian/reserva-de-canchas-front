import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import Divider from "@mui/material/Divider";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/homepage"
            sx={{ fontSize: 24 }}
          >
            {"RESERVA TU CANCHA"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/signup/institution"
              sx={rightLink}
            >
              {"REGISTRA TU CLUB"}
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              color="white"
              sx={rightLink}
            />
            <Link
              variant="h6"
              underline="none"
              href="/login"
              sx={{ ...rightLink }}
            >
              {"INICIAR SESION"}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default AppAppBar;
