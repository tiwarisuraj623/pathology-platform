import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AppointmentBooking from './components/AppointmentBooking';
import ReferralForm from './components/ReferralForm';
import ReportView from './components/ReportView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/refer" element={<ReferralForm />} />
        <Route path="/reports" element={<ReportView />} />
      </Routes>
    </Router>
  );
}

export default App;
