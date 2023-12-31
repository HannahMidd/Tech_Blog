const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config.js');

class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (data) => {
                data.password = await bcrypt.hash(data.password, 10);
                return data;
            },
            beforeUpdate: async (data) => {
                data.password = await bcrypt.hash(data.password, 10);
                return data;
            },
        },
        sequelize,
        timestamps: false,
        modelName: 'User',
        tableName: 'user',
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = User;
