# FeyaTech — Full-Stack Ecommerce Application

FeyaTech is a full-stack ecommerce web application developed as a software development portfolio project.

The application allows users to browse products, view product details, manage a shopping cart and wishlist, register and log in, and proceed through the checkout process.

The project demonstrates frontend development, REST API integration, PostgreSQL database management, authentication, state management, responsive UI development, and deployment.

## Live Application

Frontend:

https://feya-tech.onrender.com

Backend API:

https://feyatech-api.onrender.com

Health check:

https://feyatech-api.onrender.com/api/health

## Features

### Product Browsing

- Browse products retrieved from the backend API.
- View product names, descriptions, prices, categories, stock levels, and images.
- Open individual product detail pages.
- Product information is stored in PostgreSQL rather than hardcoded in the frontend.

### Product Details

Users can:

- View product information and images.
- See current price and stock availability.
- Select a quantity.
- Add products to the shopping cart.
- Continue shopping or navigate to the cart.

### Shopping Cart

The shopping cart supports:

- Adding products.
- Increasing and decreasing quantities.
- Removing products.
- Viewing product subtotals.
- Calculating the cart subtotal.
- Calculating VAT at 15%.
- Displaying the final order total.
- Proceeding to checkout.

### Wishlist

Users can:

- Add products to a wishlist.
- View saved products.
- Remove products from the wishlist.
- Move wishlist products to the shopping cart.

### User Authentication

The application includes:

- User registration.
- User login.
- Password hashing.
- JWT-based authentication.
- Protected backend functionality.

### Checkout and Orders

The checkout flow collects customer and delivery information and allows users to proceed with placing an order.

Orders are stored in PostgreSQL together with their associated order items.

### Product Images

Product image filenames are stored in the database and mapped to the corresponding images used by the React application.

This keeps the product information database-driven while allowing the frontend to display the correct product image.

## Technology Stack

### Frontend

- React
- React Router
- Reactstrap
- Bootstrap
- JavaScript
- CSS
- React Context

### Backend

- Node.js
- Express.js
- REST API
- JSON Web Tokens
- bcrypt
- CORS

### Database

- PostgreSQL
- Neon PostgreSQL

### Development and Deployment

- Visual Studio Code
- Git
- GitHub
- npm
- Render

## Application Architecture

The application follows a frontend, backend, and database architecture:

text
React Frontend
      |
      | HTTP Requests
      v
Node.js / Express API
      |
      | SQL Queries
      v
PostgreSQL / Neon Database

The React frontend communicates with the Express backend through REST API endpoints.

The backend handles authentication, product requests, order processing, and communication with PostgreSQL.

The database stores users, products, categories, carts, wishlists, reviews, orders, and order items.

Database
PostgreSQL is used to store the application's ecommerce data.

The database contains tables for:

Users

Categories

Products

Cart items

Wishlist items

Reviews

Orders

Order items

Products
Product records include:

Product ID

Product title

Description

Price

Stock

Category

Image filename

Creation date

The image_url field stores the filename associated with each product.

Example: Apple Magic keyboard.webp
JBL T720.webp
Keychron G3.webp
B39 Bluetooth.webp

State Management
React Context is used for application-wide ecommerce state.

Cart Context
The Cart Context handles:

Adding products.

Removing products.

Increasing quantities.

Decreasing quantities.

Calculating cart totals.

Wishlist Context
The Wishlist Context handles:

Adding products.

Removing products.

Checking whether a product is already in the wishlist.

Moving wishlist products to the cart.

Using React Context allows shared ecommerce state to be accessed across different parts of the application without passing the same data through multiple levels of components.

Project Structure
A simplified project structure is:
feyatech/
|
├── backend/
│   ├── database/
│   │   └── schema.sql
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── .gitignore
│   └── package.json
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── config/
│   │   └── api.js
│   └── App.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md

Getting Started
Prerequisites
Install the following:

Node.js

npm

PostgreSQL, or access to a PostgreSQL-compatible database such as Neon

Clone the Repository
git clone https://github.com/fezile-sudo/feya-Tech.git
cd feya-Tech

Install Frontend Dependencies
From the project root:npm install

Install Backend Dependencies
cd backend
npm install

Environment Variables
The backend requires environment variables for database access and authentication.

Create:backend/.env
Example: DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
PORT=5000

The frontend uses:REACT_APP_API_URL=http://localhost:5000/api

For production, the frontend API URL should point to the deployed backend API.

Do not commit .env files or private credentials to GitHub.

A template is provided in: .env.example

Running Locally
Start the Backend
From the backend directory: npm start

The backend runs on: http://localhost:5000

Start the Frontend
From the project root: npm start

The React development server normally runs on: http://localhost:3000

API
The backend exposes REST API endpoints for the application's main functionality.

Examples include: GET /api/health
GET /api/products
POST /api/auth/register
POST /api/auth/login

The API health endpoint can be used to verify that the backend and database are connected successfully.

Deployment
The application is deployed using Render.

The production architecture consists of:

 Render Static Site
        |
        | HTTPS API Requests
        v
Render Web Service
        |
        | PostgreSQL Connection
        v
Neon PostgreSQL

The frontend is deployed as a Render Static Site.

The Express backend is deployed as a Render Web Service.

The PostgreSQL database is hosted using Neon.

Production environment variables are configured through the Render dashboard rather than committed to the repository.

Security
Environment files containing passwords, database credentials, and JWT secrets are excluded from Git using .gitignore.

The backend also uses:

Password hashing with bcrypt.

JWT authentication.

CORS configuration.

Environment variables for sensitive configuration.

The production frontend is configured as the allowed CORS origin for the API.

Key Development Challenges
One of the challenges during development was handling product images while keeping product information database-driven.

The application initially experimented with different approaches to loading images. The final implementation maps image filenames stored in PostgreSQL to the corresponding images used by the React application.

Another important part of the project was managing shared cart and wishlist state across multiple pages. React Context was used so that changes made on one page are reflected throughout the application.

The project also required troubleshooting the interaction between the React frontend, Express backend, and PostgreSQL database.

During deployment, the local PostgreSQL database was migrated to Neon PostgreSQL and the backend was configured to connect securely to the production database.

What I Learned
Building FeyaTech provided practical experience with:

Building reusable React components.

React Router and multi-page navigation.

Managing shared state with React Context.

Connecting a React frontend to a REST API.

Building APIs with Node.js and Express.

Creating and querying PostgreSQL databases.

Migrating database data to a hosted PostgreSQL service.

Implementing user authentication.

Using JWT authentication.

Hashing passwords securely.

Handling database-driven product information.

Managing product images.

Implementing shopping cart functionality.

Implementing wishlist functionality.

Calculating order totals and VAT.

Debugging frontend and backend integration issues.

Using Git and GitHub.

Deploying a full-stack application using Render and Neon.

Future Improvements
Possible future improvements include:

Product reviews and star ratings.

Order history.

Admin dashboard for managing products.

Product search and filtering.

Payment gateway integration.

Order confirmation emails.

Improved product image management.

Persistent cart and wishlist data for authenticated users.

Additional account management features.

The existing database structure provides a foundation for extending the application with additional ecommerce functionality such as reviews, order history, and administrative features.

Project Status
Completed — Portfolio Project

The current version contains the core ecommerce functionality required for the project.

The application is deployed and connected to a production PostgreSQL database.

Additional features are documented under Future Improvements rather than being included in the current scope.

Author
Fezile Gulwa

This project was developed as part of my software development portfolio to demonstrate full-stack web development skills.
