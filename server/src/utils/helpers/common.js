function getRandomInt([min, max]) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const wait = ms => new Promise(res => setTimeout(res, ms));

export { getRandomInt, wait };
