import { DataTypes } from 'sequelize';
import sequelize from '../config/database.mjs';

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    posterUrl: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
});

export default Event;
