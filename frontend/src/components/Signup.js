import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, verifyOtp } from '../api';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'patient',
    password: '',
    medicalIdUrl: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await register(form);
      setOtpSent(true);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await verifyOtp({ email: form.email, phone: form.phone, otp });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'OTP verification failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!otpSent ? (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          {form.role === 'doctor' && (
            <input
              type="text"
              name="medicalIdUrl"
              placeholder="Medical ID URL"
              value={form.medicalIdUrl}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleVerify}>
          <p>{message}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
