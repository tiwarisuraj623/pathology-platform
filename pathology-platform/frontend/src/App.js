import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AppointmentBooking from './components/AppointmentBooking';
import ReferralForm from './components/ReferralForm';
import ReportView from './components/ReportView';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

// Global styles
import './App.css';

function App() {
  return (
    <Router>
      {/* Global NavBar appears on all authenticated pages */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/patient/dashboard"
          element={
            <PrivateRoute>
              <PatientDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRoute>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/book-appointment"
          element={
            <PrivateRoute>
              <AppointmentBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/refer"
          element={
            <PrivateRoute>
              <ReferralForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <ReportView />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
