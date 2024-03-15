// db.js
const { asValue } = require('awilix');
const db = require('../knexfile');

module.exports = (container) => {
  container.register({
    db: asValue(db)
  });
};
