// const { transaction } = require('objection');
const express = require('express');
const passport = require('passport');
const UsersRouter = express.Router();
const User = require('./../models/users');
const middleware = require('./../services/middleware')

UsersRouter.get('/:id',
    passport.authenticate('jwt', { session: false }),
    middleware._auth('user'),
         async (req, res) => {

    const users = await User
        .query()
        .skipUndefined()
        .where('name', 'like', req.query.name)
        .where('id', 'like', req.query.id)
        .orderBy('name')
            return res.send(users);
})

UsersRouter.put('/:id',
    middleware._auth('user'),
    middleware.validateinputdata ,
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        let id = req.params.id;
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
                res.json(users);
    })


module.exports = UsersRouter;
