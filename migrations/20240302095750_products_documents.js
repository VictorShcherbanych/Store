/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
    CREATE TABLE products_documents (
        uuid UUID NOT NULL DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        warehouse_id UUID REFERENCES warehouses(uuid),
        product_id UUID REFERENCES products(uuid),
        price DECIMAL(10,2) NOT NULL,
        received_date DATE NOT NULL
    );
    `
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