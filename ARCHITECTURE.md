# E-Commerce Website - Technical Architecture Documentation

## 1. System Overview

This is a full-stack e-commerce application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application allows users to browse products, view detailed product information, and manage a shopping cart with a clean, responsive user interface.

## 2. Architecture Diagram

```
┌────────────────────┐
│   Client Browser   │
│   (React.js)       │
└─────────┬──────────┘
         │
         │ HTTP/HTTPS (REST API)
         │
┌─────────┴──────────┐
│   Backend Server   │
│   (Node.js +       │
│    Express.js)     │
└─────────┬──────────┘
         │
         │ Mongoose ODM
         │
┌─────────┴──────────┐
│   Database         │
│   (MongoDB Atlas)  │
└────────────────────┘
```

## 3. Technology Stack

### 3.1 Frontend Technologies

| Technology | Purpose | Version |
|------------|---------|----------|
| **React.js** | UI component library for building interactive interfaces | 18.x |
| **React Router** | Client-side routing and navigation | 6.x |
| **Axios** | Promise-based HTTP client for API calls | 1.x |
| **Tailwind CSS** | Utility-first CSS framework for styling | 3.x |

### 3.2 Backend Technologies

| Technology | Purpose | Version |
|------------|---------|----------|
| **Node.js** | JavaScript runtime environment | 16.x+ |
| **Express.js** | Web application framework | 4.x |
| **Mongoose** | MongoDB object data modeling (ODM) | 7.x |
| **CORS** | Enable cross-origin resource sharing | 2.x |
| **dotenv** | Environment variable management | 16.x |

### 3.3 Database

| Technology | Purpose |
|------------|----------|
| **MongoDB Atlas** | Cloud-hosted NoSQL database |

## 4. Data Models

### 4.1 Product Schema

```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required),
  image: String (required),
  stock: Number (default: 0),
  ratings: Number (default: 0),
  numReviews: Number (default: 0),
  timestamps: true
}
```

**Indexes:** 
- Primary: `_id` (auto-generated)
- Secondary: `category`, `price`

### 4.2 Cart Schema

```javascript
{
  userId: ObjectId (ref: 'User'),
  items: [
    {
      productId: ObjectId (ref: 'Product'),
      quantity: Number (default: 1),
      price: Number (required)
    }
  ],
  totalPrice: Number (default: 0),
  timestamps: true
}
```

**Indexes:**
- Primary: `_id`
- Secondary: `userId`

### 4.3 User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  timestamps: true
}
```

**Indexes:**
- Primary: `_id`
- Unique: `email`

## 5. API Endpoints

### 5.1 Products API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/products` | Get all products | None | Array of products |
| GET | `/api/products/:id` | Get single product | None | Product object |
| POST | `/api/products` | Create new product | Product data | Created product |

### 5.2 Cart API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/cart/add` | Add item to cart | `{userId, productId, quantity, price}` | Updated cart |
| GET | `/api/cart/:userId` | Get user's cart | None | Cart object |
| DELETE | `/api/cart/:userId/:productId` | Remove item | None | Updated cart |

### 5.3 Users API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/users/register` | Register user | `{name, email, password}` | User object + token |
| POST | `/api/users/login` | Login user | `{email, password}` | User object + token |

## 6. Frontend Architecture

### 6.1 Component Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation bar component
│   └── ProductCard.js     # Product display card
├── pages/
│   ├── HomePage.js        # Product listing page
│   ├── ProductDetailPage.js  # Single product view
│   └── CartPage.js        # Shopping cart page
├── App.js                # Main application component
└── index.js              # Application entry point
```

### 6.2 State Management

- **Local State**: Using React's `useState` hook for component-level state
- **Side Effects**: Using `useEffect` hook for data fetching and lifecycle methods
- **Future Enhancement**: Consider Redux or Context API for global state management

### 6.3 Routing Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Display all products |
| `/product/:id` | ProductDetailPage | Show product details |
| `/cart` | CartPage | Shopping cart management |

## 7. Backend Architecture

### 7.1 Server Structure

```
server/
├── models/              # Data models
│   ├── Product.js
│   ├── Cart.js
│   └── User.js
├── routes/              # API routes
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── userRoutes.js
├── middleware/          # Custom middleware
├── config/              # Configuration files
├── server.js            # Express server setup
└── seed.js              # Database seeding
```

### 7.2 Middleware Stack

1. **express.json()**: Parse JSON request bodies
2. **express.urlencoded()**: Parse URL-encoded data
3. **cors()**: Enable cross-origin requests
4. **Custom error handler** (future enhancement)

## 8. Database Design

### 8.1 Collection Relationships

```
User (1) ───> (1) Cart
            │
            └─> (N) CartItems ───> (1) Product
```

### 8.2 Data Flow

1. **Product Browsing**: Client → GET /api/products → MongoDB
2. **Add to Cart**: Client → POST /api/cart/add → Update Cart in MongoDB
3. **View Cart**: Client → GET /api/cart/:userId → Populate product details

## 9. Security Considerations

### 9.1 Current Implementation
- Environment variables for sensitive configuration
- CORS configuration for API access control
- MongoDB connection string security

### 9.2 Future Enhancements
- JWT authentication for secure user sessions
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting for API endpoints
- HTTPS enforcement
- SQL injection prevention (using Mongoose ODM)
- XSS protection

## 10. Performance Optimization

### 10.1 Current Optimizations
- React component lazy loading
- Mongoose connection pooling
- Lightweight backend with Express.js

### 10.2 Future Optimizations
- Image optimization and CDN integration
- Redis caching for frequently accessed data
- Database query optimization with indexes
- Code splitting and bundle optimization
- Server-side rendering (SSR) or static generation

## 11. Deployment Strategy

### 11.1 Frontend Deployment
**Recommended Platforms:**
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront

**Build Process:**
```bash
cd client
npm run build
# Deploy build/ directory
```

### 11.2 Backend Deployment
**Recommended Platforms:**
- Heroku
- Railway
- AWS EC2/ECS
- DigitalOcean

**Environment Variables Required:**
- `MONGO_URI`
- `PORT`
- `NODE_ENV`

### 11.3 Database
- MongoDB Atlas (already cloud-hosted)
- No additional deployment needed

## 12. Development Workflow

### 12.1 Local Development
1. Start MongoDB Atlas connection
2. Start backend server: `cd server && npm start`
3. Start frontend dev server: `cd client && npm start`
4. Access at http://localhost:3000

### 12.2 Version Control
- Git for source control
- GitHub for remote repository
- Feature branch workflow recommended

## 13. Testing Strategy

### 13.1 Current Testing
- Manual API testing with Postman/cURL
- Browser-based UI testing

### 13.2 Future Testing Enhancements
- Unit tests with Jest
- Integration tests for API endpoints
- End-to-end tests with Cypress
- Component tests with React Testing Library

## 14. Scalability Considerations

### 14.1 Horizontal Scaling
- Stateless backend enables multiple server instances
- Load balancer distribution
- Database clustering with MongoDB Atlas

### 14.2 Vertical Scaling
- Upgrade server resources
- Database tier upgrades in MongoDB Atlas

## 15. Monitoring and Logging

### 15.1 Future Implementation
- Application Performance Monitoring (APM)
- Error tracking with Sentry
- Log aggregation with Winston
- Database query monitoring

## 16. Future Feature Roadmap

1. **User Authentication**: JWT-based auth system
2. **Payment Integration**: Razorpay or Stripe
3. **Order Management**: Track and manage orders
4. **Admin Dashboard**: Product and user management
5. **Search & Filter**: Advanced product search
6. **Reviews & Ratings**: User product reviews
7. **Wishlist**: Save products for later
8. **Email Notifications**: Order confirmations
9. **Analytics Dashboard**: Sales and user metrics
10. **Mobile App**: React Native implementation

## 17. Compliance and Standards

- RESTful API design principles
- Semantic HTML5
- Responsive design standards
- WCAG accessibility guidelines (future)
- GDPR compliance (future)

## 18. Documentation

- README.md: Project overview and setup
- ARCHITECTURE.md: This file
- PROMPTS.md: AI assistance documentation
- API documentation (future: Swagger/OpenAPI)

---

**Document Version**: 1.0  
**Last Updated**: November 10, 2025  
**Author**: Krishna Kanth Urs K M