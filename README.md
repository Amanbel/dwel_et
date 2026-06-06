# DWEL

**Digital Wellness Enhancement Lab**

DWEL is a digital wellbeing platform that helps people understand how their social media habits may be shaping their mood, focus, energy, and daily routines.

Most people spend hours moving between videos, posts, comments, and feeds without having a clear picture of what that content is doing to them over time. Some content can be educational, calming, or motivating. Other content can be stressful, distracting, emotionally draining, or simply consume more time than expected. DWEL gives users a private way to notice those patterns.

The app works quietly while the user browses supported social platforms. It records basic information about the content being viewed, estimates how that content may affect wellbeing, and turns the results into a dashboard with scores, trends, reports, and recommendations.

The goal is not to judge users or diagnose mental health conditions. DWEL is designed as a reflection tool: it helps users ask better questions about their digital life, such as:

- Which platforms take most of my attention?
- What topics do I consume the most?
- Am I seeing more positive, neutral, or stressful content?
- Is my screen time supporting my goals or working against them?
- What small changes could improve my digital routine?

For judges and reviewers, DWEL demonstrates a complete product experience: a browser extension collects activity, a dashboard visualizes wellbeing patterns, and reports summarize what changed over time.

## What DWEL Does

DWEL can monitor content viewed on platforms such as:

- YouTube
- TikTok
- Instagram
- X / Twitter
- Facebook
- Reddit
- Other social media websites

For each tracked page, DWEL looks at lightweight, non-invasive details such as:

- Platform
- URL
- Page title
- Description
- Hashtags
- Approximate viewing duration

DWEL then turns those signals into easy-to-understand insights, including:

- Overall wellbeing score
- Screen time and social media time
- Top content categories
- Emotional exposure trends
- Platform impact
- Session history
- Daily, weekly, and monthly reports
- Personalized recommendations

## System Flow

```txt
Browser Extension
    ↓
Content Metadata Extraction
    ↓
Backend API
    ↓
OpenRouter Gemini Classification
    ↓
Impact Engine
    ↓
MySQL Database
    ↓
Analytics + Reports APIs
    ↓
React Dashboard
```

## Main Features

### Phase 1

- Express backend
- MySQL database
- Raw SQL data access with `mysql2`
- Content ingestion API
- OpenRouter Gemini classification
- Wellbeing impact scoring

### Phase 2

- User registration
- Login
- JWT access tokens
- Refresh tokens
- Protected backend routes
- Password hashing with bcrypt

### Phase 3

- Analytics engine
- Dashboard APIs
- Category exposure
- Emotional exposure trends
- Platform impact analytics
- Session explorer
- Daily, weekly, and monthly report generation

### Phase 4

- Subscription plans
- Upgrade endpoint
- Mock Stripe / Chapa checkout flow
- Feature gating for advanced reports and PDF export placeholders

## Project Structure

```txt
dwel_et/
├─ src/                         # React frontend
│  ├─ pages/                    # Dashboard, analytics, reports, profile, auth
│  ├─ services/                 # Axios API integration
│  ├─ store/                    # React contexts
│  ├─ hooks/                    # Frontend data hooks
│  └─ components/               # UI components and charts
│
├─ dwel_et_backend/             # Express + TypeScript backend
│  ├─ src/app.ts                # Express app and route mounting
│  ├─ src/config/database.ts    # MySQL pool and schema initialization
│  ├─ src/controllers/          # Route handlers
│  ├─ src/repositories/         # Raw SQL repositories
│  ├─ src/services/             # Auth, analytics, reports, ingestion, impact
│  └─ src/routes/               # API routes
│
└─ browser_extension/           # Chrome extension MVP
   ├─ manifest.json
   ├─ content.js
   ├─ background.js
   ├─ popup.html
   ├─ popup.css
   └─ popup.js
```

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express
- TypeScript
- MySQL
- Raw SQL with `mysql2/promise`
- JWT
- bcrypt
- OpenRouter Gemini API

### Extension

- Chrome Manifest V3
- Content scripts
- Background service worker
- Chrome storage

## Backend Setup

Go to the backend folder:

```bash
cd dwel_et_backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
CLIENT_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dwel_et

ACCESS_SECRET=replace_with_a_strong_access_secret
REFRESH_SECRET=replace_with_a_strong_refresh_secret

OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=google/gemini-flash-1.5

APP_URL=http://localhost:5173
```

Create the MySQL database:

```sql
CREATE DATABASE dwel_et;
```

Run the backend:

```bash
npm run dev
```

The backend starts at:

```txt
http://localhost:3000
```

Health check:

```txt
http://localhost:3000/api/health
```

The backend automatically creates the required MySQL tables on startup.

## Frontend Setup

From the project root:

```bash
npm install
```

Create a frontend `.env` file in the root folder:

```env
VITE_API_URL=http://localhost:3000/api
```

Run the React app:

```bash
npm run dev
```

The frontend starts at:

```txt
http://localhost:5173
```

## Browser Extension Setup

For judges and local demos, a ready-to-share extension package is included at the project root:

```txt
browser_extension.zip
```

Chrome does not install unpacked extensions directly from a zip file, so judges should unzip it first.

### Install From `browser_extension.zip`

1. Download or copy `browser_extension.zip`.
2. Unzip it to any local folder.
3. Open Chrome.
4. Go to `chrome://extensions`.
5. Enable **Developer mode** in the top-right corner.
6. Click **Load unpacked**.
7. Select the unzipped `browser_extension` folder, not the zip file itself.
8. Pin or open the DWEL extension from the Chrome toolbar.
9. In the extension popup, set the API URL:

```txt
http://localhost:3000/api
```

10. Paste a JWT access token from a logged-in DWEL user.
11. Browse supported social platforms, then return to the dashboard to see analytics update.

If Chrome says the manifest is missing, the wrong folder was selected. Select the folder that contains:

```txt
manifest.json
background.js
content.js
popup.html
```

### Install From Source Folder

Developers can also load the extension directly from the source folder:

```txt
browser_extension/
```

Steps:

1. Open Chrome.
2. Go to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `browser_extension` folder.
6. Open the extension popup.
7. Set the API URL:

```txt
http://localhost:3000/api
```

8. Paste a JWT access token from a logged-in user.

For a public deployment, replace the API URL with your hosted backend URL:

```txt
https://your-backend-domain.com/api
```

## How Authentication Works

The React app uses Axios through `src/services/api.ts`.

On login:

1. The frontend calls `/api/auth/login`.
2. The backend verifies the password.
3. The backend returns:
   - `accessToken`
   - `refreshToken`
   - `user`
4. The frontend stores tokens in `localStorage`.
5. Axios automatically attaches the access token to protected requests.

If the access token expires, Axios calls `/api/auth/refresh` and retries the failed request with the new token.

## Core API Routes

### Auth

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/users/me
```

### Extension Ingestion

```txt
POST /api/extension/events
```

Example payload:

```json
{
  "platform": "youtube",
  "url": "https://youtube.com/watch?v=...",
  "title": "How Investing Works",
  "description": "Beginner investing guide",
  "hashtags": ["finance", "education"],
  "duration": 180
}
```

### Analytics

```txt
GET /api/analytics/overview
GET /api/analytics/dashboard
GET /api/analytics/categories
GET /api/analytics/emotions/trends
GET /api/analytics/apps/impacts
GET /api/analytics/insights
GET /api/sessions
```

### Reports

```txt
GET  /api/reports
POST /api/reports/generate
GET  /api/reports/:id
GET  /api/reports/:id/export
```

### Subscriptions

```txt
GET  /api/subscriptions/plans
GET  /api/subscriptions/current
POST /api/subscriptions/checkout
POST /api/subscriptions/upgrade
```

## Classification and Impact Scoring

The backend sends content metadata to OpenRouter Gemini and asks for structured JSON:

```json
{
  "topics": ["education", "finance"],
  "emotions": ["motivation"],
  "sentiment": "positive",
  "riskLevel": "low",
  "wellbeingImpact": "supportive",
  "confidence": 0.91
}
```

The impact engine converts classification results into a normalized wellbeing score from `0` to `100`.

Examples:

- Educational content increases the score.
- Fitness and motivational content increases the score.
- Stress, anxiety, violence, or high-risk content reduces the score.
- Positive sentiment improves the score.
- Negative sentiment reduces the score.

Only processed metadata and classification outputs are stored. DWEL does not store screenshots.

## Reports

DWEL can generate:

- Daily reports
- Weekly reports
- Monthly reports

Reports include:

- Average wellbeing score
- Focus percentage
- Disruption percentage
- Calm exposure
- Stress exposure
- Fatigue risk
- Recommendations

Monthly reports and PDF export are subscription-gated.

## Subscription Model

Current plans:

- `sub_base`: free tier with basic analytics
- `sub_pro`: full history, monthly reports, advanced insights, PDF export placeholder
- `sub_premium`: long-term tracking and premium recommendations

The current Stripe / Chapa integration is a mock checkout flow suitable for demo use. Real payment provider webhooks can be added later.

## Running Builds

Frontend:

```bash
npm run build
```

Backend:

```bash
cd dwel_et_backend
npm run build
```

## Demo Checklist

1. Start MySQL.
2. Create the `dwel_et` database.
3. Start the backend with `npm run dev`.
4. Start the frontend with `npm run dev`.
5. Register a user in the React app.
6. Login and copy the JWT access token from localStorage.
7. Unzip `browser_extension.zip`.
8. Open `chrome://extensions` and enable **Developer mode**.
9. Click **Load unpacked** and select the unzipped `browser_extension` folder.
10. Paste the API URL and access token into the extension popup.
11. Browse supported social platforms.
12. Return to the dashboard to view analytics, reports, and sessions.

## Privacy Notes

DWEL is designed to minimize sensitive storage.

The extension sends page metadata and short text context, not screenshots or video files. The backend stores processed classification data, topics, emotions, sentiment, platform, URL, and duration so the dashboard can show trends without keeping heavy raw media.

## Project Status

DWEL is currently an MVP with:

- Working frontend-backend Axios integration
- Raw SQL backend persistence
- JWT authentication
- Browser extension ingestion
- OpenRouter Gemini classification
- Analytics and report APIs
- Subscription and feature-gating foundation

Next improvements could include real Stripe / Chapa webhooks, hosted deployment, extension store publishing, PDF generation, richer recommendation models, and a backend AI coach endpoint.
