# 🧠 Anonymous Peer Support Platform
A hyper-local, fully anonymous mental health platform for college campuses.
Zero sign-ups. Zero PII. Data auto-deletes in 24 hours.

## Quick Start

### 1. Backend
cd server
npm install
cp ../.env.example .env   # fill in your MongoDB URI and JWT secret
npm run dev               # starts on http://localhost:5000

### 2. Frontend
cd client
npm install
npm run dev               # starts on http://localhost:5173

## Test Accounts
Volunteer login: testpeer1 / password123
(Run POST /api/volunteer/seed once to create this account)

## Team
- Person 1: Backend core (Express, MongoDB, APIs)
- Person 2: Auth + safety (JWT, trigger scanner, matchmaker)
- Person 3: GitHub owner + frontend integration
- Person 4: MongoDB Atlas setup + end-to-end testing
