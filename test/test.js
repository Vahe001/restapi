process.env.NODE_ENV = 'test';

const Users = require('./../models/users');
const crypto = require('crypto')


let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

let tokken,admintoken

let user = {
    username: "Vahe001",
    password: '123456',
    email: "Vahemelqon96@gmail.com",
    name: "Vahe Melqonyan"
}
let admin = {
    username: 'Poxos',
    password: '147852',
    email: 'poxosyanpoxos@gmail.com',
    name: 'Poxos Poxosyan',
    role: 'admin'
}

chai.use(chaiHttp);

describe('hooks', () => {

  before((done) => {
      Users
          .query()
          .truncate()
          .then(() => {
              done();
          })
  });


describe('/signup for user', () => {
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

describe('/signup for admin', () => {
    it('it should post user', (done) => {
        chai.request(app)
        .post('/signup')
        .send(admin)
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

describe('/signup ', () => {
    it('it should return error', (done) => {
        chai.request(app)
        .post('/signup')
        .send(admin)
        .end((err, res) => {
            if(err) console.log("error ", err)
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Error: Admin can be only one.');
            done();
        });
    });
});

});

describe('/login for user', () => {
    it('it should GET  user data', (done) => {
        chai.request(app)
        .get('/login?username=' + user.username + '&password=' + user.password)
        .end((err, res) => {
            if(err) console.log("error ", err)
            tokken = res.body.token
            user.id = res.body.users.id
            res.body.should.be.a('object');
            res.body.users.should.have.property('id');
            res.body.users.should.have.property('username');
            res.body.users.should.have.property('password');
            res.body.users.should.have.property('email');
            res.body.users.should.have.property('name');
            res.body.users.should.have.property('role');
            done();
        });
    });
});


describe('/api/users GET', () => {
    it('it should GET  users', (done) => {
        chai.request(app)
        .get('/api/users/' + user.id)
        .set('Authorization', "Bearer  " + tokken)
        .end((err, res) => {
            if(err) console.log("error ", err)
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);

            done()
        })
    });
});

describe('/api/users PUT', () => {
    it('it should PUT user data', (done) => {
        chai.request(app)
        .put('/api/users/' + user.id)
        .set('Authorization', "Bearer  " + tokken)
        .send({
            username: 'Vahe007',
            email: 'Vahemelqon86@gmail.com'
        })
        .end((err, res) => {
            if(err) console.log("error ", err)
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            res.body.should.have.property('name');
            res.body.should.have.property('role');

            done()
        })
    });
});




describe('/login for admin', () => {
    it('it should GET  admin data', (done) => {
        chai.request(app)
        .get('/login?username=' + admin.username + '&password=' + admin.password)
        .end((err, res) => {
            if(err) console.log("error ", err)
            admintoken = res.body.token
            admin.id = res.body.users.id
            res.body.should.be.a('object');
            res.body.users.should.have.property('id');
            res.body.users.should.have.property('username');
            res.body.users.should.have.property('password');
            res.body.users.should.have.property('email');
            res.body.users.should.have.property('name');
            res.body.users.should.have.property('role');
            done();
        });
    });
});


describe('/api/admin GET', () => {
    it('it should GET  users', (done) => {
        chai.request(app)
        .get('/api/admin/' + admin.id)
        .set('Authorization', "Bearer  " + admintoken)
        .end((err, res) => {
            if(err) console.log("error ", err)
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);

            done()
        })
    });
});

describe('/api/admin PUT', () => {
    it('it should PUT user data', (done) => {
        chai.request(app)
        .put('/api/admin/' + admin.id)
        .set('Authorization', "Bearer  " + admintoken)
        .send({
            username: 'Poxos1990',
        })
        .end((err, res) => {
            if(err) console.log("error ", err)
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            res.body.should.have.property('name');
            res.body.should.have.property('role');

            done()
        })
    });
});
describe('hooks', () => {

  before((done) => {
      Users
          .query()
          .deleteById(user.id)
          .then(() => {
              done();
          })
  });

describe('/api/admin/ POST', () => {
    it('it should post user', (done) => {
        chai.request(app)
        .post('/api/admin/' + admin.id)
        .set('Authorization', "Bearer  " + admintoken)
        .send(user)
        .end((err, res) => {
            if(err) console.log("error ", err)
            user.id = res.body.id
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('username');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            res.body.should.have.property('name');
            res.body.should.have.property('role')

            done();
        });
    });
});

});

describe('/api/admin/user DELETE', () => {
    it('it should delete user', (done) => {
        chai.request(app)
        .delete('/api/admin/user/' + admin.id + "?id=" + user.id)
        .set('Authorization', "Bearer  " + admintoken)
        .end((err, res) => {
            console.log()
            if(err) console.log("error ", err)
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});
