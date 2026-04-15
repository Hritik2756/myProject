import { DataTypes } from 'sequelize';
import sequelize from '../config/database.mjs';

const Theater = sequelize.define('Theater', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
        },
    },
}, {
    timestamps: true,
});

export default Theater;
