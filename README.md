# Kanban Board (MERN + Next.js + TypeScript)

## Features
✅ JWT Authentication  
✅ Drag & Drop Tasks  
✅ Real-time Updates (Socket.io)  

## Setup
1. Clone repo  
2. `cd backend && npm install`  
3. `cd frontend && npm install`  
4. Set `MONGO_URI` in `.env` of backend
5. Set Base URL in `.env` of frontend

## API Docs
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/signup` | POST | Register user |
| `/login`  | POST | Login user |
| `/board`  | GET  | Fetch board |