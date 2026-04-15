import sequelize from '../config/database.mjs';
import User from './User.mjs';
import Event from './Event.mjs';
import Theater from './Theater.mjs';
import Show from './Show.mjs';
import Booking from './Booking.mjs';

// Define Associations

// Event and Theater -> Show
Event.hasMany(Show, { foreignKey: 'eventId' });
Show.belongsTo(Event, { foreignKey: 'eventId' });

Theater.hasMany(Show, { foreignKey: 'theaterId' });
Show.belongsTo(Theater, { foreignKey: 'theaterId' });

// User and Show -> Booking
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Show.hasMany(Booking, { foreignKey: 'showId' });
Booking.belongsTo(Show, { foreignKey: 'showId' });

export {
    sequelize,
    User,
    Event,
    Theater,
    Show,
    Booking,
};
