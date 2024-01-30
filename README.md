# E-commerce API

## Overview

This project is an API for an e-commerce system built using Node.js and Express, with MongoDB as the database. It provides endpoints for managing products, including creating, updating, deleting, and searching products.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Server](#running-the-server)
4. [Interacting with the API](#interacting-with-the-api)
5. [Test Driven Development](#test-driven-development)
6. [API Documentation](#api-documentation)
7. [Assumptions](#assumptions)
8. [Contributing](#contributing)
9. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ecommerce-api.git

2. **Change into the project directory:**

   ```bash
    cd ecommerce-api

3. **Install dependencies:**

   ```bash
    npm install

# Running the Server

Start the server:

    node server.js

The server will be running at http://localhost:5000.

# Interacting with the API

- **Create a new product:** `POST http://localhost:3000/products`
  - Include product details in the request body.

- **Retrieve all products:** `GET http://localhost:3000/products`

- **Search for products:** `GET http://localhost:3000/products/search?searchTerm=your-search-term`

For other endpoints, refer to the API documentation.

# Test Driven Development

This project follows a test-driven development approach. Ensure you have a testing framework set up (e.g., Jest) and run tests using:

      npm test

# API Documentation

The API documentation for this project is available in the following formats:

- **Postman Collection:** [postman_collection.json](./postman_collection.json)
- **OpenAPI (Swagger) Specification:** [swagger.yaml](./swagger.yaml)

Please refer to these files for detailed information on the API endpoints, request formats, and response structures.

