import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import './Index.styl';

function IndexPage() {
    const isAuth = true;

    // if (isAuth) {
    //     return <Route render={() => <Redirect to="/private" />} />;
    // }

    return (
        <div className="index-page">
            <h1>Home page</h1>
        </div>
    );
}

export default IndexPage;
