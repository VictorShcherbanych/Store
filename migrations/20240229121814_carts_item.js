/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw (`
    CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        cart_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES carts (uuid),
        FOREIGN KEY (product_id) REFERENCES products (uuid)
        );
        CREATE INDEX idx_cart_id ON cart_items (cart_id);    
    `)
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw (`
    drop table carts_item
    `)
}
