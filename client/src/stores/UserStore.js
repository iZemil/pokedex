import { observable, action, set } from 'mobx';

import { LocalStorage as ll } from 'utils/localStorage';
// import showAlert from 'utils/showAlert';
import api from 'utils/api';

class UserStore {
    constructor(stores) {
        this.stores = stores;

        this.getAuth();
    }

    // @observable isAuth = Boolean(ll.get(USER_TOKEN));
    @observable isAuth = Boolean(ll.get('user_token'));

    @observable userData = { username: '', pokemons: [] };

    @action.bound
    async getAuth() {
        const data = await api.get('/user-auth');

        if (data) {
            const {
                user: { username }
            } = data;

            this.isAuth = true;
            set(this.userData, { username });
            ll.set('user_token', true);
        } else {
            this.isAuth = false;
            ll.remove('user_token');
        }
    }

    @action.bound
    async fetchUser() {
        const { data } = await api.get('/user');

        const { pokemons, username } = data;

        if (pokemons && pokemons.length) {
            set(this.userData, { pokemons });
        }
    }
}

export default UserStore;
