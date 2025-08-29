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
    <div className="dashboard">
      <h2>Reports</h2>
      <ul className="item-list">
        {reports.map((r) => (
          <li key={r._id}>
            <strong>Appointment:</strong> {new Date(r.appointment.date).toLocaleDateString()} – <strong>Test:</strong> {r.test.name}
            {' '}
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
