const Knex = require('knex');
const express = require('express');
const passport = require('passport')
const User = require('./models/users');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const bodyparser = require('body-parser');
const Utility = require('./services/utility')


const app = express()
    .use(bodyparser.json())
    .use(passport.initialize())
    .use(bodyparser.urlencoded({
    extended: true
}));

const knex = Knex(knexConfig[app.settings.env]);
Model.knex(knex);


require('./authorization')(app);

const api_v1 = require('./controler/api');
api_v1.initialize(app);


app.listen(knexConfig.port[app.settings.env], function(){
    console.log("Listening on port " + knexConfig.port[app.settings.env]);
});


module.exports = app;
