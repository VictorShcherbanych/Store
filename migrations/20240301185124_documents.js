/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw (`
    create table documents (
        uuid uuid not null default uuid_generate_v4(),
        document_type VARCHAR(255) not null,
        document_number VARCHAR(255) not null,
        issue_date DATE not null,
        warehouse_id uuid REFERENCES warehouses(uuid),
        product_uuid REFERENCES products(uuid),
        quantity INTEGER not null,
        description TEXT
    );
    
    `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        drop table documents
    `)
  
};
