# Arabian Nights Quiz - Backend

Flask REST API with SQLite database for user authentication.

## Setup

1. **Create virtual environment**:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. **Install dependencies**:
```powershell
pip install -r requirements.txt
```

3. **Configure environment** (optional):
```powershell
copy .env.example .env
# Edit .env with your settings
```

4. **Run the server**:
```powershell
python run.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

- **POST** `/api/auth/register`
  ```json
  {
    "username": "yourusername",
    "password": "yourpassword",
    "email": "optional@example.com"
  }
  ```
  Returns: `{ "token": "jwt-token", "user": {...} }`

- **POST** `/api/auth/login`
  ```json
  {
    "username": "yourusername",
    "password": "yourpassword"
  }
  ```
  Returns: `{ "token": "jwt-token", "user": {...} }`

- **GET** `/api/auth/me`
  - Requires: `Authorization: Bearer <token>` header
  - Returns: `{ "user": {...} }`

## Database

SQLite database (`quiz.db`) is created automatically on first run in the backend directory.

## Frontend Integration

The API is configured for CORS with `http://localhost:5173` (Vite default). Update `CORS_ORIGINS` in `.env` if needed.
