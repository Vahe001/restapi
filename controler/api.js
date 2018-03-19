const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const UsersApi = require('./userapi');
const AdminApi = require('./adminapi');
const User = require('./../models/users');
const Utility = require('./../services/utility')
const middleware = require('./../services/middleware')
const LocalStrategy = require('passport-local').Strategy;

class ApiV1 {
    initialize(app) {
        app.use('/api/users', UsersApi);
        app.use('/api/admin', AdminApi);

        app.get('/login', (req, res) => {
            if(!(req.query.email || req.query.username) || !req.query.password){
                return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_OR_USERNAME))
            }
            User
                .query()
                .skipUndefined()
                .where('email', 'like', req.query.email)
                .where('username', 'like', req.query.username)
                .andWhere('password', 'like', crypto.createHash('sha1').update(req.query.password + 'chlp').digest('hex'))
                .then(users => {
                    if(users.length === 0){
                        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_OR_USERNAME))
                    }
                    jwt.sign({ users }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                        res.json({
                            token, users
                        });
                    });

                })
        })

        app.post('/signup',
            middleware.validateinputdata,
            (req, res) => {

                if(!req.body.username || !req.body.email || !req.body.password){
                    return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_INPUT_DATA))
                }

                if(req.body.role === "admin"){
                    User
                        .query()
                        .skipUndefined()
                        .where('role', 'like', req.body.role)
                        .then(users => {
                            if(users.length != 0){
                                return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.ADMIN_EXIST))
                            }
                        })
                }
                let user = {
                    username: req.body.username,
                    password: crypto.createHash('sha1').update(req.body.password + 'chlp').digest('hex'),
                    email: req.body.email,
                    name: req.body.name,
                    role: req.body.role
                }
                User
                    .query()
                    .skipUndefined()
                    .insert(user)
                    .then( users =>{

                        jwt.sign({ users }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                            res.json({
                                token,users
                            });
                        });
                    }).catch( err => {
                        res.send(err)
                    })
                })
    }
}


module.exports = new ApiV1();
