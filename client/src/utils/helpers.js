/**
 * get query param from url
 * @param {string} param
 */
export function getURLParam(param) {
    const urlObj = new URL(window.location.href);

    return urlObj.searchParams.get(param);
}

/**
 * create custom delay
 * @param {number} ms - wait milliseconds
 */
export function wait(ms = 2000) {
    return new Promise(res => setTimeout(res, ms));
}
