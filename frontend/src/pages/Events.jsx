import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/events/list');
                setEvents(response.data.data || []);
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const categories = ['All', 'Movie', 'Concert', 'Theater', 'Sports'];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Upcoming Events</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Find and book tickets for the best events in town.</p>
                </div>
                <Link to="/add-event" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>➕</span> Add New Event
                </Link>
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '3rem',
                flexWrap: 'wrap',
                background: 'var(--bg-card)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ margin: 0 }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '20px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: activeCategory === cat ? 'var(--secondary-color)' : 'transparent',
                                color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex-center" style={{ height: '40vh' }}>
                    <div className="spinner">Fetching events...</div>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <h3>No events found matching your criteria.</h3>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
