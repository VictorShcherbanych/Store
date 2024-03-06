/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
        create table products_documents (
            uuid uuid not null default uuid_generate_v4(),
            name VARCHAR(255) not null,
            description TEXT,
            category VARCHAR(255) not null,
            quantity INTEGER not null,
            warehouse_id uuid REFERENCES warehouses(uuid),
            product_id uuid REFERENCES 
            price DECIMAL(10,2) not null,
            received_date DATE not null   
        )`
    )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw(`
        drop table products_documents
    `)
}

