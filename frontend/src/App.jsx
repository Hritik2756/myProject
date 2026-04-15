import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import MyBookings from './pages/MyBookings';
import AddEvent from './pages/AddEvent';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="brand" style={{ fontSize: '1.5rem', letterSpacing: '2px', fontWeight: '800', color: 'var(--secondary-color)' }}>EVENTIFY</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/events">Events</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/my-bookings">My Bookings</Link>
            </div>
          </div>
        </nav>

        <main className="container" style={{ marginTop: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/add-event" element={<AddEvent />} />
          </Routes>
        </main>

        <footer style={{ marginTop: '4rem', padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', background: 'rgba(15, 23, 42, 0.5)' }}>
          <div className="container">
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>EVENTIFY</h3>
            <p>&copy; {new Date().getFullYear()} Eventify Pvt. Ltd. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
