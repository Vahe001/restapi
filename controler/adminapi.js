const express = require('express');
const UsersRouter = express.Router();
const User = require('./../models/users');
const Utility = require('./../services/utility')
const passport = require('passport')

UsersRouter.get('/', async (req, res) => {

    var users = await User
        .query()
        .skipUndefined()
        .where('name', 'like', req.query.name)
        .where('id', 'like', req.query.id)
        .orderBy('name')
    res.send(users);

})
UsersRouter.put('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    let id = req.query.userid?req.query.userid:req.params.id;
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
UsersRouter.post('/', passport.authenticate('bearer', { session: false }), async (req, res) => {
    if(req.body.role === 'admin' ){
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.ADMIN_EXIST))
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

UsersRouter.delete('/user',passport.authenticate('bearer', { session: false }), async (req, res) => {
    let id = req.query.id;
    const numDeleted = await User
        .query()
        .delete()
        .where( ('id'), 'like', id);
    res.sendStatus(200)
})


module.exports = UsersRouter;
