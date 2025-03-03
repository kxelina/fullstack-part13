const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('readinglists', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'blogs',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: DataTypes.DATE
            },
            updated_at: {
                type: DataTypes.DATE
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('readinglists')
    }
}