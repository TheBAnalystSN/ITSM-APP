# ITSM Ticketing System – Backend

## Overview

This backend provides a REST API for an IT support ticketing system. It handles user authentication, role-based authorization, and full CRUD operations for support tickets.

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

## Setup Instructions

1. Clone the repository
2. Navigate to the backend folder
3. Install dependencies:
   npm install
4. Create a .env file with:
   MONGO_URI
   JWT_SECRET
   PORT
5. Start the server:
   npm run dev

## API Endpoints

### Auth

POST /api/auth/register  
POST /api/auth/login  

### Users

GET /api/users/profile  

### Tickets (User)

POST /api/tickets  
GET /api/tickets  
GET /api/tickets/:id  
DELETE /api/tickets/:id  

### Tickets (Admin)

GET /api/tickets/admin/all  
PATCH /api/tickets/admin/:id/status  
DELETE /api/tickets/admin/:id  

## Deployment

This backend is deployed on Render.

Live URL:
https://YOUR-BACKEND-URL
