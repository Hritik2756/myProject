import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage({ type: 'error', text: 'You must be logged in to add an event.' });
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        if (image) {
            data.append('image', image);
        }

        try {
            await axios.post('http://localhost:3001/api/events/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage({ type: 'success', text: 'Event created successfully! Redirecting...' });
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error adding event:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to add event. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center animate-fade-in" style={{ padding: '2rem 0' }}>
            <div className="card" style={{ width: '100%', maxWidth: '700px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Add New Event</h2>

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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Event Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Star Wars: Episode IX"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-control"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Movie">Movie</option>
                                    <option value="Concert">Concert</option>
                                    <option value="Theater">Theater</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    rows="5"
                                    required
                                    style={{ resize: 'none' }}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell the world about this event..."
                                ></textarea>
                            </div>
                        </div>

                        <div>
                            <div className="form-group">
                                <label>Event Poster</label>
                                <div style={{
                                    border: '2px dashed var(--border-color)',
                                    borderRadius: '12px',
                                    height: '350px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }} onClick={() => document.getElementById('image-upload').click()}>
                                    {preview ? (
                                        <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
                                            <p style={{ color: 'var(--text-muted)' }}>Click to upload poster</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>JPG, PNG, WebP (Max 5MB)</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="image-upload"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 4rem' }} disabled={loading}>
                            {loading ? 'Creating Event...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
