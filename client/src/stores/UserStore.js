import { observable } from 'mobx';

// import { LocalStorage as ll } from 'utils/localStorage';
// import { USER_TOKEN } from 'utils/constants/user';
// import showAlert from 'utils/showAlert';

class UserStore {
    constructor(stores) {
        this.stores = stores;

        // when(
        //     () => this.isAuth,
        //     () => {
        //         this.fetchUser();
        //     }
        // );
    }

    // @observable isAuth = Boolean(ll.get(USER_TOKEN));
    @observable isAuth = false;
}

export default UserStore;
