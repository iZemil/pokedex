// import jwt from 'jsonwebtoken';

// import { JWT_SECRET } from 'utils/constants';

// const invalidResponse = {
//     success: false,
//     message: 'No valid token provided.'
// };

// function checkAuth(req, res, next) {
//     const { headers, body, query } = req;
//     const token = headers['x-access-token'] || body.token || query.token;

//     if (token) {
//         // async fn
//         jwt.verify(token, JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 console.warn('[checkAuth]', err);
//                 return res.status(401).send(invalidResponse);
//             }

//             const { userId } = decoded;
//             // req.decoded = decoded;
//             req.userId = userId;
//             return next();
//         });
//     } else {
//         return res.status(403).send(invalidResponse);
//     }
// }

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/error');
}

export { isAuth };
