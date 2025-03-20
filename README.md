# Sponzo

Sponzo is a sponsorship marketplace platform in early development. The vision is to create a platform that connects sponsors and creators, facilitating collaborations that benefit both parties.

## 🚧 Project Status

This project is currently in the **early development phase**. At this stage, we have implemented:
- Basic authentication system (email/password and Google OAuth)
- User account structure for sponsors and creators

Most features are planned but not yet implemented.

## 📂 Project Structure

The project follows a standard client-server architecture:

1. **Backend**: Built with Node.js, Express, and MongoDB.
   - Currently handles authentication and basic user management.
   - Located in the `backend` directory.

2. **Frontend**: Built with React and Vite.
   - Currently implements authentication flows and basic routing.
   - Located in the `frontend` directory.

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- A Google Cloud project with OAuth credentials
- A Gmail account for email services

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env-example` and configure the required environment variables:
   - Database connection string (`DB_URI`)
   - JWT secret (`JWT_SECRET`)
   - Email credentials (`EMAIL_USER`, `EMAIL_PASS`)
   - Google OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env-example` and configure the required environment variables:
   - API base URL (`VITE_API_URL`)
   - Google OAuth client ID (`VITE_GOOGLE_CLIENT_ID`)

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

## 🔄 Current Functionality

- **Authentication**:
  - Email/password signup and signin
  - Google OAuth integration
  - JWT-based session management

## 🚀 Planned Features

- **User Profiles**: Detailed profiles for sponsors and creators
- **Marketplace**: Browse and connect with potential partners
- **Campaign Management**: Create and manage sponsorship campaigns
- **Analytics**: Track campaign performance and engagement
- **Messaging**: In-platform communication between sponsors and creators
- **Payments**: Secure payment processing for sponsorships

## 💼 Contributing

As this project is in its early stages, we're currently focusing on core infrastructure. If you're interested in contributing, please reach out to the project team.

## 📧 Contact

For questions or feedback about the Sponzo project, please contact us at `sponzo.noreply@gmail.com`.
