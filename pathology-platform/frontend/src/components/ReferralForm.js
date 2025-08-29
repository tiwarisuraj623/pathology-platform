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
    <div className="dashboard">
      <h2>Create Referral</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <div style={{ marginBottom: '10px' }}>
          <h4>Select Tests</h4>
          {tests.map((t) => (
            <div key={t._id} style={{ marginBottom: '5px' }}>
              <label>
                <input
                  type="checkbox"
                  value={t._id}
                  checked={selectedTests.includes(t._id)}
                  onChange={() => handleTestToggle(t._id)}
                />
                {t.name}
              </label>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Prescription URL (optional)"
          value={prescriptionUrl}
          onChange={(e) => setPrescriptionUrl(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          Submit Referral
        </button>
      </form>
    </div>
  );
};

export default ReferralForm;
