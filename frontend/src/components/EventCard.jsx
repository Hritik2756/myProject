import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleBookTicket = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const showId = event.Shows?.[0]?.id;
        if (!showId) {
            alert('No shows available for this event.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:3001/api/bookings/ticket', {
                showId: showId,
                seats: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/my-bookings');
        } catch (error) {
            console.error('Booking failed:', error);
            alert(error.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card glow-hover" style={{ padding: 0, border: 'none', background: 'var(--bg-card)' }}>
            <div style={{
                height: '450px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <img
                    src={event.imageUrl || event.posterUrl}
                    alt={event.title}
                    className="animate-float"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {event.category}
                </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#fff' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', height: '3rem', overflow: 'hidden' }}>
                    {event.description}
                </p>
                <button
                    onClick={handleBookTicket}
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    {loading ? 'Booking...' : 'Book Tickets'}
                </button>
            </div>
        </div>
    );
};

export default EventCard;
