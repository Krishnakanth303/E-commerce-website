# E-Commerce Website

A full-stack e-commerce application built with MERN stack (MongoDB, Express.js, React.js, Node.js) as part of a technical assignment.

## 🚀 Features

- **Product Browsing**: View all products in a responsive grid layout
- **Product Details**: Detailed product information with images and descriptions
- **Shopping Cart**: Add/remove items with automatic price calculation
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **RESTful API**: Clean backend architecture with Express.js
- **Cloud Database**: MongoDB Atlas integration

## 🛠️ Tech Stack

### Frontend
- **React.js**: Component-based UI library
- **React Router**: Client-side navigation
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database

## 📁 Project Structure

```
E-commerce-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── ProductCard.js
│   │   ├── pages/         # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   └── CartPage.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   ├── models/           # Mongoose schemas
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── User.js
│   ├── routes/           # API routes
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── userRoutes.js
│   ├── config/
│   ├── server.js         # Express server
│   ├── seed.js           # Sample data
│   ├── .env.example
│   └── package.json
├── ARCHITECTURE.md       # Technical documentation
├── PROMPTS.md           # AI prompts used
└── README.md            # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krishnakanth303/E-commerce-website.git
   cd E-commerce-website
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your MongoDB Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   PORT=5000
   ```

4. **Seed sample data** (optional)
   ```bash
   node seed.js
   ```

5. **Start backend server**
   ```bash
   npm start
   ```

6. **Frontend Setup** (in new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create new product |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/cart/:userId` | Get user's cart |
| DELETE | `/api/cart/:userId/:productId` | Remove item from cart |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | User login |

## 🎯 Assignment Deliverables

This project fulfills all requirements:

1. ✅ **Technical Architecture Documentation** - See [ARCHITECTURE.md](./ARCHITECTURE.md)
2. ✅ **Complete Code Base** - Frontend and backend implementation
3. ✅ **Prompts Documentation** - See [PROMPTS.md](./PROMPTS.md)

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
```

## 🧪 Testing

### Test Backend API
```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/:id
```

### Test Frontend
1. Start the development server: `npm start`
2. Navigate through different pages
3. Test add to cart functionality
4. Test cart operations (add/remove)

## 🚀 Future Enhancements

- [ ] User authentication with JWT
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Order management system
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Search and filter functionality
- [ ] Wishlist feature
- [ ] Order tracking
- [ ] Email notifications

## 📝 Development Process

This project was developed following industry best practices:
- Component-based architecture
- RESTful API design
- Responsive design principles
- Clean code structure
- Comprehensive documentation

## 👤 Author

**Krishna Kanth Urs K M**
- GitHub: [@Krishnakanth303](https://github.com/Krishnakanth303)
- Location: Bengaluru
- Institution: CMR Institute of Technology (2026)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Assignment provided by Diligent Corporation
- Built as part of technical assessment
- Thanks to the MERN stack community

---

**Note**: This is a learning project created for educational purposes and technical assessment. For production use, additional security measures and optimizations would be required.