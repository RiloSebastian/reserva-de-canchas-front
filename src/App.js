import React, { useEffect, useState } from "react";
import "./App.css";
import MenuBar from "./components/menuBar/MenuBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import InstitutionRoutes, {
  CustomerRoutes,
  PATHS,
  BASE_URL,
} from "./pages/routes";
import InstitutionLayout from "./layout/InstitutionLayout";
import CustomerLayout from "./layout/CustomerLayout";
import NotFound from "./components/NotFound";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/signup/SignUp";
import PrivateRoute from "./pages/privateRoute/PrivateRoute";
import authService from "./services/auth.service";
import ListaReserva from "./pages/reservas/ListaReserva";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { useDispatch, useSelector } from "react-redux";
import { history } from "./helpers/history";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CssBaseline from "@mui/material/CssBaseline";

const pages = ["Home", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {false && (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                LOGO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      <Router history={history}>
        <CssBaseline />
        <Switch>
          <Route exact path={PATHS.login} component={SignIn} />
          <Route exact path={PATHS.signup} component={SignUp} />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard/reservas" /> : <SignIn />}
          </Route>
          <PrivateRoute path={CustomerRoutes.map((item) => item.path)}>
            <CustomerLayout>
              <Switch>
                {CustomerRoutes.map(({ id, path, component, exact }) => (
                  <Route
                    key={id}
                    path={path}
                    component={component}
                    exact={exact}
                  />
                ))}
              </Switch>
            </CustomerLayout>
          </PrivateRoute>
          <PrivateRoute
            path={InstitutionRoutes.map((item) => BASE_URL.base + item.path)}
          >
            <InstitutionLayout>
              <Switch>
                {InstitutionRoutes.map(({ id, path, component, exact }) => (
                  <Route
                    key={id}
                    path={BASE_URL.base + path}
                    component={component}
                    exact={exact}
                  />
                ))}
              </Switch>
            </InstitutionLayout>
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
