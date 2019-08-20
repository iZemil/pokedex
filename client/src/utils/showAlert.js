import { message } from 'antd';

/**
 *
 * @param {status} - Enum['success', 'error', 'info', 'warning', 'loading']
 */
function showAlert({ content, status, success, duration = 1.5 }) {
    let messageType;

    if (success !== undefined) {
        messageType = success ? 'success' : 'error';
    } else {
        messageType = status;
    }

    message[messageType](content, duration);
}

export default showAlert;
