import React from "react";
import "./App.css";
import MenuBar from './components/menuBar/MenuBar';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router';
import InstitutionRoutes, { CustomerRoutes, PATHS, BASE_URL } from "./pages/routes";
import InstitutionLayout from "./layout/InstitutionLayout";
import CustomerLayout from "./layout/CustomerLayout";
import NotFound from './components/NotFound';
import SignIn from './pages/login/SignIn';
import SignUp from './pages/signup/SignUp';
import PrivateRoute from "./pages/privateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Switch>

          <Route exact path={PATHS.login} component={SignIn} />
          <Route exact path={PATHS.signup} component={SignUp} />

          {
            CustomerRoutes.map(({ id, path, component, exact }) => (
              <PrivateRoute
                key={id}
                path={CustomerRoutes.map((item) => item.path)}
                isAuthenticated={true}
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
            ))
          }

          {
            InstitutionRoutes.map(({ id, path, component, exact }) => (
              <PrivateRoute
                key={id}
                path={InstitutionRoutes.map((item) => BASE_URL.base + item.path)}
                isAuthenticated={true}
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
          }




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
