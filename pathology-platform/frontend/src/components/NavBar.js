import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Simple navigation bar component.  Displays different links based on the
 * currently logged in user's role.  It also provides a logout button that
 * clears localStorage and redirects to the login page.
 */
const NavBar = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav style={{ backgroundColor: '#007bff', padding: '10px' }}>
      <span style={{ color: '#fff', fontWeight: 'bold', marginRight: '20px' }}>Pathology Platform</span>
      {user.role === 'patient' && (
        <>
          <button
            style={{ marginRight: '10px' }}
            onClick={() => navigate('/patient/dashboard')}
          >
            Dashboard
          </button>
          <button onClick={() => navigate('/book-appointment')} style={{ marginRight: '10px' }}>
            Book Appointment
          </button>
        </>
      )}
      {user.role === 'doctor' && (
        <>
          <button
            style={{ marginRight: '10px' }}
            onClick={() => navigate('/doctor/dashboard')}
          >
            Dashboard
          </button>
          <button onClick={() => navigate('/refer')} style={{ marginRight: '10px' }}>
            Create Referral
          </button>
        </>
      )}
      <button onClick={handleLogout} style={{ float: 'right' }}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;