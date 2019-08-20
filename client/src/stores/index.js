import UserStore from './UserStore';

class Stores {
    constructor() {
        this.userStore = new UserStore(this);
    }
}

export default new Stores();
