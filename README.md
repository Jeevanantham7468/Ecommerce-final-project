# 🛍️ AuraStore - MERN Stack E-Commerce Web Application

> **EMC Full Stack Program Final Assignment**  
> A production-grade, full-stack E-Commerce platform built with MongoDB, Express.js, React, and Node.js.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Architecture & Tech Stack](#-architecture--tech-stack)
4. [Project Directory Structure](#-project-directory-structure)
5. [Quick Start & Setup Instructions](#-quick-start--setup-instructions)
6. [Demo Accounts for Evaluation](#-demo-accounts-for-evaluation)
7. [RESTful API Endpoints](#-restful-api-endpoints)
8. [Testing & Verification](#-testing--verification)
9. [Deployment Guide](#-deployment-guide)

---

## 🌟 Project Overview

**AuraStore** is a modern, responsive, full-featured e-commerce web application meeting and exceeding all requirements outlined in the EMC Full Stack Program Final Assignment. It delivers a complete shopping lifecycle:
- Product browsing, category filtering, keyword searching, and sorting
- Product detail pages with stock tracking and customer reviews
- Real-time shopping cart with dynamic calculations (subtotal, tax, free shipping, coupons)
- Multi-step checkout with simulated card processing and address management
- User authentication and authorization via JSON Web Tokens (JWT) & bcrypt
- Customer profile with past order history and status tracking
- Full **Admin Dashboard** for catalog CRUD, order fulfillment, and user oversight
- Dual-database setup: connects to MongoDB Atlas or local MongoDB, and automatically falls back to an embedded in-memory database with pre-seeded data for zero-friction evaluation.

---

## ✨ Key Features

### 1. Frontend (React 18 + Vite + Tailwind CSS)
- **Home Page**: Hero showcase, category quick-jump cards, trending products, value proposition banner, and promo discount banners.
- **Product Listing**: Live search input, category filters, price range filter, sorting options (Newest, Price: Low to High, Price: High to Low, Rating, Popular), and responsive card grid.
- **Product Detail**: High-res imagery, stock status, star ratings, interactive quantity picker, detailed descriptions, and customer review submission form.
- **Shopping Cart**: Real-time quantity adjustments, item removal, dynamic tax calculation (8%), free shipping threshold ($100+), promo discount code (`SAVE15` for 15% off), and persistent storage via `localStorage`.
- **Checkout**: Shipping address entry/autofill, payment selection (Credit Card, PayPal, Cash on Delivery), order summary review, and order placement.
- **Order Confirmation**: Receipt page with order ID, delivery details, itemized breakdown, and status tracking.
- **User Authentication**: Login & registration pages with instant one-click demo credentials autofill.
- **Customer Profile**: Personal details update, password modification, and itemized order history with delivery badges (`Processing`, `Shipped`, `Delivered`).
- **Admin Dashboard**: Real-time metrics (Revenue, Total Orders, Products, Users), Product CRUD modal (Add/Edit/Delete), Order fulfillment status switcher, and User registry.

### 2. Backend (Node.js & Express.js)
- RESTful JSON API following MVC structure.
- Role-based access control with JWT Bearer tokens and `protect` / `adminOnly` middlewares.
- Mongoose schemas with validation, virtuals, and bcrypt password hashing.
- Stock deduction on completed order placement.
- Dual-engine database connection: supports standard `MONGODB_URI` (MongoDB Atlas / local) + fallback to embedded `mongodb-memory-server` with automated seed import.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, React Router DOM v6 |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **Database** | MongoDB, Mongoose ODM, MongoDB Memory Server |
| **Security** | JWT (jsonwebtoken), Passwords hashed with bcryptjs |

---

## 📂 Project Directory Structure

```text
mern-ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection & memory fallback
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile, user list
│   │   ├── productController.js  # Product CRUD, filters, reviews
│   │   └── orderController.js    # Order creation, history, admin updates & stats
│   ├── data/
│   │   └── seedData.js           # Sample products and initial accounts
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & role authorization
│   │   └── errorMiddleware.js    # 404 & centralized error handlers
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt
│   │   ├── Product.js            # Product & Review schema
│   │   └── Order.js              # Order & Line items schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/users
│   │   ├── productRoutes.js      # /api/products
│   │   └── orderRoutes.js        # /api/orders
│   ├── server.js                 # Express server bootstrap
│   ├── seeder.js                 # Database seeding script
│   ├── verify.js                 # Automated API test suite
│   ├── test_e2e.js               # End-to-end integration test
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js         # Fetch wrapper with JWT injection
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation & live cart badge
│   │   │   ├── Footer.jsx        # Footer & assignment info
│   │   │   ├── ProductCard.jsx   # Catalog product card
│   │   │   ├── Rating.jsx        # Star rating renderer
│   │   │   └── ProtectedRoute.jsx# Auth & Admin route guards
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # User login & token state
│   │   │   └── CartContext.jsx   # Shopping cart state & math
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrderSuccessPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── App.jsx               # Application route config
│   │   ├── index.css             # Tailwind base & custom styles
│   │   └── main.jsx              # React DOM entry
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
├── package.json                  # Root monorepo orchestration
└── README.md
```

---

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Clone & Install
```bash
# Clone the repository
git clone <your-repository-url>
cd mern-ecommerce

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment (Optional)
The backend includes a default `.env` file pre-configured for instant in-memory execution. If you wish to connect to an external MongoDB Atlas cluster, edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/aurastore?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkey_emc_assignment_2026_xyz987
NODE_ENV=development
```
*(If `MONGODB_URI` is left blank, the application automatically uses the embedded database without requiring any setup!)*

### 3. Run the Application
Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Client will run on http://localhost:5173
```

Open your browser and navigate to **`http://localhost:5173`**.

---

## 🔑 Demo Accounts for Evaluation

For rapid grading and testing, the application comes with pre-seeded demo accounts. You can type them manually or click the **"⚡ Quick Demo Credentials"** autofill buttons directly on the Login page:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Customer** | `user@example.com` | `password123` | Browsing, Add to Cart, Checkout, Order History, Reviews |
| **Administrator** | `admin@example.com` | `admin123` | All Customer features + Admin Dashboard, Product CRUD, Order Status Management |

---

## 📡 RESTful API Endpoints

### 1. Authentication & Users (`/api/users`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/users/register` | Public | Register new user account |
| `POST` | `/api/users/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/users/profile` | Private | Get current user profile details |
| `PUT` | `/api/users/profile` | Private | Update user profile, address, or password |
| `GET` | `/api/users` | Admin | List all registered users |

### 2. Products (`/api/products`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/products` | Public | Fetch products (supports `keyword`, `category`, `minPrice`, `maxPrice`, `sort`) |
| `GET` | `/api/products/:id` | Public | Fetch single product by ID |
| `GET` | `/api/products/categories/list` | Public | List all unique categories |
| `POST` | `/api/products` | Admin | Create a new product |
| `PUT` | `/api/products/:id` | Admin | Update existing product |
| `DELETE` | `/api/products/:id` | Admin | Delete a product |
| `POST` | `/api/products/:id/reviews` | Private | Add rating and review for a product |

### 3. Orders (`/api/orders`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/orders` | Private | Create and place an order (deducts stock) |
| `GET` | `/api/orders/myorders` | Private | Get logged-in user's order history |
| `GET` | `/api/orders/:id` | Private | Get single order details |
| `GET` | `/api/orders` | Admin | Get all orders across the platform |
| `PUT` | `/api/orders/:id/status` | Admin | Update fulfillment status (`Processing`, `Shipped`, `Delivered`, `Cancelled`) |
| `GET` | `/api/orders/stats/summary` | Admin | Retrieve sales and fulfillment metrics |

---

## 🧪 Testing & Verification

Automated test scripts are included in the `backend/` folder:

```bash
# Run server health and endpoint verification
cd backend
node verify.js

# Run full End-to-End integration test (User Login -> Order -> Admin update)
node test_e2e.js
```

---

## 🌐 Deployment Guide

### Deploying Backend to Render
1. Push this repository to GitHub.
2. Sign in to [Render](https://render.com) and create a **New Web Service**.
3. Connect your GitHub repository.
4. Set **Root Directory** to `backend`.
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `npm start`.
7. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: your secret key
   - `MONGODB_URI`: your MongoDB Atlas connection string

### Deploying Frontend to Vercel
1. Sign in to [Vercel](https://vercel.com) and select **Add New Project**.
2. Select your repository.
3. Set **Root Directory** to `frontend`.
4. Framework preset: **Vite**.
5. Add Environment Variable:
   - `VITE_API_BASE_URL`: your deployed Render backend URL (e.g. `https://your-api.onrender.com/api`).
6. Click **Deploy**.
