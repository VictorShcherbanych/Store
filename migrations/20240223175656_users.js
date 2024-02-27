/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`

    create table users (
        uuid uuid not null default uuid_generate_v4(),
        login text not null,
        password text not null,
        email text not null,
        phonenumber integer not null,
        role text not null,
        primary key (uuid)
    );
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
    drop table users;
  `);
};
