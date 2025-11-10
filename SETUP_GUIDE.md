# E-Commerce Website - Setup Guide

This guide will help you set up and run the E-Commerce website on your local machine.

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [MongoDB Atlas Setup](#mongodb-atlas-setup)
4. [Running the Application](#running-the-application)
5. [Testing the Application](#testing-the-application)
6. [Common Issues](#common-issues)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB Atlas Account** (free) - [Sign up here](https://www.mongodb.com/cloud/atlas)

To check if Node.js and npm are installed:
```bash
node --version
npm --version
```

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Krishnakanth303/E-commerce-website.git
cd E-commerce-website
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

This will install all the backend dependencies listed in `package.json`:
- express
- mongoose
- dotenv
- cors
- body-parser
- bcryptjs
- jsonwebtoken
- nodemon (dev dependency)

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

This will install all the frontend dependencies:
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- postcss
- autoprefixer

---

## MongoDB Atlas Setup

### Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Cluster

1. Click **"Build a Database"**
2. Select **"M0 Free"** tier
3. Choose your preferred **Cloud Provider** and **Region** (preferably closest to you)
4. Click **"Create Cluster"** (this may take 3-5 minutes)

### Step 3: Configure Database Access

1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter a username and generate/create a strong password
5. **IMPORTANT:** Save these credentials securely
6. Set **"Database User Privileges"** to **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Configure Network Access

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **Note:** For production, you should restrict this to specific IP addresses
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database user password
6. Replace the database name after `.net/` with `ecommerce`:
   ```
   mongodb+srv://username:yourpassword@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

### Step 6: Configure Environment Variables

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Create a `.env` file:
   ```bash
   # On Windows
   copy .env.example .env
   
   # On Mac/Linux
   cp .env.example .env
   ```

3. Open `.env` file and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_random_secret_key_here
   ```

4. **IMPORTANT:** Replace the placeholders with your actual values

---

## Running the Application

### Step 1: Seed the Database (First Time Only)

Before running the application for the first time, seed the database with sample products:

```bash
# Make sure you're in the server directory
cd server
npm run seed
```

You should see output like:
```
✅ MongoDB Connected
🗑️  Cleared existing products
✅ Successfully seeded 15 products

📦 Seeded Products:
1. Laptop - Dell XPS 13 - ₹85000
2. Wireless Mouse - Logitech MX Master 3 - ₹8500
...
```

### Step 2: Start the Backend Server

```bash
# Make sure you're in the server directory
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server is running on port 5000
📍 API URL: http://localhost:5000
```

### Step 3: Start the Frontend (New Terminal)

Open a **new terminal window** and run:

```bash
# Navigate to client directory
cd client
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to:
```
http://localhost:3000
```

---

## Testing the Application

### Test Backend API Endpoints

#### 1. Get All Products
```bash
curl http://localhost:5000/api/products
```

Or visit in browser: `http://localhost:5000/api/products`

#### 2. Get Single Product
```bash
curl http://localhost:5000/api/products/PRODUCT_ID
```

#### 3. Test Cart Functionality

You can use Postman or cURL:

**Add to Cart:**
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "guest_user",
    "productId": "PRODUCT_ID",
    "quantity": 1,
    "price": 1000
  }'
```

**Get Cart:**
```bash
curl http://localhost:5000/api/cart/guest_user
```

### Test Frontend Features

1. **Homepage:**
   - Browse all products
   - Filter by category
   - View product ratings

2. **Product Detail Page:**
   - Click on any product
   - View full details
   - Adjust quantity
   - Add to cart

3. **Shopping Cart:**
   - Click on "Cart" in navbar
   - View cart items
   - Update quantities
   - Remove items
   - View total price

---

## Common Issues

### Issue 1: MongoDB Connection Failed

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
- Check if your MongoDB Atlas cluster is running
- Verify your connection string in `.env` file
- Ensure you replaced `<password>` with your actual password
- Check if your IP address is whitelisted in Network Access
- Make sure there are no typos in the connection string

### Issue 2: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**

**Windows:**
```bash
# Find the process using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
```

**Or change the port:**
Edit `server/.env` and change `PORT=5000` to `PORT=5001`

### Issue 3: Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Delete node_modules and reinstall
cd server
rm -rf node_modules package-lock.json
npm install

# For client
cd ../client
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: React Not Loading

**Error:** Blank page or errors in browser console

**Solutions:**
- Check browser console for errors (F12)
- Ensure backend is running on port 5000
- Clear browser cache
- Try different browser
- Restart the React development server

### Issue 5: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Verify `cors` is installed in backend: `npm install cors`
- Check if `app.use(cors())` is present in `server.js`
- Restart the backend server

---

## Project Scripts

### Backend Scripts

```bash
cd server

# Start server (production)
npm start

# Start server with auto-reload (development)
npm run dev

# Seed database with sample products
npm run seed
```

### Frontend Scripts

```bash
cd client

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## Next Steps

Once you have the application running:

1. **Explore the codebase** to understand the structure
2. **Customize** the products, colors, and styling
3. **Add features** like user authentication, payment integration
4. **Deploy** to production (Vercel for frontend, Heroku for backend)

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

## Support

If you encounter any issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/Krishnakanth303/E-commerce-website/issues)
2. Review the error messages carefully
3. Search for the error on Stack Overflow
4. Create a new issue on GitHub with detailed information

---

**Happy Coding! 🚀**

Built with ❤️ by Krishna Kanth Urs K M