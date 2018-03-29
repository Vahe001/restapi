const crypto = require('crypto')
const express = require('express');
const passport = require('passport');
const UsersRouter = express.Router();
const User = require('./../models/users');
const Utility = require('./../services/utility')
const middleware = require('./../services/middleware')

UsersRouter.get('/:id',
    middleware._auth('admin'),
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        const users = await User
            .query()
            .skipUndefined()
            .where('name', 'like', req.query.name)
            .where('id', 'like', req.query.id)
            .orderBy('name')
                res.send(users);
    })

UsersRouter.put('/:id',
    middleware._auth('admin'),
    middleware.validateinputdata,
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        let id = req.query.userid?req.query.userid:req.params.id;
        let user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        }
        const users = await User
            .query()
            .skipUndefined()
            .patchAndFetchById(id, user)
                res.send(users);
    })


UsersRouter.post('/:id',
    middleware._auth('admin'),
    middleware.validateinputdata,
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        if(!req.body.username || !req.body.email || !req.body.password){
            return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_INPUT_DATA))
        }

        if(req.body.role === 'admin' ){
            return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.ADMIN_EXIST))
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
                res.send(users);
    })

UsersRouter.delete('/user/:id',
    middleware._auth('admin'),
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        let id = req.query.id;
        await User
            .query()
            .delete()
            .where(('id'), 'like', id)
                res.sendStatus(200)
    })


module.exports = UsersRouter;
