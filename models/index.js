const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './data_base.sqlite',
    define:{
        freezeTableName: true, //true para desabilitar o plural
        timestamps: false, // false para remover data de criação e update automatico
    }
    // pool: {
    //     max: 10,
    //     min: 1,
    //     acquire: 20000,
    //     evict: 20000,
    //     idle: 20000,
    // }
});

const Usuario = sequelize.define('usuario', {
    
    id : {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    nascimento: Sequelize.DATEONLY,
    email: {
        type: Sequelize.STRING(150),
        unique: true
    }
        
});

module.exports = {
    sequelize,
    Usuario
};