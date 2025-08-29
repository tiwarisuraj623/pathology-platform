# Pathology Platform Backend

This is the Node.js/Express backend for the online pathology and blood test platform. It exposes APIs for user management, appointment booking, doctor referrals, report management, and admin operations.

## Features

- User registration with OTP verification for email/phone.
- JWT-based authentication and role management.
- Appointment scheduling and status updates.
- Doctor referral creation and management.
- Test catalog management (admin).
- Report upload and retrieval.
- Role-based access control.

## Setup

1. Ensure Node.js and MongoDB are installed.
2. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file based on `.env.example`:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/pathologydb
   JWT_SECRET=supersecretkey
   EMAIL_USER=youremail@example.com
   EMAIL_PASS=yourpassword
   ```

5. Start the MongoDB server.

6. Start the development server:

   ```bash
   npm run dev
   ```

The API will run on the port specified in `.env` (default is `5000`).

## API Routes

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/verify-otp` | Verify OTP for user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/users/me` | Get current user details (auth) |
| PUT | `/api/users/me` | Update current user profile (auth) |
| GET | `/api/tests` | List available tests |
| POST | `/api/tests` | Create new test (admin) |
| POST | `/api/appointments` | Book an appointment (patient) |
| GET | `/api/appointments` | List appointments for the current user |
| PUT | `/api/appointments/:id/status` | Update appointment status (collector/admin) |
| POST | `/api/referrals` | Create a referral (doctor) |
| GET | `/api/referrals` | List referrals (doctor/patient) |
| POST | `/api/reports` | Upload a report (admin/collector) |
| GET | `/api/reports` | List reports for current user |

