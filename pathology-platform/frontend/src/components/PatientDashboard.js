import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments, getReferrals, getReports } from '../api';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Redirect non‑patient users away
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role !== 'patient') {
        if (user.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else {
          navigate('/');
        }
        return;
      }
    }
    const fetchData = async () => {
      try {
        const appsRes = await getAppointments();
        setAppointments(appsRes.data);
        const refRes = await getReferrals();
        setReferrals(refRes.data);
        const repRes = await getReports();
        setReports(repRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h2>Patient Dashboard</h2>
      <h3>Appointments</h3>
      <ul className="item-list">
        {appointments.map((a) => (
          <li key={a._id}>
            <strong>{new Date(a.date).toLocaleString()}</strong> – {a.tests.map((t) => t.name).join(', ')} <br />
            Status: {a.status}
          </li>
        ))}
      </ul>
      <h3>Referrals</h3>
      <ul className="item-list">
        {referrals.map((r) => (
          <li key={r._id}>
            <strong>Doctor:</strong> {r.doctor.name} <br />
            <strong>Tests:</strong> {r.tests.map((t) => t.name).join(', ')} <br />
            <strong>Status:</strong> {r.status}
          </li>
        ))}
      </ul>
      <h3>Reports</h3>
      <ul className="item-list">
        {reports.map((r) => (
          <li key={r._id}>
            <strong>Appointment:</strong> {new Date(r.appointment.date).toLocaleDateString()}<br />
            <strong>Test:</strong> {r.test.name} <br />
            <a href={r.fileUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
