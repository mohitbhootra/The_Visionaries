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

## Key Safety Routes (Person 2)

### Volunteer Management
- **POST /api/volunteer/login** - Volunteer authentication (username + password)
- **POST /api/volunteer/seed** - Create test volunteer (prototype only)
- **PATCH /api/volunteer/availability** - Toggle volunteer online/offline status
- **POST /api/volunteer/match** - Request a peer match by tags

### Trigger Word System
The platform scans all incoming messages for crisis language:
- **Emergency tier:** Immediate divert to emergency contacts (suicide ideation, self-harm language)
- **Flagged tier:** Alert volunteer to monitor closely (depression, hopelessness, panic signals)
- All safe messages proceed to chat normally

### Authentication
- JWT tokens passed as `Authorization: Bearer <token>` header
- Tokens expire after 8 hours
- All protected routes require valid token

### Testing
Run test files in `server/` folder:
- `node test-scan.js` - Test trigger word detection
- `node test-flow.js` - Test full message pipeline and matchmaking

## Team
- Person 1: Backend core (Express, MongoDB, APIs)
- Person 2: Auth + safety (JWT, trigger scanner, matchmaker)
- Person 3: GitHub owner + frontend integration
- Person 4: MongoDB Atlas setup + end-to-end testing

## Prototype Status (v0.1)

### Working ✅
- Anonymous session with alias generation
- 24-hour TTL auto-delete
- Safe message flow
- Flagged message warning
- Emergency diversion with contacts
- Volunteer login and availability toggle

### Not in prototype ⏳
- Warden/admin dashboard
- Aggregation heatmap
- Email notifications
- Real-time socket chat (currently simulated)
