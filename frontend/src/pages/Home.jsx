import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/events/list')
            .then(res => res.json())
            .then(data => {
                setEvents(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching events:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <header style={{
                padding: '6rem 0',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9))',
                borderRadius: '24px',
                marginBottom: '4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h1 style={{
                        fontSize: '4.5rem',
                        marginBottom: '1rem',
                        fontWeight: '900',
                        background: 'linear-gradient(to right, #fff, var(--secondary-color))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1px'
                    }}>
                        Experience the Magic
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                        Book tickets for the most anticipated movies, concerts, and live events.
                        Premium seating, unbeatable prices.
                    </p>
                    <div className="flex-center" style={{ gap: '1.5rem' }}>
                        <Link to="/login" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Browse Events</Link>
                    </div>
                </div>
                {/* Background Decor */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-10%',
                    width: '120%',
                    height: '200%',
                    background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                    zIndex: 1
                }}></div>
            </header>

            {/* Event Gallery */}
            <section style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.5rem' }}>Upcoming Shows</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Don't miss out on these blockbuster experiences.</p>
                    </div>
                    <Link to="/register" style={{ color: 'var(--secondary-color)', fontWeight: '600', textDecoration: 'none' }}>View All &rarr;</Link>
                </div>

                {loading ? (
                    <div className="flex-center" style={{ height: '300px' }}>
                        <div className="spinner">Loading awesome events...</div>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </section>

            {/* Features / Why Choose Us */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '5rem'
            }}>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎟️</div>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Easy Booking</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Get your tickets in just a few clicks with our seamless checkout process.</p>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Instant Confirmation</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Receive your e-tickets immediately via email and in your account dashboard.</p>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️</div>
                    <h3 style={{ color: 'var(--secondary-color)' }}>Secure Payments</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Your transactions are protected with industry-leading encryption and security.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
