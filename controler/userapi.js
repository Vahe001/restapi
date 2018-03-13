// const { transaction } = require('objection');
const express = require('express');
const UsersRouter = express.Router();
const User = require('./../models/users');
const passport = require('passport')
const auth = require('./../services/middleware')

UsersRouter.get('/:id',auth._auth('user'),passport.authenticate('bearer', { session: false }), async (req, res) => {
    
    const users = await User
        .query()
        .skipUndefined()
        .where('name', 'like', req.query.name)
        .where('id', 'like', req.query.id)
        .orderBy('name')
    res.json(users);

})
UsersRouter.put('/:id', passport.authenticate('bearer', { session: false }),async (req, res) => {
    let id = req.params.id;
    let user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name
    }
    const updatedPerson = await User
        .query()
        .skipUndefined()
        .patchAndFetchById(id, user);
    res.send(updatedPerson)
})


module.exports = UsersRouter;
