process.env.NODE_ENV = 'test';

const Users = require('./../models/users');
const crypto = require('crypto')


let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let tokken = ''
let user = {
    username: "Vahe001",
    password: '123456',
    email: "Vahemelqon96@gmail.com",
    name: "Vahe Melqonyan"
}

chai.use(chaiHttp);

// describe('/',  () => {
//     beforeEach(  (done) => {
//         Users
//             .query()
//             .delete()
//             .then( () => {
//                 console.log(1)
//                 done()
//             })
//     });
// });
describe('/signup', () => {
    it('it should post user', (done) => {
        chai.request(app)
        .post('/signup')
        .send(user)
        .end((err, res) => {
            if(err) console.log("error ", err)

            res.body.should.be.a('object');
            res.body.should.have.property('token')
            res.body.users.should.have.property('id');
            res.body.users.should.have.property('username');
            res.body.users.should.have.property('password');
            res.body.users.should.have.property('email');
            res.body.users.should.have.property('name');
            res.body.users.should.have.property('role')

            done();
        });
    });
});


describe('/login ', () => {
    it('it should GET  user data', (done) => {
        chai.request(app)
        .get('/login?username=' + user.username + '&password=' + user.password)
        .end((err, res) => {
            if(err) console.log("error ", err)

            tokken = res.body.token
            user.id = res.body.users[0].id
            res.body.should.be.a('object');
            res.body.users.should.be.a('array');
            res.body.users.length.should.be.eql(1);
            res.body.users[0].should.have.property('id');
            res.body.users[0].should.have.property('username');
            res.body.users[0].should.have.property('password');
            res.body.users[0].should.have.property('email');
            res.body.users[0].should.have.property('name');
            res.body.users[0].should.have.property('role');

            done();
        });
    });
});
describe('/api/users ', () => {
    it('it should GET  users', (done) => {
        chai.request(app)
        .get('/api/users/' + user.id)
        .set('Authorization', "Bearer  " + tokken)
        .end((err, res) => {
            if(err) console.log("error ", err)
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);

            done()
        })
    });
});
