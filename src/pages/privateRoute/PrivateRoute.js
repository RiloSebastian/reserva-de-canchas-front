import React, { Component } from 'react'
import { Route, Redirect } from 'react-router';
import { PATHS } from '../routes';
const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {

    console.log('children')
    console.log(children)
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
