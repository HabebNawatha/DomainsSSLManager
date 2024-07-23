# SSL Certificate Management System

## Overview
This project is designed to help users manage their domain's SSL certificates efficiently. From the home page, you can use an API to gather information about a domain's certificate data and add it to your dashboard to keep track and manage your SSL certificates.

## Features
- **API Integration**: Fetch SSL certificate data for a specified domain.
- **Dashboard**: Add and manage SSL certificates from a user-friendly dashboard.
- **Edit Profile**: Update user profile information securely.

## Technologies Used
- **Frontend**: React, CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Password Hashing - bcrypt

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/HabebNawatha/DomainsSSLManager.git
2. **Set up a local MongoDB database or use a cloud-based MongoDB service**
- Install MongoDB if you haven't already.
- Start MongoDB service.
- Create a database named as you prefer (update `DB_NAME` accordingly in `.env`).
2. **Set up a RapidAPI account**
- Set up an account for RapidAPI.
- Subscribe to the SSL Certificate Checker API.
- Obtain your API key from the RapidAPI dashboard.
- Update the values of the key and host (update `CERTIFICATE_RAPID_API_KEY` & `CERTIFICATE_RAPID_API_HOST` in `.env`)
3. **Configure enviroment vairables**
- Create `.env` files in the Backend directory.
- Add the fiollowing variables:
    ```sh
    # MongoDB connection string
    DB_CONN_STRING="your_mongodb_connection_string_here"

    # Database name
    DB_NAME="your_database_name_here"

    # Collection names
    USERS_COLLECTION_NAME="your_users_collection_name_here"
    CERTIFICATES_COLLECTION_NAME="your_certificates_collection_name_here"

    # JWT secrets (use strong, random strings)
    JWT_SECRET="your_jwt_secret_here"
    REFRESH_TOKEN_SECRET="your_refresh_token_secret_here"

    # RapidAPI credentials
    CERTIFICATE_RAPID_API_KEY="your_rapid_api_key_here"
    CERTIFICATE_RAPID_API_HOST="your_rapid_api_host_here"

4. **Install dependencies for the Backend**
   ```sh
   cd Backend
   npm install
5. **Install dependencies for the Frontend**
   ```sh
   cd ../Frontend
   npm install
6. **Run the backend server**
    ```sh
    cd Backend
    npm start
7. **Run the frontend server**
    ```sh
    cd ../Frontend
    npm start
## Usage
1. **Home Page**
   1. Use the API to gather SSL certificate data for a domain.
   2. Add the certificate data to your dashboard.
2. **Dashboarb**
   1. View and manage your SSL certificates.
3. **Profile**
   1. View your profile data.
   2. Update & change your data.
4. **User Login & Signup**
   1. Login using your saved credentials.
   2. Register your account.
