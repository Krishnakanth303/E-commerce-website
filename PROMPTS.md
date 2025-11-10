# Prompts Used for Project Development

This document contains all the AI prompts used to generate the technical documentation and code base for this E-Commerce Website project.

## 1. Architecture Documentation Prompts

### Prompt 1.1: System Architecture
```
Create a comprehensive technical architecture document for a MERN stack e-commerce website. 
Include system overview, technology stack details, data flow diagrams, and component structure.
```

### Prompt 1.2: Database Schema Design
```
Design MongoDB database schemas for an e-commerce application with collections for:
- Products (name, description, price, category, image, stock, ratings)
- Shopping cart (user reference, items array, total price)
- Users (name, email, password)
Include relationships and indexes.
```

### Prompt 1.3: API Documentation
```
Document RESTful API endpoints for an e-commerce platform including:
- Product endpoints (CRUD operations)
- Cart management endpoints (add, remove, get)
- User authentication endpoints
Specify HTTP methods, request/response formats, and status codes.
```

### Prompt 1.4: Security Architecture
```
Outline security considerations and best practices for a MERN stack e-commerce application,
including authentication, data validation, CORS configuration, and environment variable management.
```

## 2. Backend Code Generation Prompts

### Prompt 2.1: Express Server Setup
```
Create an Express.js server configuration with:
- MongoDB connection using Mongoose
- CORS middleware
- JSON body parser
- Route imports for products, cart, and users
- Environment variable configuration using dotenv
- Error handling middleware
```

### Prompt 2.2: Mongoose Product Model
```
Generate a Mongoose schema and model for Product with fields:
- name (String, required)
- description (String, required)
- price (Number, required)
- category (String, required)
- image (String, required)
- stock (Number, default 0)
- ratings (Number, default 0)
- numReviews (Number, default 0)
Include timestamps and export the model.
```

### Prompt 2.3: Mongoose Cart Model
```
Create a Mongoose schema for Shopping Cart with:
- userId reference to User model
- items array containing productId reference, quantity, and price
- totalPrice field
- timestamps
Implement methods to calculate total price.
```

### Prompt 2.4: Product Routes
```
Implement Express routes for product management:
- GET /api/products - retrieve all products
- GET /api/products/:id - retrieve single product by ID
- POST /api/products - create new product
Include async/await, error handling, and appropriate HTTP status codes.
```

### Prompt 2.5: Cart Routes
```
Create Express routes for shopping cart operations:
- POST /api/cart/add - add item to cart (check if item exists, update quantity)
- GET /api/cart/:userId - get user's cart with populated product details
- DELETE /api/cart/:userId/:productId - remove item from cart
- Update total price after each operation
```

### Prompt 2.6: Database Seeding Script
```
Write a Node.js script to seed MongoDB with sample product data including:
- Electronics category items
- Clothing items
- Home & Garden items
Include at least 10 diverse products with realistic data.
```

## 3. Frontend Code Generation Prompts

### Prompt 3.1: React App Setup with Router
```
Create a React App.js component with React Router v6 configuration:
- BrowserRouter setup
- Routes for Home, Product Detail, and Cart pages
- Include a Navbar component
- Use modern React Router syntax with Routes and Route components
```

### Prompt 3.2: Navbar Component
```
Build a responsive Navbar component using Tailwind CSS with:
- Brand logo/name
- Navigation links (Home, Cart)
- Shopping cart icon with item count badge
- Mobile-friendly hamburger menu
```

### Prompt 3.3: Product Card Component
```
Create a ProductCard component for displaying product information:
- Product image
- Product name and truncated description
- Price display
- "View Details" button linking to product detail page
- Styled with Tailwind CSS with hover effects
- Shadow and rounded corners
```

### Prompt 3.4: Home Page Component
```
Implement HomePage component that:
- Fetches all products from API using axios and useEffect
- Displays loading state
- Renders products in responsive grid (1 column mobile, 3-4 columns desktop)
- Uses ProductCard component for each product
- Handles errors gracefully
```

### Prompt 3.5: Product Detail Page
```
Create ProductDetailPage component with:
- useParams to get product ID from URL
- Fetch single product data from API
- Display large product image
- Show full product description
- Quantity selector input
- "Add to Cart" button with onClick handler
- Two-column layout (image | details)
- API call to add item to cart
```

### Prompt 3.6: Cart Page Component
```
Build CartPage component that:
- Fetches user's cart from API
- Displays each cart item with product details
- Shows quantity and individual prices
- "Remove" button for each item
- Calculates and displays total price
- Handles empty cart state
- Updates cart after removing items
```

### Prompt 3.7: Tailwind CSS Configuration
```
Set up Tailwind CSS in React project:
- Install dependencies (tailwindcss, postcss, autoprefixer)
- Initialize tailwind.config.js
- Configure content paths for purging
- Add Tailwind directives to index.css
- Set up custom theme colors if needed
```

## 4. Styling and UI Prompts

### Prompt 4.1: Responsive Grid Layout
```
Create Tailwind CSS classes for responsive product grid:
- 1 column on mobile
- 2 columns on tablet
- 3-4 columns on desktop
- Gap spacing between items
- Container with padding
```

### Prompt 4.2: Product Card Styling
```
Style ProductCard with Tailwind CSS:
- Rounded borders
- Shadow on normal state, larger shadow on hover
- Image covering full width with fixed height
- Padding for content area
- Flexbox for price and button alignment
```

### Prompt 4.3: Button Styles
```
Create consistent button styling with Tailwind:
- Primary button (blue background, white text)
- Secondary button (gray background)
- Danger button (red background for remove actions)
- Hover effects with darker shades
- Padding and rounded corners
```

## 5. Integration and Testing Prompts

### Prompt 5.1: API Integration with Axios
```
Set up axios for API calls in React:
- Create axios instance with base URL
- Implement GET request for fetching products
- Implement POST request for adding to cart
- Implement DELETE request for removing from cart
- Handle async operations with try-catch
- Display errors to user
```

### Prompt 5.2: Environment Configuration
```
Create .env.example files for both frontend and backend:
- Backend: MONGO_URI, PORT, NODE_ENV
- Frontend: REACT_APP_API_URL
- Add instructions for setup
```

### Prompt 5.3: Test Data Generation
```
Generate realistic sample product data for e-commerce site:
- Various categories (Electronics, Clothing, Home)
- Price range from ₹500 to ₹75000
- Detailed descriptions
- Stock quantities
- Product images (placeholder URLs)
```

## 6. Documentation Prompts

### Prompt 6.1: README Creation
```
Write a comprehensive README.md for MERN e-commerce project including:
- Project description and features
- Technology stack
- Installation instructions (backend and frontend)
- Environment variables setup
- API endpoints documentation
- Project structure
- Future enhancements
- Author information
```

### Prompt 6.2: Architecture Documentation
```
Create detailed ARCHITECTURE.md covering:
- System architecture diagram
- Technology stack breakdown
- Data models and schemas
- API endpoints specification
- Frontend component structure
- Backend folder structure
- Security considerations
- Performance optimizations
- Deployment strategy
- Scalability considerations
```

### Prompt 6.3: API Documentation
```
Document all REST API endpoints with:
- HTTP method
- Endpoint path
- Request body format
- Response format
- Status codes
- Error responses
- Example requests and responses
```

## 7. Git and Version Control Prompts

### Prompt 7.1: .gitignore Configuration
```
Create comprehensive .gitignore file for MERN stack project:
- node_modules directories
- Environment variable files (.env)
- Build directories
- IDE specific files
- OS specific files
- Log files
```

### Prompt 7.2: Commit Message Structure
```
Generate meaningful Git commit messages following conventions:
- feat: for new features
- fix: for bug fixes
- docs: for documentation
- style: for formatting
- refactor: for code refactoring
- test: for testing
- chore: for maintenance
```

## 8. Deployment Prompts

### Prompt 8.1: Deployment Documentation
```
Create deployment guide for:
- Frontend deployment on Vercel
- Backend deployment on Heroku
- MongoDB Atlas setup
- Environment variables configuration
- Domain setup and CORS configuration
```

### Prompt 8.2: Build Scripts
```
Add npm scripts to package.json:
- dev: development mode with nodemon
- start: production mode
- build: create production build
- test: run tests
```

## 9. Error Handling and Validation Prompts

### Prompt 9.1: Backend Error Handling
```
Implement centralized error handling middleware:
- Catch async errors
- Format error responses
- Different handling for development vs production
- Log errors appropriately
```

### Prompt 9.2: Input Validation
```
Add input validation for API endpoints:
- Validate product data before creating
- Validate cart operations
- Sanitize user inputs
- Return appropriate error messages
```

## 10. Optimization Prompts

### Prompt 10.1: Performance Optimization
```
Suggest performance optimizations for MERN e-commerce app:
- Database query optimization
- React component memoization
- Image lazy loading
- Code splitting
- Caching strategies
```

### Prompt 10.2: SEO Optimization
```
Implement SEO best practices:
- Meta tags for each page
- Semantic HTML structure
- Alt tags for images
- sitemap.xml generation
- robots.txt configuration
```

---

## Prompt Engineering Best Practices Used

1. **Specificity**: Each prompt clearly defines the requirements and expected output
2. **Context**: Prompts include technology stack and framework versions
3. **Structure**: Requests include specific fields, methods, and implementations
4. **Standards**: Prompts reference best practices and coding conventions
5. **Completeness**: Prompts ask for error handling, validation, and edge cases
6. **Modularity**: Breaking down complex features into smaller, manageable prompts

## Notes

- All prompts were designed to generate production-ready code
- Prompts follow MERN stack best practices
- Security and performance considerations included in prompts
- Documentation prompts ensure comprehensive project documentation
- Prompts structured for iterative development approach

---

**Document Version**: 1.0  
**Last Updated**: November 10, 2025  
**Author**: Krishna Kanth Urs K M