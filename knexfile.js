module.exports = {
  development: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: 'localhost',
        port: '6666',
        user: 'root',
        password: '123456',
        database: 'users'
    }
},
  test:{
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: 'localhost',
        port: '6666',
        user: 'root',
        password: '123456',
        database: 'tests'
    }
  }

};

module.exports.port = {
    development:3006,
    test: 4444
}
