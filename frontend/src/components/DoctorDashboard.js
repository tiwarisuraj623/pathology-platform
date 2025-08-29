import React, { useEffect, useState } from 'react';
import { getAppointments, getReferrals } from '../api';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [referrals, setReferrals] = useState([]);

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
    <div>
      <h2>Doctor Dashboard</h2>
      <button onClick={() => navigate('/refer')}>Create Referral</button>
      <h3>Referrals</h3>
      <ul>
        {referrals.map((r) => (
          <li key={r._id}>
            Patient: {r.patient.name}, Tests: {r.tests.map((t) => t.name).join(', ')}, Status: {r.status}
          </li>
        ))}
      </ul>
      <h3>Appointments</h3>
      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            Patient: {a.patient.name}, Date: {new Date(a.date).toLocaleString()}, Status: {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
