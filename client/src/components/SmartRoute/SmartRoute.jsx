import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const REDIRECT_PATHS = [
    '/sign-in',
    '/join',
    '/reset-password',
    '/new-password'
];

function SmartRoute({ component: RouteComponent, ...rest }) {
    const { isAuth, path } = rest;
    const needRedirect = isAuth && REDIRECT_PATHS.includes(path);

    return (
        <Route
            {...rest}
            render={props =>
                needRedirect ? (
                    <Redirect to="/private" />
                ) : (
                    <RouteComponent {...props} />
                )
            }
        />
    );
}

SmartRoute.propTypes = {
    component: PropTypes.func,
    isAuth: PropTypes.bool,
    path: PropTypes.string
};

export default SmartRoute;
