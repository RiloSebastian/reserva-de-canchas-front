import React, { useContext, createContext, useState } from "react";
import { Route, Redirect } from "react-router";
import { PATHS } from "../routes";
import AuthService from "../../services/auth.service";

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function PrivateRoute({ children, ...rest }) {
  let user = JSON.parse(JSON.parse(AuthService.getCurrentUser()));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return typeof children == "function" ? children(props) : children;
        } else {
          return (
            <Redirect
              to={{
                pathname: PATHS.homepage,
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );

  /* const user = true//JSON.parse(JSON.parse(AuthService.getCurrentUser()));

    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (user) {
                        return typeof children == 'function' ? children(props) : children

                    } else {
                        return (<Redirect to={{ pathname: PATHS.login, state: { from: props.location } }} />)
                    }


                }

            }
        />
    ); */
}

export default PrivateRoute;
