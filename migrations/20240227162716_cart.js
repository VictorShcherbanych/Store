/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
  
    create table carts (
        uuid uuid not null default uuid_generate_v4(),
        user_id UUID NOT NULL,
        products JSON
        primary key (uuid)
        FOREIGN KEY (user_id) REFERENCES users (uuid)
    );
  `);
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
    drop table carts;
  `);
  };
