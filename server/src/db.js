import mongoose from 'mongoose';

const DB_USER = 'user';
const DB_PASS = 'pokedex13!)';
const MONGO_PATH = `mongodb://${DB_USER}:${DB_PASS}@ds211168.mlab.com:11168/pokedex`;

function initMongoDB(connectedCb) {
    // if (IS_DEV) {
    //     mongoose.set('debug', true);
    // }
    mongoose.connect(MONGO_PATH, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;

    const db = mongoose.connection;

    db.on('connected', () => {
        console.warn('\x1b[36m%s\x1b[0m', '►  [MongoDB] was connected');

        if (connectedCb) {
            connectedCb();
        }
    });

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    return db;
}

export default initMongoDB;
