import React, { useState } from "react";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path={PATHS.login} component={SignIn} />
          <Route exact path={PATHS.signup} component={SignUp} />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/dashboard/reservas" /> : <SignIn />}
          </Route>
          {/* {CustomerRoutes.map(({ id, path, component, exact }) => (
            <PrivateRoute
              key={id}
              path={CustomerRoutes.map((item) => item.path)}
              isAuthenticated={authService.getCurrentUser()}
            >
              <CustomerLayout>
                <Route
                  key={id}
                  path={path}
                  component={component}
                  exact={exact}
                />
              </CustomerLayout>
            </PrivateRoute>
          ))} */}
          <PrivateRoute
            path={CustomerRoutes.map((item) => item.path)}
          >
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
          {/*
            InstitutionRoutes.map(({ id, path, component, exact }) => (
              <PrivateRoute
                key={id}
                path={InstitutionRoutes.map((item) => BASE_URL.base + item.path)}
                isAuthenticated={authService.getCurrentUser()}
              >
                <InstitutionLayout>
                  <Route
                    key={id}
                    path={BASE_URL.base + path}
                    component={component}
                    exact={exact}
                  />
                </InstitutionLayout>
              </PrivateRoute>
            ))
            */}
          {/*
          <PrivateRoute
            path={CustomerRoutes.map((item) => item.path)}
            isAuthenticated={true}
          >
            <CustomerLayout>
              <Switch>
                {
                  CustomerRoutes.map(({ id, path, component, exact }) => (
                    <Route
                      key={id}
                      path={path}
                      component={component}
                      exact={exact}
                    />
                  ))
                }
              </Switch>
            </CustomerLayout>


          </PrivateRoute>
          <PrivateRoute
            path={InstitutionRoutes.map((item) => item.path)}
            isAuthenticated={false}
          >
            <InstitutionLayout>
              <Switch>
                {
                  InstitutionRoutes.map(({ id, path, component, exact }) => (
                    <Route
                      key={id}
                      path={path}
                      component={component}
                      exact={exact}
                    />
                  ))
                }
              </Switch>
            </InstitutionLayout>
          </PrivateRoute>

          


        <MenuBar />
        <Switch>
          {
            ReservationsRoutes.map(({ id, path, component, exact }) => (
              <Route
                key={id}
                path={path}
                component={component}
                exact={exact}
              />
            ))
          }
        </Switch>*/}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
