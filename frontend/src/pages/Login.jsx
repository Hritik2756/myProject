import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', formData);
            const { token, user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Login failed. Please check your credentials.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h2>

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
                        {loading ? 'Signing In...' : 'Log In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
