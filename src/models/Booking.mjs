import { DataTypes } from 'sequelize';
import sequelize from '../config/database.mjs';

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM('confirmed', 'cancelled', 'pending'),
        defaultValue: 'pending',
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Booking;
