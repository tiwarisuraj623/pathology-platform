# Pathology Platform Frontend

This is the React frontend for the online pathology and blood test platform. It allows patients to register, login, book appointments, view referrals and reports, and doctors to manage referrals and appointments.

## Setup

1. Ensure Node.js is installed.
2. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

By default the app will run on `http://localhost:3000` and will proxy API requests to `http://localhost:5000` if configured.

## Environment Variables

You can create a `.env` file to override the API base URL:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Pages

- **Login**: `/`
- **Signup**: `/signup`
- **Patient Dashboard**: `/patient/dashboard`
- **Doctor Dashboard**: `/doctor/dashboard`
- **Book Appointment**: `/book-appointment`
- **Create Referral**: `/refer`
- **Report View**: `/reports`

