# uberClone
# uberClone_Backend

## Overview
This is the backend for the UberClone application. It provides APIs for user authentication, ride management, and payment processing.

## Getting Started
To get started with the backend, follow these steps:

1. Clone the repository
2. Install dependencies using `npm install`
3. Set up environment variables
4. Run the server using `npm start`

## Environment Variables
The following environment variables need to be set:

- `DB_CONNECTION_STRING`: Connection string for the database
- `JWT_SECRET`: Secret key for JWT authentication
- `PAYMENT_API_KEY`: API key for the payment gateway

## API Endpoints

### User Authentication
- **POST /api/auth/register**
  - Registers a new user
  - Request body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john.doe@example.com"
      }
    }
    ```

- **POST /api/auth/login**
  - Logs in a user
  - Request body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login successful",
      "token": "jwt_token"
    }
    ```

### Ride Management
- **POST /api/rides**
  - Creates a new ride
  - Request body:
    ```json
    {
      "pickupLocation": "Location A",
      "dropoffLocation": "Location B",
      "userId": "user_id"
    }
    ```
  - Response:
    ```json
    {
      "message": "Ride created successfully",
      "ride": {
        "id": "ride_id",
        "pickupLocation": "Location A",
        "dropoffLocation": "Location B",
        "status": "pending"
      }
    }
    ```

- **GET /api/rides/:id**
  - Retrieves a ride by ID
  - Response:
    ```json
    {
      "ride": {
        "id": "ride_id",
        "pickupLocation": "Location A",
        "dropoffLocation": "Location B",
        "status": "pending"
      }
    }
    ```

### Payment Processing
- **POST /api/payments**
  - Processes a payment for a ride
  - Request body:
    ```json
    {
      "rideId": "ride_id",
      "amount": 100,
      "paymentMethod": "credit_card"
    }
    ```
  - Response:
    ```json
    {
      "message": "Payment processed successfully",
      "payment": {
        "id": "payment_id",
        "rideId": "ride_id",
        "amount": 100,
        "status": "completed"
      }
    }
    ```

## Error Handling
All endpoints return appropriate HTTP status codes and error messages in case of failures.

## Conclusion
This backend provides essential functionalities for the UberClone application, including user authentication, ride management, and payment processing. Make sure to set up the environment variables correctly and follow the API documentation for integration.
