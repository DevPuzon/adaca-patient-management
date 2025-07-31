# 🚧 Playground Project

> **Note:** This project is for **testing purposes only**. Not intended for production use.

## 💠 Project Overview

This is a full-stack application with a React + Vite frontend and a Node.js/NestJS GraphQL backend. It uses PostgreSQL as the database and JWT-based authentication.

---

## 💪 Environment Variables

### 🔹 Frontend (`.env`)

```
VITE_GRAPHQL_API_URL=http://localhost:3000/graphql
```

### 🔸 Backend (`.env`)

```
BACKEND_PORT=3000
DATABASE_URL="postgresql://postgres:@localhost:6000/playground"
CRYPTO_SECRET=Sd623!jsd_23S
ENVIRONMENT=local
JWT_SECRET=0se#4%jbE=9S72jh!S@13hwe27qwen21#1
```

---

## ✨ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
```

### 3. Set up your `.env` files

Create a `.env` file in both `frontend/` and `backend/` directories using the provided variables above.

### 4. Run the app

```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

---

## ⚠️ Disclaimer

This project is a sandbox/test environment and **not suitable for production**. Secrets and tokens are hardcoded for convenience in testing only.
