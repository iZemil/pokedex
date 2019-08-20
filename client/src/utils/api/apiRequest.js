import { apiPath } from 'utils/constants/api';
import { USER_TOKEN } from 'utils/constants/user';
import { LocalStorage as ll } from 'utils/localStorage';

async function request(method, path, body = {}) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': ll.get(USER_TOKEN)
            // credentials: 'omit'
            // credentials: 'same-origin'
        }
    };

    // add body and method
    if (['POST', 'PATCH'].includes(method)) {
        options.method = method;
        options.body = JSON.stringify(body);
    }

    // Requests with formData
    if (body.__proto__.constructor.name === 'FormData') {
        options.body = body;
        // options.headers['Content-Type'] = 'multipart/form-data';
        delete options.headers['Content-Type'];
    }

    try {
        const response = await fetch(apiPath(path), { ...options });
        const { status } = response;

        if (status === 401) {
            ll.remove(USER_TOKEN);

            window.location.href = '/';
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('[API] error:', method, path, error);
    }
}

export default request;
