# Sales Order & Quotation System

A comprehensive web application for managing sales orders, quotations, customers, and products.

## Features

- Quotation Management
- Sales Order Processing
- Customer Management
- Product Catalog
- Reporting Dashboard

## Tech Stack

- Frontend: React.js with Bootstrap
- Backend: Node.js with Express.js
- Database: MySQL

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the database credentials and other configurations

4. Set up the database:
   ```bash
   # Run database migrations
   cd backend
   npm run migrate
   ```

5. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm start
   ```

## Project Structure

```
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
│
├── backend/              # Node.js backend application
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── utils/       # Utility functions
│   └── config/          # Configuration files
│
└── database/            # Database migrations and seeds
```

## API Documentation

API documentation is available at `/api-docs` when running the backend server.

## License

MIT 