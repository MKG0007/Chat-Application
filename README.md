# QuickChat Full Stack

A full-stack chat application built with React, Node.js, Express, MongoDB, and Socket.io.

# Deployment
https://chat-nine-phi-22.vercel.app/
## Project Structure

- `client/` – React frontend (Vite, TailwindCSS)
- `server/` – Express backend (API, Socket.io, MongoDB)
- `node/` – (Legacy/experimental) Node.js backend

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/Priyanshu-073/MERN-ProjectAssignment.git
   cd MERN-ProjectAssignment
   ```

2. **Install dependencies:**
   - For client:
     ```
     cd client
     npm install
     ```
   - For server:
     ```
     cd ../server
     npm install
     ```

3. **Environment Variables:**
   - Copy `.env.example` to `.env` in both `client` and `server` folders and fill in your values.

4. **Run the app:**
   - Start backend:
     ```
     cd server
     npm run start
     ```
   - Start frontend:
     ```
     cd ../client
     npm run dev
     ```

5. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Features

- Real-time chat with Socket.io
- User authentication (JWT)
- Profile management
- Media sharing
- Responsive UI

## License

