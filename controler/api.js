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

        app.get('/login', async (req, res) => {
            if(!(req.query.email || req.query.username) || !req.query.password){
                return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_OR_USERNAME))
            }
            const users = await User
                .query()
                .skipUndefined()
                .findOne({email: req.query.email,
                          username: req.query.username,
                          password: crypto.createHash('sha1').update(req.query.password + 'chlp').digest('hex')
                })
                    if(!users){
                        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_PASSWORD_OR_USERNAME))
                    }
                    jwt.sign({ users }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                        res.json({
                            token, users
                        });
                    });
        })

        app.post('/signup',
            middleware.validateinputdata,
            async (req, res) => {

                if(!req.body.username || !req.body.email || !req.body.password){
                    return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_INPUT_DATA))
                }

                if(req.body.role === "admin"){
                    const users = await User
                        .query()
                        .skipUndefined()
                        .findOne({'role': req.body.role})
                    if(users){
                        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.ADMIN_EXIST))
                    }

                }
                let user = {
                    username: req.body.username,
                    password: crypto.createHash('sha1').update(req.body.password + 'chlp').digest('hex'),
                    email: req.body.email,
                    name: req.body.name,
                    role: req.body.role
                }
                const users = await User
                    .query()
                    .skipUndefined()
                    .insert(user)

                        jwt.sign({ users }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                            res.json({
                                token,users
                            });
                        });
                })
    }
}


module.exports = new ApiV1();
