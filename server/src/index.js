import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import userRoutes from 'modules/user/userRoutes';
import initMongoDB from './db';

const CLIENT_APP_PATH = '../client/build';

const app = express();

initMongoDB();
app.use(express.static(CLIENT_APP_PATH));
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

userRoutes(app);

// serves frontend application
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(`${CLIENT_APP_PATH}/index.html`), { root: __dirname }, err => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(8080, () => {
    console.warn('\x1b[36m%s\x1b[0m', '►  [Main application] was started');
});
