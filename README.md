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
- **Checkout**: Secure checkout process
- **Order Management**: View order history and track order status

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

## Architecture

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
Initialize Swarm Mode: One-time, engine-level command that turns the local Docker Desktop engine into a Swarm manager. If already part of a swarm,
Docker will say so — that’s fine, move on.
STEP 1:
```bash
docker swarm init
```
STEP 2:
Build the Service Images
```bash
docker build -t finmark/api-gateway:1.0 ./api-gateway 
docker build -t finmark/auth-service:1.0 ./services/auth-service 
docker build -t finmark/product-service:1.0 ./services/product-service 
docker build -t finmark/order-service:1.0 ./services/order-service 
docker build -t finmark/cart-service:1.0 ./services/cart-service 
```
STEP 3: Validate the Stack File
```bash
docker stack config -c docker-stack.yml
```
STEP 4: Deploy the Stack
```bash
docker stack deploy -c docker-stack.yml finmark
```
STEP 5: Verify Everything is Running
```bash
docker service ls
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
Tear Down: Removes all Swarm services cleanly.
```bash
docker stack rm finmark
```
