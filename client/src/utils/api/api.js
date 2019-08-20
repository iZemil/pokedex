import apiRequest from './apiRequest';

const api = {
    get(path) {
        return apiRequest('GET', path);
    },

    post(path, body = {}) {
        return apiRequest('POST', path, body);
    },

    patch(path, body = {}) {
        return apiRequest('PATCH', path, body);
    }
};

export default api;
