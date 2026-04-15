import { Event, Show, Theater, Booking, sequelize } from '../models/index.mjs';

const seedEvents = async () => {
    try {
        await sequelize.sync(); // Ensure tables exist

        // Safely add columns if they don't exist
        try {
            await sequelize.query('ALTER TABLE `Events` ADD COLUMN `imageUrl` VARCHAR(255) AFTER `category`');
        } catch (e) { }
        try {
            await sequelize.query('ALTER TABLE `Events` ADD COLUMN `posterUrl` VARCHAR(255) AFTER `imageUrl`');
        } catch (e) { }

        // Clear existing data in correct order
        await Booking.destroy({ where: {} });
        await Show.destroy({ where: {} });
        await Event.destroy({ where: {} });
        await Theater.destroy({ where: {} });

        const theater = await Theater.create({
            name: 'Grand Cinema Hall',
            location: 'Downtown City',
            totalSeats: 200,
        });

        const events = [
            {
                title: 'Zenith: Beyond The Stars',
                description: 'An epic sci-fi journey across the galaxy.',
                category: 'Sci-Fi',
                imageUrl: '/assets/scifi.png',
                posterUrl: '/assets/scifi.png',
            },
            {
                title: 'Electric Pulse Festival',
                description: 'The ultimate live music experience with world-class DJs.',
                category: 'Music',
                imageUrl: '/assets/concert.png',
                posterUrl: '/assets/concert.png',
            },
            {
                title: 'Echoes in the Rain',
                description: 'A deeply moving story of love and loss in the city.',
                category: 'Drama',
                imageUrl: '/assets/drama.png',
                posterUrl: '/assets/drama.png',
            },
        ];

        for (const eventData of events) {
            const event = await Event.create(eventData);

            // Create some sample shows for each event
            await Show.create({
                eventId: event.id,
                theaterId: theater.id,
                startTime: new Date(Date.now() + 86400000), // Tomorrow
                endTime: new Date(Date.now() + 86400000 + 7200000), // Tomorrow + 2 hours
                availableSeats: 200,
                price: 15.99,
            });
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedEvents();
