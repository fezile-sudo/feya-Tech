FeyaTech — Ecommerce Web Application

FeyaTech is a full-stack ecommerce web application built as a portfolio project. The application allows users to browse products, view individual product details, add products to a wishlist or shopping cart, manage cart quantities, and proceed through the checkout flow.

The project was built with a focus on creating a practical ecommerce experience while demonstrating frontend development, backend API integration, database management, state management, and responsive UI development.

Features
Product Browsing

View available products on the home page.

Display product information including name, price, category, stock, description, and image.

Open an individual product to view its details.

Product information is retrieved from the backend rather than being hardcoded in the frontend.

Product Details

Each product has a dedicated details page where users can:

View the product image and information.

See the current price and stock availability.

Adjust the quantity before adding an item to the cart.

Add products directly to the shopping cart.

Continue shopping or navigate to the cart after adding a product.

Shopping Cart

The shopping cart allows users to:

View all selected products.

Increase or decrease product quantities.

Remove products from the cart.

View individual product subtotals.

View the cart subtotal.

Calculate VAT at 15%.

View the final order total.

Continue to the checkout page.

Wishlist

Users can add products to their wishlist and:

View saved products.

Remove products from the wishlist.

Move wishlist products to the shopping cart.

Checkout

The application includes a checkout flow where users can proceed from their cart toward completing an order.

Product Images

Product image filenames are stored in the PostgreSQL database and matched with the corresponding images used by the React application.

This keeps product information in the database while allowing the frontend to display the appropriate product image.

Technology Stack
Frontend

React

React Router

Reactstrap

Bootstrap

JavaScript

CSS

Backend

Node.js

Express.js

REST API

Database

PostgreSQL

Development Tools

Visual Studio Code

Git

GitHub

npm

Application Architecture

The application follows a frontend/backend/database structure:

React Frontend
      │
      │ HTTP Requests
      ▼
Node.js / Express API
      │
      │ SQL Queries
      ▼
PostgreSQL Database


The React frontend communicates with the Express backend through API endpoints. The backend handles communication with PostgreSQL and returns product and application data to the frontend.

This separation keeps the frontend responsible for the user interface and application state while the backend handles API requests and database operations.

Database

PostgreSQL is used to store the application's product data and other ecommerce-related information.

Product records include information such as:

Product ID

Product title

Price

Description

Category

Stock

Image filename

The image_url field stores the filename associated with each product.

For example:

Apple Magic keyboard.webp
Lenovo USB-C.webp
Logitech Brio.webp


The corresponding images are stored in the application's image directory.

This allows the product data and product images to remain connected through the database record.

State Management

React Context is used to manage application-wide ecommerce state.

Cart Context

The Cart Context handles:

Adding products to the cart

Removing products

Increasing quantities

Decreasing quantities

Calculating the cart total

Wishlist Context

The Wishlist Context handles:

Adding products to the wishlist

Removing products

Checking whether a product is already in the wishlist

Using React Context allows this information to be accessed by different parts of the application without having to pass the same data through multiple levels of components.

Project Structure

A simplified version of the project structure is:

feyatech/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   └── products/
│   │
│   ├── context/
│   │   ├── CartContext
│   │   └── WishlistContext
│   │
│   ├── pages/
│   │   ├── ProductDetails
│   │   ├── Wishlist
│   │   ├── Cart
│   │   └── Checkout
│   │
│   └── App.js
│
├── package.json
└── README.md

Getting Started
Prerequisites

Before running the project, make sure you have installed:

Node.js

npm

PostgreSQL

Installation

Clone the repository and navigate into the project directory:

git clone <your-repository-url>
cd feyatech


Install the frontend dependencies:

npm install


Install the backend dependencies if the backend is located in a separate directory:

npm install

Environment Variables

Create a .env file for the backend database configuration.

Example:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=postgres
DB_PASSWORD=your_password


Do not commit your actual database password or other private credentials to GitHub.

Running the Application

Start the backend server and React development server using the project's configured commands.

The application will then be available through the local development server.

Key Development Challenges

One of the challenges during development was handling product images while keeping product information database-driven.

The application initially experimented with different approaches to loading images. The final implementation uses the project's Webpack-compatible image imports and maps the filenames stored in the database to the corresponding product images.

Another important part of the project was managing shared cart and wishlist state across different pages. React Context was used so that changes made on one page are reflected throughout the application.

The project also required troubleshooting the interaction between the React frontend, backend API, and PostgreSQL database to ensure that product information displayed consistently throughout the application.

Future Improvements

The current version focuses on the core ecommerce experience. Possible future improvements include:

User authentication and account management

Product reviews and star ratings

Order history

Admin dashboard for managing products

Product search and filtering

Payment gateway integration

Order confirmation emails

Improved product image management

Persistent cart and wishlist data for authenticated users

The database structure already provides a foundation for extending the application with additional ecommerce functionality such as product reviews.

What I Learned

Building FeyaTech provided practical experience with:

Building reusable React components

React Router and multi-page application navigation

Managing shared state with React Context

Connecting a React frontend to a REST API

Working with Node.js and Express

Creating and querying PostgreSQL databases

Handling database-driven product information

Managing product images

Implementing shopping cart functionality

Implementing wishlist functionality

Calculating order totals and VAT

Debugging frontend and backend integration issues

Using Git and GitHub throughout development

Project Status

Completed — Portfolio Project

The current version contains the core ecommerce functionality required for the project. Additional features are documented under Future Improvements rather than being included in the current scope.

Author

Fezile Gulwa

This project was developed as part of my software development portfolio to demonstrate full-stack web development skills using React, Node.js, Express, and PostgreSQL.
