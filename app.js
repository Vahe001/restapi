const express = require('express');
const bodyparser = require('body-parser');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const Knex = require('knex');
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('./models/users');

const knex = Knex(knexConfig.development);

Model.knex(knex);
passport.use(new BearerStrategy(
        (req) => {
        (token, done) => {
            User
                .query()
                .skipUndefined()
                .where({ token: req.headers.Authorization }, (err, user) => {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    return done(null, user, { scope: 'read' });
                });
        }
    }
    ));



const app = express()
    .use(bodyparser.json())
    .use(passport.initialize())
    .use(bodyparser.urlencoded({
    extended: true
}));

const api_v1 = require('./controler/api');
api_v1.initialize(app);


app.listen(3005, function(){
    console.log("Server is run");
});
