const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'telega_bot',
    'root',
    'root',
    {
        host: '77.223.107.220',
        port: '6432',
        dialect: 'postgres'
    }
)
