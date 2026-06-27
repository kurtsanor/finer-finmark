# Finer-FinMark

A modern, full-stack e-commerce marketplace platform with seller and buyer workflows, built with microservices architecture, React, and Express.

## Features

### User Authentication & Authorization

- User registration and login
- JWT-based authentication
- Role-based access control (Buyer/Seller)
- Password reset functionality

### Buyer Features

- **Shopping Cart**: Add, remove, and update product quantities
- **Checkout**: Secure checkout process with multiple payment steps
- **Order Management**: View order history and track order status
- **User Profile**: Manage account settings and preferences

### Seller Features

- **Shop Management**: Create and manage shop
- **Product Management**:
  - Create new products with detailed information
  - Edit existing product listings
  - Delete products
- **Order Fulfillment**: View incoming orders and update order status

### Shopping Features

- **Product Catalog**: Browse products by shop
- **Shopping Cart**: Persistent cart management
- **Pagination**: Efficient product listing navigation
- **Product Details**: Comprehensive product information with images

## 🏗 Architecture

The application follows a **Microservices Architecture** pattern:

```
┌─────────────────────────────────────────────────┐
│           Frontend (React + Vite)               │
│       Running on http://localhost:5173          │
└────────────────────┬────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────┐
│      API Gateway (Express)                      │
│   Routes requests to microservices              │
└──┬──────────┬──────────┬──────────┬─────────────┘
   │          │          │          │
   ▼          ▼          ▼          ▼
┌──────────┐┌────────┐┌─────────┐┌──────────┐
│Auth      ││Product ││Cart      ││Order     │
│Service   ││Service ││Service   ││Service   │
└──────────┘└────────┘└─────────┘└──────────┘
   │          │          │          │
   └──────────┴──────────┴──────────┘
              │
              ▼
         ┌─────────────┐
         │  MongoDB    │
         └─────────────┘
```

## Prerequisites

- **Node.js** (v18 or higher) and npm
- **Git**
- **Docker Desktop** (running)
- **VS Code**

## Running the application

### 1. Clone the Repository

```bash
git clone https://github.com/kurtsanor/finer-finmark.git
cd finer-finmark
```

### 2. Open in VS Code

```bash
code .
```

### 3. Start Microservices + MongoDB

Open the VS Code terminal (Ctrl + J) and run:

```bash
docker compose up --build
```

This will start:

- MongoDB database
- API Gateway (http://localhost:3000)
- Auth Service
- Product Service
- Cart Service
- Order Service

### 4. Start the Frontend

Open a new terminal instance in VS Code (Windows/Linux: Ctrl + Shift + `) and run:

```bash
cd frontend
npm install
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:

```
http://localhost:5173/sign-in
```
