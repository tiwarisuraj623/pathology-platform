import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTests, createReferral } from '../api';

const ReferralForm = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [prescriptionUrl, setPrescriptionUrl] = useState('');
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
      await createReferral({ patientId, tests: selectedTests, prescriptionUrl });
      navigate('/doctor/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Referral failed');
    }
  };

  return (
    <div>
      <h2>Create Referral</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />
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
              {t.name}
            </label>
          ))}
        </div>
        <input
          type="text"
          placeholder="Prescription URL (optional)"
          value={prescriptionUrl}
          onChange={(e) => setPrescriptionUrl(e.target.value)}
        />
        <button type="submit">Submit Referral</button>
      </form>
    </div>
  );
};

export default ReferralForm;
