# Order Management

A full-stack Order Management Dashboard built with **FastAPI**, **Next.js**, and **PostgreSQL**. The application allows authenticated users to manage customer orders, search and filter records, receive real-time updates, and view currency conversions using an external API.

# Features

- JWT Authentication
- Order CRUD Operations
- Search Orders by Customer Name
- Filter Orders by Status
- Real-time Order Updates using WebSockets
- INR to USD Currency Conversion
- PostgreSQL Database
- Alembic Database Migrations
- Structured Logging
- Docker & Docker Compose Support
- Environment Variable Configuration
- Interactive API Documentation (Swagger)

# Technology Stack

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT Authentication
- Passlib (Password Hashing)
- HTTPX (External API)
- WebSockets

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

## DevOps

- Docker
- Docker Compose

# Running with Docker

git clone https://github.com/swaroopmon/order-dashboard

cd order-dashboard

docker compose up --build

The application will start:

Frontend - http://localhost:3000
Backend - http://localhost:8000
Swagger Docs - http://localhost:8000/docs

# Default Login

A default administrator account is automatically created during application startup if it does not already exist.

Username: admin
Password: admin123


# Author

Swaroop Mondapath