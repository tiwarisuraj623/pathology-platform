# Online Pathology and Blood Test Platform

This repository contains a full-stack application for an online pathology and blood test sample collection platform with appointment booking, doctor referral, report tracking, and admin panel functionality. It is split into two main parts:

- **backend/** – A Node.js/Express API server using MongoDB for data storage.
- **frontend/** – A React single-page application that interacts with the backend API.

## Features

### User Registration & Authentication

- Create accounts via email or phone with OTP verification.
- Role selection for patients, doctors, collectors, and admins.
- Password hashing and JWT-based authentication.
- Profile management and doctor verification workflow.

### Appointment Booking & Sample Collection

- Browse available tests with descriptions and pricing.
- Schedule home sample collection by choosing date, time, and address.
- Real‑time allocation of collectors (phlebotomists) and status updates.
- Order summary with selected tests and prices.
- Cancellation and rescheduling support.

### Doctor Referral Module

- Doctors can create and manage patient referrals for tests.
- Digital prescription uploads and test selection from a catalog.
- Shared referral status tracking for doctors and patients.

### Test Report Management

- Secure upload of test results by lab personnel or administrators.
- Notifications when reports are ready.
- Downloadable report files in PDF format.
- Historical report archive with metadata for patients and doctors.

### Report & Sample Status Tracking

- Real‑time tracking of sample collection status (scheduled, collected, in lab, processing, report ready).
- Notifications via email/SMS/app for status changes.

### Admin Panel & Management

- Role‑based access control for administrative operations.
- User and doctor management with approval workflows.
- Test catalog and pricing management.
- Operational metrics, logs, and analytics hooks.

### Notifications & Communication

- Configurable SMS and email templates for alerts and reminders.
- Two‑way communication channels between patients and doctors.

### Security & Compliance

- Data encryption in transit and at rest (when configured).
- Role‑based permissions and audit trails.
- HIPAA/GDPR compliance considerations.

## Getting Started

Each sub‑project has its own README with setup instructions. In summary:

1. **Backend**: Install dependencies (`npm install`), create a `.env` file based on the provided example, ensure MongoDB is running, and start the server (`npm run dev`).
2. **Frontend**: Install dependencies (`npm install`), optionally configure the API base URL via `.env`, and start the React app (`npm start`).

## Development Notes

### Version Control

This project includes a top‑level `.gitignore` file to ensure that transient files such as `node_modules`, build artefacts, logs, and environment files are not committed to version control. When cloning the repository or creating a fresh checkout, you should run `npm install` inside both `backend` and `frontend` to install the necessary dependencies.

### Environment Configuration

Environment variables are required for the backend to connect to MongoDB, sign JWT tokens, and (optionally) send emails or SMS messages. An example file (`backend/.env.example`) has been added to illustrate the expected variables. Copy this file to `.env` in the `backend` folder and fill in the appropriate values for your environment. At a minimum you must set:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pathologydb
JWT_SECRET=yourSecretKeyHere
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

For SMS delivery via Twilio you can also configure:

```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

These variables are optional unless you implement a real OTP delivery mechanism.

Feel free to explore the code to extend functionality, integrate with external services (e.g. SMS gateways, payment processors), or customize the user interface.
