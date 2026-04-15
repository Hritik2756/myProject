import { DataTypes } from 'sequelize';
import sequelize from '../config/database.mjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verification_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

export default User;
