
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (t) {
        t.increments('id').primary()
        t.string('username').notNullable().unique().collate('utf8_unicode_ci');
        t.string('password').notNullable()
        t.string('name').notNullable()
        t.string('email').unique().collate('utf8_unicode_ci');
        t.string('role').default('user')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
