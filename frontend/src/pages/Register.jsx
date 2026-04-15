import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', formData);
            setMessage({ type: 'success', text: response.data.data.message || 'Registration successful! Redirecting to login...' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Registration failed. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>

                {message.text && (
                    <div style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: message.type === 'success' ? '#155724' : '#721c24',
                        border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Full Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="name@company.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
