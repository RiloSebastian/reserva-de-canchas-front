import React, { Component } from 'react'
import { Route, Redirect } from 'react-router';
import { PATHS } from '../routes';
const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                () => (
                    isAuthenticated
                        ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: PATHS.login
                                }}
                            />
                        ))
            }
        />
    );
}

export default PrivateRoute;
