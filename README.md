# ArabianNightsQuiz

A quiz application with React frontend and Flask backend featuring user authentication.

## Project Structure

- **Frontend**: React + Vite with authentication context
- **Backend**: Flask REST API with SQLite database and JWT authentication

## Authentication

Users authenticate with **username** and **password** (email is optional).

### Backend API Endpoints

- `POST /api/auth/register` - Create new user (requires: username, password; optional: email)
- `POST /api/auth/login` - Login (requires: username, password)
- `GET /api/auth/me` - Get current user (requires Bearer token)

## Quick Start

### Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python run.py
```
Server runs at `http://localhost:5000`

### Frontend
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

## Database Schema

The User model includes:
- `username` (unique, required)
- `password_hash` (bcrypt encrypted)
- `email` (optional)
- `created_at` (timestamp)