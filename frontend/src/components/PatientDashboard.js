import React, { useEffect, useState } from 'react';
import { getAppointments, getReferrals, getReports } from '../api';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <h3>Appointments</h3>
      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {new Date(a.date).toLocaleString()} - {a.tests.map((t) => t.name).join(', ')} - Status: {a.status}
          </li>
        ))}
      </ul>
      <h3>Referrals</h3>
      <ul>
        {referrals.map((r) => (
          <li key={r._id}>
            Doctor: {r.doctor.name}, Tests: {r.tests.map((t) => t.name).join(', ')}, Status: {r.status}
          </li>
        ))}
      </ul>
      <h3>Reports</h3>
      <ul>
        {reports.map((r) => (
          <li key={r._id}>
            Appointment on {new Date(r.appointment.date).toLocaleDateString()}, Test: {r.test.name}{' '}
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
