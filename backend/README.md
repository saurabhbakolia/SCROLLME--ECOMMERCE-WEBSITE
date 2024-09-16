# E-Commerce Backend

## Overview

This is the backend service for an e-commerce application, built using Node.js, Express, and MongoDB. It handles user authentication, including registration, login, and token management with JWT. The backend is designed to work in conjunction with a front-end application, providing endpoints for user management and secure access to resources.

## Table of Contents

- [E-Commerce Backend](#e-commerce-backend)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [User Registration](#user-registration)
    - [User Login](#user-login)
    - [Refresh Token](#refresh-token)
  - [Testing](#testing)

## Features

- User registration and login
- JWT-based authentication (access and refresh tokens)
- Token verification and management
- Secure password hashing with bcrypt
- Role-based access control

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/e-commerce-backend.git
    cd e-commerce-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Configuration

1. **Create a `.env` file in the root directory with the following variables:**

    ```env
    MONGO_URI=mongodb://localhost:27017/ecommerce
    JWT_SECRET=your_jwt_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    PORT=5000
    ```

2. **Make sure to replace the placeholder values with your actual secrets and database connection string.**

## Usage

1. **Start the server:**

    ```bash
    npm start
    ```

    By default, the server will run on `http://localhost:5000`.

2. **API Documentation:**

    Refer to the [API Endpoints](#api-endpoints) section for available routes and usage.

## API Endpoints

### User Registration

- **URL:** `/api/register`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "token": "access_token_here",
        "refreshToken": "refresh_token_here"
    }
    ```

### User Login

- **URL:** `/api/login`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "username": "johndoe",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "token": "access_token_here",
        "refreshToken": "refresh_token_here"
    }
    ```

### Refresh Token

- **URL:** `/api/refresh-token`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "refreshToken": "refresh_token_here"
    }
    ```
- **Response:**
    ```json
    {
        "token": "new_access_token_here"
    }
    ```

## Testing

To run tests, ensure that you have `mocha` and `chai` installed, then execute:

```bash
npm test
