const Knex = require('knex');
const express = require('express');
const passport = require('passport')
const User = require('./models/users');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
const bodyparser = require('body-parser');
const Utility = require('./services/utility')


const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express()
    .use(bodyparser.json())
    .use(passport.initialize())
    .use(bodyparser.urlencoded({
    extended: true
}));

require('./authorization')(app);

const api_v1 = require('./controler/api');
api_v1.initialize(app);


app.listen(3005, function(){
    console.log("Server is run");
});
