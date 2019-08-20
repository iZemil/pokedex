import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import session from 'express-session';

import { isAuth } from 'utils/middlewares';
import User from './userSchema';
import { postPokemon, getUser } from './controllers';

const GITHUB_CLIENT_ID = 'da41226567989763e0d8';
const GITHUB_CLIENT_SECRET = '9ca1f792371105db1a356c6c437d56fee364e6c0';

function initRoutes(app) {
    app.use(
        session({
            secret: 'pokedex_secret',
            resave: true,
            saveUninitialized: true
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    // public routes
    app.get('/success', (req, res) => res.send('You have successfully logged in'));
    app.get('/error', (req, res) => res.send('error logging in'));

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });

    passport.deserializeUser((obj, cb) => {
        cb(null, obj);
    });

    passport.use(
        new GitHubStrategy(
            {
                clientID: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET,
                callbackURL: '/auth/github/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await User.findOne({
                        username: profile.username
                    });

                    if (user) {
                        return done(null, user);
                    }

                    const newUser = await User.create({
                        username: profile.username
                    });

                    return done(null, newUser);
                } catch (err) {
                    done(err);
                }
            }
        )
    );

    app.get('/auth/github', passport.authenticate('github'));
    app.get(
        '/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/error' }),
        (req, res) => res.redirect('http://62.109.23.130:8080/profile')
    );

    app.get('/user-auth', isAuth, (req, res) => {
        res.json({ user: req.user });
    });

    app.get('/user', isAuth, getUser);

    app.post('/pokemon', isAuth, postPokemon);
}

export default initRoutes;
