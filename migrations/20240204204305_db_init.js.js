/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
    create extension if not exists "uuid-ossp";

    create table products (
        uuid uuid not null default uuid_generate_v4(),
        name text not null,
        description text not null,
        price integer not null,
        picture text not null,
        timestamp timestamp not null default now(),
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
      drop table pricelists;
    `);
};