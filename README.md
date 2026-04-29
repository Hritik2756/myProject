# Event Booking Platform

A comprehensive event booking platform featuring a React frontend and a Node.js/Express backend. Users can browse events, book tickets, and manage their bookings, while administrators can create and manage events with image uploads.

## 🚀 Features

- **Authentication & Authorization**:
  - Secure JWT-based authentication.
  - User registration with email verification (Nodemailer).
  - Protected routes for authenticated users.
- **Event Management**:
  - Browse a list of available events.
  - View detailed event information.
  - Admin feature to add new events with image uploads (Multer).
- **Booking System**:
  - Seamless ticket booking flow.
  - View "My Bookings" history.
- **Robust Backend**:
  - Modular architecture (Controllers, Services, Models).
  - Centralized error handling and logging (Sentry).
  - Data validation using Joi.
  - Security headers with Helmet.
- **Modern Frontend**:
  - Built with React and Vite for performance.
  - Responsive design and dynamic routing.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router 7
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **ORM**: Sequelize
- **Database**: MySQL
- **Validation**: Joi
- **Security**: JWT, BcryptJS, Helmet, CORS
- **Media**: Multer (File Uploads)
- **Email**: Nodemailer
- **Monitoring**: Sentry, OpenTelemetry

## 📦 Project Structure

```text
myProject/
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page views
│   │   └── services/     # API integration
├── src/                  # Node.js backend
│   ├── config/           # App configuration (DB, Constants)
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Express middlewares (Auth, Validation)
│   ├── models/           # Sequelize models
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions (Email, Response)
│   └── validations/      # Joi schemas
├── index.mjs             # Backend entry point
└── package.json          # Backend dependencies & scripts
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MySQL Database

### Backend Setup
1. Navigate to the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file (see `.env.example`).
4. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🛣️ API Endpoints

### Auth
- `POST /api/auth/register` - Create a new account.
- `POST /api/auth/login` - Authenticate user.
- `GET /api/auth/verify-email/:token` - Verify email address.
- `GET /api/auth/me` - Get current user profile (Protected).

### Events
- `GET /api/events/list` - List all events.
- `GET /api/events/:id` - Get event details.
- `POST /api/events/add` - Create a new event (Admin, Protected, includes image upload).

### Bookings
- `POST /api/bookings/ticket` - Book a ticket (Protected).
- `GET /api/bookings/list` - List user's bookings (Protected).

## 📄 License
This project is licensed under the ISC License.
