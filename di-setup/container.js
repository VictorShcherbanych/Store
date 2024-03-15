// container.js
const awilix = require('awilix');
const controllers = require('./controllers_setup');
const models = require('./models-setup');
const db = require('./db-setup');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

function setup() {
    controllers(container);
    models(container);
    db(container);
}

module.exports = {
    container,
    setup,
};
