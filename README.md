# Premium Stay (Airbnb Clone)

Premium Stay is a full-stack rental marketplace web application, designed to provide a premium and dynamic user experience similar to platforms like Airbnb. 

## 🚀 Technologies Used

- **Frontend:** Next.js (React framework) for a modern, responsive user interface.
- **Backend:** Node.js with Express.js for robust API handling.
- **Database:** MongoDB (Mongoose) for dynamic data storage.
- **Core Integrations:** 
  - `bcryptjs` for secure password hashing.
  - `multer` for image and file uploads.
  - `express-session` & `express-flash` for user sessions and state management.

## 📁 Project Structure

This is a monorepo setup containing both frontend and backend layers:

- **`/frontend/`** - Next.js client application containing the user interface, pages, and components.
- **`/` (Root directory)** - Express.js backend API, including controllers, models, routes, and middleware.

## 🛠️ Getting Started

### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed on your machine. 

### 1. Backend Setup

1. Open a terminal in the root directory.
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by copying the example file:
   ```bash
   cp .env.example .env
   ```
   *(Update the `.env` with your MongoDB URI and specific secrets).*
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📌 Key Features

- **Authentication System:** Secure Registration & Login functionality.
- **Dynamic Property Listings:** Added functionality to create, edit, browse, and manage rental properties.
- **File Uploads:** Host property images using integration with `multer`.
- **Booking System:** Interactive features allowing booking flow with real-time reservation data.
- **Host Dashboard:** Personalized view for hosts to manage their properties and incoming booking requests.
