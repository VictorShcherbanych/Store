/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
    create table order_items(
        uuid uuid not null default uuid_generate_v4(),
        order_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        PRIMARY KEY (order_id, product_id),
        FOREIGN KEY (order_id) REFERENCES orders(uuid),
        FOREIGN KEY (product_id) REFERENCES products(uuid)
);

CREATE INDEX idx_order_items_order_id_product_id ON order_items (order_id, product_id);

    `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        drop column order_items
    `)
  
};
