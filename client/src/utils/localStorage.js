/**
 * Local Storage service
 */
class Storage {
    constructor(type) {
        this.storage = window[`${type}Storage`];
    }

    get(key) {
        let result = this.storage.getItem(key);

        /**
         * Hack for undefined
         */
        try {
            result = JSON.parse(result);
        } catch (err) {
            console.warn(key, err);
        }

        return result;
    }

    getPlain(key) {
        return this.storage.getItem(key);
    }

    set(key, obj) {
        const item = JSON.stringify(obj);

        this.storage.setItem(key, item);
    }

    setPlain(key, value) {
        this.storage.setItem(key, value);
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }
}

const LocalStorage = new Storage('local');
const SessionStorage = new Storage('session');

export { LocalStorage, SessionStorage };
