const UsersApi = require('./userapi');
const AdminApi = require('./adminapi');
const User = require('./../models/users');
const Utility = require('./../services/utility')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

class ApiV1 {
    initialize(app) {
        app.use('/api/users', UsersApi);
        app.use('/api/admin', AdminApi);


        app.get('/login',async (req, res) => {
            if(!(req.query.email || req.query.username) || !req.query.password){
                return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_OR_USERNAME))
            }
            let users = await User
                .query()
                .skipUndefined()
                .where('email', 'like', req.query.email)
                .where('username', 'like', req.query.username)
                .andWhere('password', 'like',  req.query.password)
            if(users.length == 0){
                return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_OR_USERNAME))
            }
            jwt.sign({ users }, 'secretkey', { expiresIn: '60s' }, (err, token) => {
                res.json({
                    token, users
                });
            });
        })
            app.get('/logout', function (req, res) {
                req.logout();
                res.redirect('/');
            });

            app.post('/signup',async (req, res) => {
                if(req.body.role === "admin"){
                    let users = await User
                        .query()
                        .skipUndefined()
                        .where('role', 'like', req.body.role)
                    if(users.length != 0){
                        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.ADMIN_EXIST))
                    }
                }
                let user = {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    name: req.body.name,
                    role: req.body.role
                }
                const Person = await User
                    .query()
                    .skipUndefined()
                    .insert(user)
                res.send(Person)
            })
        }
    }


    module.exports = new ApiV1();
