

# 📚 BookHaven – MERN Stack Book Store

BookHaven is a full-stack MERN (MongoDB, Express, React, Node.js) web application where users can browse books, purchase subscription plans, manage orders, and admins can manage books, users, and payments.

---

## 🚀 Features

### ✅ **User Features**

* User Registration & Login (JWT-based)
* Browse all books
* Add/remove books to/from cart
* Checkout system
* Subscription Plans
* Make payments
* View orders
* Secure user dashboard

### 🔐 **Admin Features**

* Admin authentication
* Add, update, delete books
* Manage orders & users
* View payments
* Admin Dashboard

---

## 🛠️ Tech Stack

### **Frontend**

* React.js
* React Bootstrap
* React Router
* Axios (custom instance with `api.js`)
* Context API (Auth & Cart)

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt Password Hashing
* Cloud Uploads / Local Uploads

---

## 📂 Project Structure

```
/backend
    /models
    /routes
    server.js
    db.js
    .env

/frontend
    /src
        /components
        /pages
        api.js
        AuthContext.js
        CartContext.js
```

---

## ⚙️ Environment Variables

Create a `.env` file **inside backend**, not frontend.

```
PORT=3000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

## ▶️ Installation & Setup

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/bookhaven.git
cd bookhaven
```

### **2. Install Backend Dependencies**

```bash
cd backend
npm install
```

### **3. Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```


## ▶️ Start Development Servers


## 📦 Deployment Guide

### **Frontend**

Deploy on:

* Netlify
* Vercel

Set environment variable for API base URL.

### **Backend**

Deploy on:

* Render
* Railway
* DigitalOcean
* vercel.json (if using Vercel backend)

Update your frontend `.env` or `api.js` with the deployed API URL.

## 🤝 Contribution

Pull requests are welcome.
For major changes, open an issue first to discuss what you want to change.

---

## 📄 License

MIT License © 2025 BookHaven


