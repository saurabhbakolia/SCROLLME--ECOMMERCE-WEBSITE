# ScrollMe Ecommerce Website

ScrollMe is an open-source, feature-rich eCommerce platform that provides a modern shopping experience. Built with **JavaScript**, **React**, **Styled Components**, **Node.js (Express.js)**, and **MongoDB**, ScrollMe offers a robust front-end with a highly scalable backend. This project is ideal for those looking to contribute to an eCommerce solution or understand the integration of modern web technologies.

## Table of Contents

- [ScrollMe Ecommerce Website](#scrollme-ecommerce-website)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Additional Tools](#additional-tools)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
    - [Guidelines](#guidelines)
  - [Code of Conduct](#code-of-conduct)
  - [License](#license)
  - [Community Discussion](#community-discussion)

## Features

- [ ] **Modern UI/UX**: Intuitive, responsive design for a seamless shopping experience.
- [ ] **Product Management**: Admin interface for adding, updating, and removing products.
- [x] **User Authentication**: Secure user registration, login, and JWT-based authentication.
- [ ] **Search and Filters**: Search for products and apply filters based on categories, prices, and more.
- [x] **Shopping Cart**: Add, update, or remove items from the cart, with real-time calculations.
- [ ] **Checkout Process**: Easy and secure checkout experience.
- [ ] **Order History**: View past orders and order details.
- [ ] **Product Reviews and Ratings**: Users can review and rate products.
- [x] **Wishlist**: Save favorite items for later purchase.
- [x] **Wishlist**: Save favourite items for later purchase.
- [ ] **Payment Gateway Integration**: Add integration with payment providers like Stripe or PayPal.
- [x] **Responsive Design**: Optimized for all devices (mobile, tablet, and desktop).
- [x] **MongoDB Integration**: Backend management of products, users, and orders with MongoDB.
- [ ] **Email Notifications**: Send order confirmations and updates via email.
- [ ] **Inventory Management**: Track stock levels and manage out-of-stock notifications.
- [ ] **Discounts and Promotions**: Ability to add coupon codes and discounts.
- [ ] **Multi-language Support**: Internationalization for a global audience.
- [ ] **Admin Dashboard Analytics**: Insights into sales, customers, and product performance.

## Tech Stack

ScrollMe is built using the following technologies:

### Frontend
- **JavaScript (ES6+)**: Core language for building dynamic features.
- **React.js**: A JavaScript library for building user interfaces.
- **Styled Components**: A CSS-in-JS tool for modular and customizable component styling.
- **Redux**: State management library for maintaining global app state and ensuring predictable data flow across components.

### Backend
- **Node.js**: Runtime environment for executing server-side JavaScript.
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for managing products, users, and orders.
- **Mongoose**: ODM library to interact with MongoDB.

### Additional Tools
- **JWT**: For secure user authentication.
- **Axios**: HTTP client for API communication.
- **Nodemon**: Automatically restarts the server during development.
- **Biome**: Code formatter and linter to maintain consistent code style and detect potential errors.
  
## Installation

To get started with ScrollMe locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:saurabhbakolia/SCROLLME--ECOMMERCE-WEBSITE.git
   cd SCROLLME--ECOMMERCE-WEBSITE
   ```
2. **Install dependencies for both frontend and backend**:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd ./backend
   npm install
   ```
3. **Set up environment variables**:  
   In the `backend` directory, we have a `.env.example` file. You can create your own `.env` file by copying this file and adding the necessary environment variables:
   
   ```bash
   cp backend/.env.example backend/.env
   ```
4. **Start the development server**:
   ```bash
   # Start the backend
   cd backend
   npm run start

   # Start the frontend
   npm start
   ```

5. **Visit the app in your browser**:  
   Open `http://localhost:3000` to view the application.


## Usage

Once the project is set up, you can:

- Browse products, add items to the cart, and proceed to checkout.
- Register or log in to track your orders.
- Admins can manage products and orders through the admin dashboard.

## Contributing

We welcome contributions from the community! To contribute to ScrollMe, follow these steps:

1. **Fork the repository** on GitHub.
2. **Checkout the `develop` branch**

```bash
   git checkout develop
```

3. **Install dependencies**
   Run the following command to install project dependencies:

 ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
```

4. **Create a branch** for your feature or bugfix

   ```bash
   git checkout -b feature-name
   ```

5. **Commit your changes**

   ```bash
   git commit -m "Add feature-name"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature-name
   ```

7. **Open a pull request**: Provide a detailed description of your changes in the pull request template. Link to any relevant issues.

### Guidelines

- Ensure code quality by following consistent formatting and naming conventions.
- Write clear and concise commit messages.
- Test your changes thoroughly before submitting a pull request.

## Code of Conduct

We are committed to fostering a welcoming and harassment-free community. All participants are expected to adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). Please treat others with respect and professionalism in all interactions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

We appreciate your interest in ScrollMe and look forward to your contributions!

## Community Discussion

Join our Discord Server for community discussions, support, and collaboration!

We appreciate your interest in ScrollMe and look forward to your contributions!

Just replace https://discord.gg/w4nKprr5 with the actual link to your Discord server. Let me know if you need any further modifications!
