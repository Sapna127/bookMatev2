# bookMatev2

This project is a web application for buying and selling books.  It uses a client-server architecture with a React frontend and a Node.js/Express backend.

![image](https://github.com/user-attachments/assets/cfa76152-f0d8-4961-a311-a1a9c456dba8)


## Features and Functionality

* **User Authentication:** Users can sign up (as buyers or sellers) and sign in securely.  The application uses local storage for session management, but the backend provides proper authentication endpoints (`/api/v1/users/register`, `/api/v1/users/login`).
* **Book Listing:** Sellers can create listings for books including name, author, publication, tags, description, and images.
* **Book Browsing:** Buyers can browse all available books, filtered by category (currently hardcoded as "Computer Science" in `client/src/Pages/AllBooks.jsx`).
* **Book Purchase:**  Buyers can view book details and initiate a purchase (currently a placeholder - the backend `/api/v1/purchases` routes are implemented but frontend functionality is not fully implemented).
* **Chat Functionality:** A real-time chat system using Socket.IO allows buyers and sellers to communicate.  The chat functionality is functional.
* **User Profiles:**  Users have profiles (currently a placeholder component).


## Technology Stack

**Frontend:**

* React
* React Router
* Tailwind CSS
* Vite
* Socket.IO-client


**Backend:**

* Node.js
* Express.js
* Mongoose
* MongoDB
* Socket.IO
* JWT (JSON Web Tokens) for authentication
* Zod for data validation


## Prerequisites

* Node.js and npm (or yarn) installed.
* MongoDB running locally.  Set the `MONGO_URI` environment variable to your MongoDB connection string.  (See `server/config/db.js`)
* A code editor (e.g., VS Code, Sublime Text).


## Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sapna127/bookMatev2.git
   ```

2. **Navigate to the client directory:**
   ```bash
   cd bookMatev2/client
   ```

3. **Install client dependencies:**
   ```bash
   npm install
   ```

4. **Navigate to the server directory:**
   ```bash
   cd ../server
   ```

5. **Install server dependencies:**
   ```bash
   npm install
   ```

6. **(Optional) Set up environment variables:** Create a `.env` file in the server directory and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

7. **Start the server:**
   ```bash
   npm run start
   ```

8. **Start the client:**
   ```bash
   cd ../client
   npm run dev
   ```

The application will be accessible at `http://localhost:5173`.


## Usage Guide

1. **Sign up:** Create a new account specifying your name, email, password, and whether you are a buyer or seller.
2. **Sign in:** Log in using your credentials.
3. **Browse books:** Use the navigation to view all listed books.
4. **Create a listing (sellers):**  Use the "Sell" page to add a new book listing.  Upload images using the file upload component (`client/src/components/FileUpload.jsx`).
5. **Purchase a book (buyers):** View book details and use the "Buy now" button (currently placeholder).
6. **Chat with sellers:** Use the chat feature (`client/src/Pages/ChatPage.jsx`) to contact sellers.


## API Documentation

**Users:**

* `/api/v1/users/register`: POST - Register a new user.  Requires `name`, `email`, `password`, and `role` (buyer or seller).  See `server/controller/userController.js` and `server/routes/userRoutes.js`.
* `/api/v1/users/login`: POST - Login.  Requires `email` and `password`.
* `/api/v1/users/profile`: GET (protected) - Get current user profile.
* `/api/v1/users/profile`: PUT (protected) - Update user profile.


**Books:**

* `/api/v1/books`: POST - Add a new book. Requires `name`, `author`, `publication`, `tags`, `description`, `pictures` (array of image URLs), and `sellerId`.  See `server/controller/bookController.js` and `server/routes/bookRoutes.js` for validation details.
* `/api/v1/books`: GET - Get all books.
* `/api/v1/books/:id`: GET - Get a book by ID.
* `/api/v1/books/:id`: PUT - Update a book by ID.
* `/api/v1/books/:id`: DELETE - Delete a book by ID.


**Purchases:**

* `/api/v1/purchases`: POST - Purchase a book. Requires `userId` and `bookId`.
* `/api/v1/purchases/:userId`: GET - Get purchased books for a user (protected).



