# Lost & Found — MERN Web Application

A full-stack Lost & Found web application for posting and discovering lost or found items. The repository includes the application source code and a project/internship report.

## Features

The repository contains frontend and backend code for:
- User registration and login
- User profiles and item posts
- Comments and post interactions
- Image uploads
- An admin area
- MongoDB-backed data storage

Feature availability and permissions depend on the current implementation; review the route files before deploying publicly.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, Vite, React Router, Axios |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose |
| Authentication libraries | bcrypt, JSON Web Token, cookie-parser |
| Uploads | Multer |

## Repository structure

```text
Lost-and-Found-MERN-Project-with-Report/
├── backend/
│   ├── routes/       # Authentication, users, posts, comments, admin
│   ├── models/       # Mongoose models
│   ├── images/       # Uploaded item images (runtime storage)
│   └── index.js      # Express entry point
├── frontend/
│   └── src/          # React application
└── ReadMe.md
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB local instance or MongoDB Atlas
- Git

## Run locally

### 1. Clone the repository

```bash
git clone https://github.com/yashvardhanmishra79-commits/Lost-and-Found-MERN-Project-with-Report.git
cd Lost-and-Found-MERN-Project-with-Report
```

### 2. Configure the backend

Create a file named `backend/.env`:

```env
MONGO_URL=mongodb://127.0.0.1:27017/LostAndFound
PORT=5000
SECRET=replace-this-with-a-long-random-secret
```

Choose an unused port if needed. The `SECRET` value is used to sign JSON Web Tokens. Keep it private, use a different value in production, and never commit `.env`.

### 3. Install and start the backend

Open a terminal in the repository root:

```bash
cd backend
npm install
npm run dev
```

The backend's `start` script is also available:

```bash
npm start
```

### 4. Install and start the frontend

Open a **second terminal** in the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (commonly `http://localhost:5173`).

The backend currently configures credentialed CORS for `http://localhost:5173`. If your frontend uses another origin, update the backend CORS configuration intentionally rather than enabling unrestricted origins.

## Creating an admin account

The current project instructions describe registering a user and changing that user's role directly in MongoDB Compass. This is a manual development workaround, not a safe production provisioning process. Do not expose an admin account or database to untrusted users.

## Troubleshooting

- **MongoDB connection fails:** confirm MongoDB is running and that `MONGO_URL` in `backend/.env` is correct.
- **Login or cookie issues:** check that frontend and backend origins match the CORS configuration and that credentials are handled consistently.
- **Image upload fails:** confirm the backend process can write to its configured image-upload directory.
- **Frontend cannot reach the API:** inspect the API base URL in the frontend source and confirm the backend port.

## Security and deployment notes

Before using this project with real users, review authentication and authorization across all routes, validate uploads and user input, restrict CORS to trusted origins, use HTTPS, and configure persistent storage for uploaded images. Do not store secrets in source control.

## Project report

The repository also contains the associated project report. See the repository files for the report document.

## License

No license file was found during this README review. Add a license file if you intend to permit reuse or redistribution.
