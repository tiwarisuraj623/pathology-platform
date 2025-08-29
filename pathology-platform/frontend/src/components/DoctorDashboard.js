import React, { useEffect, useState } from 'react';
import { getAppointments, getReferrals } from '../api';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [referrals, setReferrals] = useState([]);

  // Ensure only doctors can access this dashboard
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role !== 'doctor') {
        // Redirect non‑doctor users to their appropriate dashboard
        if (user.role === 'patient') {
          navigate('/patient/dashboard');
        } else {
          navigate('/');
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appsRes = await getAppointments();
        setAppointments(appsRes.data);
        const refRes = await getReferrals();
        setReferrals(refRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Doctor Dashboard</h2>
      <button onClick={() => navigate('/refer')} style={{ marginBottom: '20px' }}>
        Create Referral
      </button>
      <h3>Referrals</h3>
      <ul className="item-list">
        {referrals.map((r) => (
          <li key={r._id}>
            <strong>Patient:</strong> {r.patient.name} <br />
            <strong>Tests:</strong> {r.tests.map((t) => t.name).join(', ')} <br />
            <strong>Status:</strong> {r.status}
          </li>
        ))}
      </ul>
      <h3>Appointments</h3>
      <ul className="item-list">
        {appointments.map((a) => (
          <li key={a._id}>
            <strong>Patient:</strong> {a.patient.name} <br />
            <strong>Date:</strong> {new Date(a.date).toLocaleString()} <br />
            <strong>Status:</strong> {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
