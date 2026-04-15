import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying');
    const [message, setMessage] = useState('');
    const hasCalled = useRef(false);

    useEffect(() => {
        if (hasCalled.current) return;
        hasCalled.current = true;

        const verifyToken = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/auth/verify-email/${token}`);
                setStatus('success');
                setMessage(response.data.data.message);
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Verification failed. The token may be invalid or expired.');
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
                {status === 'verifying' && (
                    <>
                        <div className="spinner" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⌛</div>
                        <h2>Verifying Your Email</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Working on securing your account, please wait a moment...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div style={{ fontSize: '4rem', color: 'var(--secondary-color)', marginBottom: '1.5rem' }}>✅</div>
                        <h2>Verification Successful!</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{message}</p>
                        <Link to="/login" className="btn btn-primary btn-block">Log In to Your Account</Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div style={{ fontSize: '4rem', color: 'var(--error-color)', marginBottom: '1.5rem' }}>❌</div>
                        <h2>Verification Failed</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{message}</p>
                        <Link to="/register" className="btn btn-primary btn-block">Try Registering Again</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
