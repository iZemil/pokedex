import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

class ProfilePage extends Component {
    componentDidMount() {
        const {
            userStore: { fetchUser }
        } = this.props;

        fetchUser();
    }

    render() {
        const {
            userStore: {
                userData: { username, pokemons }
            }
        } = this.props;

        return (
            <div>
                <h1>{username}</h1>
                <h2>Your favorites:</h2>

                <ul>{pokemons.map(pok => <li key={pok}>{pok}</li>)}</ul>
            </div>
        );
    }
}

export default inject(({ userStore }) => ({
    userStore
}))(observer(ProfilePage));
