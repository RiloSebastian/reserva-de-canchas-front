import React from 'react'
import { Route, Redirect } from 'react-router';
import { PATHS } from '../routes';
import AuthService from '../../services/auth.service';

function PrivateRoute({ children, ...rest }) {

    const user = true//JSON.parse(JSON.parse(AuthService.getCurrentUser()));

    console.log('private route')
    console.log(user)

    return (
        <Route
            {...rest}
            render={
                (props) => {
                    console.log(user)
                    if (user) {
                        console.log('redirect')
                        return typeof children == 'function' ? children(props) : children

                    } else {
                        console.log('redirect')
                        return (<Redirect to={{ pathname: PATHS.login, state: { from: props.location } }} />)
                    }


                }

            }
        />
    );
}

export default PrivateRoute;
