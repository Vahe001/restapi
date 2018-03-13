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

  }

};
