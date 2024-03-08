/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex){
    await knex.raw(`

    create table warehouses (
        uuid uuid not null default uuid_generate_v4(),
        name VARCHAR(255) not null,
        address VARCHAR(255) not null,
        contact_person VARCHAR(255) not null,
        phone_number VARCHAR(12) not null,
        email VARCHAR(255) not null,
        city VARCHAR(255) not null,
        region VARCHAR(255) not null,
        CONSTRAINT unique_uuid UNIQUE (uuid)
    )`)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw(`
    drop table warehouses
    `)
}
