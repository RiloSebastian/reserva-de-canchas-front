import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import Divider from "@mui/material/Divider";
import { margin } from "@mui/system";

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
            to="/homepage"
            style={{
              variant: "h6",
              textDecoration: "none",
              color: "inherit",
              fontSize: 24,
            }}
          >
            {"RESERVA TU CANCHA"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              to="/signup/institution"
              style={{
                ...rightLink,
                color: "inherit",
                variant: "h6",
                textDecoration: "none",
              }}
            >
              {"REGISTRA TU CLUB"}
            </Link>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              color="white"
              sx={{ ...rightLink, mx: 5 }}
            />
            <Link
              to="/login"
              style={{
                ...rightLink,
                color: "inherit",
                variant: "h6",
                textDecoration: "none",
              }}
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
