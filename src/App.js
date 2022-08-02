import CssBaseline from "@mui/material/CssBaseline";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import "./App.css";
import { history } from "./helpers/history";
import CustomerLayout from "./layout/CustomerLayout";
import InstitutionLayout from "./layout/InstitutionLayout";
import AccountConfirmation from "./pages/account/AccountConfirmation";
import AccountVerification from "./pages/account/AccountVerification";
import PaymentPage from "./pages/checkout/PaymentPage";
import ForgotPassword from "./pages/home/ForgotPassword";
import HomePage from "./pages/home/HomePage";
import SignIn from "./pages/login/SignIn";
import NotFound from "./pages/notfound/NotFound";
import PrivateRoute from "./pages/privateRoute/PrivateRoute";
import InstitutionRoutes, {
  BASE_URL_CUSTOMERS,
  BASE_URL_INSTITUTIONS,
  CustomerRoutes,
  PATHS,
} from "./pages/routes";
import SignUp from "./pages/signup/SignUp";
import SignUpInstitution from "./pages/signup/SignUpInstitution";

const pages = ["Home", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

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
      <Router history={history}>
        <CssBaseline />
        <Switch>
          <Route exact path={PATHS.login} component={SignIn} />
          <Route exact path={PATHS.signup} component={SignUp} />
          <Route
            exact
            path={PATHS.signupinstitution}
            component={SignUpInstitution}
          />
          <Route
            exact
            path={PATHS.accountconfirmation}
            component={AccountConfirmation}
          />
          <Route
            path={PATHS.accountverification}
            component={AccountVerification}
          />
          <Route exact path={PATHS.payments} component={PaymentPage} />
          <Route exact path={PATHS.forgotpass} component={ForgotPassword} />
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path={PATHS.homepage}>
            <HomePage />
          </Route>

          <PrivateRoute
            path={CustomerRoutes.map(
              (item) => BASE_URL_CUSTOMERS.base + item.path
            )}
          >
            {({ match }) => {
              return (
                <ProvideAuth name={match.params.app}>
                  <CustomerLayout>
                    <Switch>
                      {CustomerRoutes.map(({ id, path, component, exact }) => (
                        <Route
                          key={id}
                          path={BASE_URL_CUSTOMERS.base + path}
                          component={component}
                          exact={exact}
                        />
                      ))}
                    </Switch>
                  </CustomerLayout>
                </ProvideAuth>
              );
            }}
          </PrivateRoute>
          <PrivateRoute
            path={InstitutionRoutes.map(
              (item) => BASE_URL_INSTITUTIONS.base + item.path
            )}
          >
            {({ match }) => {
              return (
                <ProvideAuth name={match.params.app}>
                  <InstitutionLayout>
                    <Switch>
                      {InstitutionRoutes.map(
                        ({ id, path, component, exact }) => (
                          <Route
                            key={id}
                            path={BASE_URL_INSTITUTIONS.base + path}
                            component={component}
                            exact={exact}
                          />
                        )
                      )}
                    </Switch>
                  </InstitutionLayout>
                </ProvideAuth>
              );
            }}
          </PrivateRoute>

          <Route path="*" component={NotFound} />
        </Switch>
      </Router>

      {/* <Router history={history}>
        <CssBaseline />
        <Switch>
          <Route exact path={PATHS.login} component={SignIn} />
          <Route exact path={PATHS.signup} component={SignUp} />
          <Route
            exact
            path={PATHS.signupinstitution}
            component={SignUpInstitution}
          />
          <Route exact path={PATHS.forgotpass} component={ForgotPassword} />
          <Route exact path="/">
            <HomePage />
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
          <Route path="/homepage" component={HomePage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router> */}
    </>
  );
};

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default App;
