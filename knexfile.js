require('dotenv').config({path:'.env'});

if (!process.env.SERVER_USER) {
    throw new Error(`DB_DRIVER env variable is not set`);
}
  
  if (!process.env.PG_CONNECTION) {
    throw new Error(`DB_CONNECTION env variable is not set`);
  }
  
module.exports = {
  development: {
    client: process.env.SERVER_USER,
    connection: process.env.PG_CONNECTION},
  migrations: {
    directory: `${__dirname}/./migrations`,
    tableName: 'knex_migrations',
  },
  pool: {
    min: 2,  // Minimum number of connections in the pool
    max: 10, // Maximum number of connections in the pool
}};