import React, { useState } from 'react';
import axios from 'axios';

const CheckStatus = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post('http://localhost:3001/api/auth/check-verification', { email });
            setResult({ type: 'success', data: response.data.data });
        } catch (error) {
            setResult({
                type: 'error',
                message: error.response?.data?.message || 'Failed to check status. User not found or server error.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Verification Status Check</h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
                    Enter your email address to check if your account is verified or retrieve your verification token.
                </p>

                <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            placeholder="name@company.com"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Checking Status...' : 'Check Status'}
                    </button>
                </form>

                {result && result.type === 'success' && (
                    <div className="animate-fade-in" style={{
                        padding: '1.5rem',
                        borderRadius: '8px',
                        backgroundColor: '#e9ecef',
                        border: '1px solid var(--border-color)'
                    }}>
                        {result.data.message ? (
                            <div style={{ textAlign: 'center' }}>
                                <span style={{ fontSize: '2rem', display: 'block' }}>✅</span>
                                <p style={{ fontWeight: '600', color: 'var(--secondary-color)', margin: '0.5rem 0' }}>Verified</p>
                                <p style={{ margin: 0 }}>{result.data.message}</p>
                            </div>
                        ) : (
                            <div>
                                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Status: <span style={{ color: 'var(--error-color)' }}>Pending Verification</span></p>
                                <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Verification token (masked for security):</p>
                                <code style={{
                                    display: 'block',
                                    padding: '1rem',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    wordBreak: 'break-all',
                                    fontSize: '0.875rem',
                                    marginBottom: '1rem',
                                    fontWeight: '600',
                                    color: 'var(--text-muted)'
                                }}>
                                    {result.data.verification_token.substring(0, 6)}••••••••{result.data.verification_token.substring(result.data.verification_token.length - 6)}
                                </code>
                                <a
                                    href={`/verify-email/${result.data.verification_token}`}
                                    className="btn btn-secondary btn-block"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Verify Your Email Now
                                </a>
                                <p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                                    Click the button above to complete your verification immediately.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {result && result.type === 'error' && (
                    <div className="animate-fade-in" style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        border: '1px solid #f5c6cb',
                        textAlign: 'center'
                    }}>
                        {result.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckStatus;
