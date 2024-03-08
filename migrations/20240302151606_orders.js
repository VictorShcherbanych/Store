/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex){
    await knex.raw (`
    CREATE TABLE orders (
        uuid uuid not null default uuid_generate_v4(),
        user_id UUID NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(255) NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        shipping_address TEXT NOT NULL,
        payment_method VARCHAR(255) NOT NULL,
        payment_status VARCHAR(255) NOT NULL,
        shipping_method VARCHAR(255) NOT NULL,
        shipping_cost DECIMAL(10,2),
        comments TEXT,
        FOREIGN KEY (user_id) REFERENCES users(uuid)
    );
    ALTER TABLE orders ADD CONSTRAINT unique_order_id UNIQUE (uuid);

    
    `)
}
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw (`
        drop table orders
    `)
}
