import React, { useEffect, useState } from 'react';
import { getReports } from '../api';

const ReportView = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getReports();
        setReports(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <ul>
        {reports.map((r) => (
          <li key={r._id}>
            Appointment: {new Date(r.appointment.date).toLocaleDateString()} - {r.test.name}{' '}
            <a href={r.fileUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportView;
