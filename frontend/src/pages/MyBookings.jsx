import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view your bookings.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3001/api/bookings/list', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data.data.bookings || []);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Failed to load bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '50vh' }}>
                <div className="spinner">Loading your bookings...</div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>My Bookings</h2>

            {error && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    border: '1px solid #f5c6cb',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            {!error && bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎟️</div>
                    <h3 style={{ marginBottom: '1rem' }}>No bookings found</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't booked any tickets yet. Explore our upcoming shows and find something you love!</p>
                    <Link to="/" className="btn btn-primary">Browse Events</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {bookings.map((booking) => (
                        <div key={booking.id} className="card glow-hover" style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ fontSize: '2.5rem' }}>🎭</div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '0.5rem', color: 'var(--secondary-color)' }}>{booking.Show?.Event?.title || 'Unknown Event'}</h3>
                                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <span>📅 {new Date(booking.Show?.startTime).toLocaleDateString()}</span>
                                    <span>⏰ {new Date(booking.Show?.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span>📍 {booking.Show?.Theater?.name || 'Local Theater'}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{booking.seats} Seat(s)</div>
                                <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${booking.totalAmount}</div>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    marginTop: '0.5rem',
                                    background: booking.status === 'confirmed' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                                    color: booking.status === 'confirmed' ? '#4ade80' : '#fbbf24',
                                    border: `1px solid ${booking.status === 'confirmed' ? '#4ade80' : '#fbbf24'}`
                                }}>
                                    {booking.status.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
