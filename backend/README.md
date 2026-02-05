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

## Authentication & Security

Authentication is handled using JSON Web Tokens (JWT). During registration, user passwords are hashed using bcrypt before being stored in the database.

Upon successful login or registration, a JWT is issued and must be included in the Authorization header for protected routes. This ensures that only authenticated users can access ticket data.

## Authorization & Role Management

Authorization is enforced through middleware that validates JWTs and attaches the authenticated user to the request object.

Role-based access control ensures that:

- Standard users can only access and manage their own tickets
- Admin users can view and manage all tickets in the system

## Database Schema Design

The application uses MongoDB with Mongoose schemas to define Users and Tickets. Each ticket references the user who created it using an ObjectId relationship.

Schemas include validation, default values, and enums to enforce data integrity and consistent ticket states.

## Testing the API

The API can be tested using Postman or similar tools:

1. Register a new user
2. Log in to receive a JWT
3. Include the JWT in the Authorization header for protected requests
4. Create, retrieve, update, and delete tickets
5. Verify that authorization rules are enforced for user and admin roles

## Deployment

This backend is deployed on Render.

Live URL:
<https://YOUR-BACKEND-URL>
