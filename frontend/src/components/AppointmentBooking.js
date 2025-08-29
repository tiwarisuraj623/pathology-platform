import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTests, createAppointment } from '../api';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getTests();
        setTests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTests();
  }, []);

  const handleTestToggle = (id) => {
    setSelectedTests((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createAppointment({ tests: selectedTests, date, address });
      navigate('/patient/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Select Tests</h4>
          {tests.map((t) => (
            <label key={t._id}>
              <input
                type="checkbox"
                value={t._id}
                checked={selectedTests.includes(t._id)}
                onChange={() => handleTestToggle(t._id)}
              />
              {t.name} ({t.price})
            </label>
          ))}
        </div>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
