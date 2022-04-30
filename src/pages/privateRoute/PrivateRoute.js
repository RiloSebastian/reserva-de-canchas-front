import React from 'react'
import { Route, Redirect } from 'react-router';
import { PATHS } from '../routes';
import AuthService from '../../services/auth.service';

function PrivateRoute({ children, ...rest }) {

    const user = true//JSON.parse(JSON.parse(AuthService.getCurrentUser()));

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
    );
}

export default PrivateRoute;
