import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import PokemonList from 'components/pokemon/List';

import './Index.styl';

function IndexPage() {
    const isAuth = true;

    // if (isAuth) {
    //     return <Route render={() => <Redirect to="/private" />} />;
    // }

    return (
        <div className="index-page">
            <PokemonList />
        </div>
    );
}

export default IndexPage;
