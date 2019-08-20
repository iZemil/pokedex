import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import {
    Router as ReactRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import MainLayout from 'components/layouts/MainLayout';
import SmartRoute from 'components/SmartRoute';
import routes from 'routes';

const history = createBrowserHistory();

function Root({ isAuth }) {
    return (
        <ReactRouter history={history}>
            <MainLayout>
                <Switch>
                    {routes.map(route => {
                        const routeProps = {
                            key: route.path,
                            history,
                            isAuth,
                            ...route
                        };

                        if (route.isPrivate && !isAuth) {
                            return (
                                <Route
                                    key="protection"
                                    render={() => <Redirect to="/" />}
                                />
                            );
                        }

                        return <SmartRoute {...routeProps} />;
                    })}

                    <Route component={() => <div>Not found page</div>} />
                </Switch>
            </MainLayout>
        </ReactRouter>
    );
}

Root.propTypes = {
    isAuth: PropTypes.bool.isRequired
};

export default inject(({ userStore: { isAuth } }) => ({ isAuth }))(
    observer(Root)
);
