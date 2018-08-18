const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './data_base.sqlite'
});

const Usuario = sequelize.define('usuario', {
    nome: Sequelize.STRING(200)
});

module.exports = {
    sequelize,
    Usuario
};