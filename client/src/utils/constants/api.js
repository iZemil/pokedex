const IS_DEV = process.env.NODE_ENV === 'development';

const API_URL = IS_DEV
    ? `http://${location.hostname}:8080`
    : `https://62.109.23.130:8080`;
const apiPath = path => `${API_URL}${path}`;

export { API_URL, apiPath };
