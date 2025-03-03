const { sequelize } = require('../util/db')

const { Model, DataTypes } = require('sequelize')

class Session extends Model {}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'users',
        key: 'id'
        }
    }
    }, {
    sequelize,
    modelName: 'session',
    underscored: true,
    timestamps: false
})

module.exports = Session