const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {

        done(null, user);
    });

    passport.deserializeUser(function (user, done) {

        done(null, user);
    });

    //Login Administrator
    passport.use(
        'login-admin-irescue',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            async (req, user, password, done) => {
                db.query(
                    `SELECT * FROM ir_administrator WHERE admin_username = $1 AND admin_active = 1`, [user], async (err, results) => {
                    if (err) {
                        console.log(err.stack);
                        return done(null, false, req.flash('error', err.stack));
                    } else {
                        
                        if (!results.rows.length) {
                            return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                        } else {
                            if (!bcrypt.compareSync(password, results.rows[0].admin_password)) {
                                return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                            } else {    

                                let user = results.rows[0];
                                return done(null, user, null);
                            }
                        }
                    }
                });
            })
    );

    //Login Administrator - Branche
    passport.use(
        'login-user-irescue',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
            async (req, user, password, done) => {
                db.query(
                    `SELECT * FROM ir_users WHERE username = $1 AND user_active = 1`, [user], async (err, results) => {
                    if (err) {
                        console.log(err.stack);
                        return done(null, false, req.flash('error', err.stack));
                    } else {
                        
                        if (!results.rows.length) {
                            console.log("****************Primer IF****************");
                            return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                        } else {

                            if (!bcrypt.compareSync(password, results.rows[0].user_password)) {
                                console.log("****************Segundo IF****************");
                                return done(null, false, req.flash('warning', 'Usuario o contraseña incorrectos'));
                            } else {    

                                let user = results.rows[0];
                                return done(null, user, null);
                            }
                        }
                    }
                });
            })
    );
};
