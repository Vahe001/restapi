const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const ErrorTypes = require('./services/Utility').ErrorTypes;
const User = require('./models/users');

let secret = 'secretkey'

const app = express();

module.exports = app => {

    let jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };


    let strategy = new Strategy(jwtOptions, (payload, next) => {
        User
            .query()
            .skipUndefined()
            .findById(payload.id)
            .then( user => {
                if (user) {
                    next(null, user);
                } else {
                    next((ErrorTypes.USER_NOT_EXIST), false);
                }
            })
    });
    passport.use(strategy);
}
