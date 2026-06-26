# Expense Tracker

A full-stack Expense Tracker web application. The backend is built with **Node.js/Express**, and the frontend is built using **Vanilla HTML, CSS, and JavaScript**.

## Project Features
- **User Authentication**: Secure signup and login using hashed passwords (bcrypt) and JSON Web Tokens (JWT).
- **Expense Management**: Add, view, filter, and delete expenses.
- **Mock Local Database**: Fast database operation using a local `data.json` storage file (no external MongoDB database installation required).
- **Clean Responsive Dashboard**: Simple, intuitive user interface for managing your day-to-day budgets.

---

## Directory Structure

```text
Expense Tracker/
├── Expense Tracker/
│   ├── Backend/            # Express.js backend server
│   │   ├── src/            # Auth/Expense controllers & database adapter
│   │   ├── data.json       # Local database storage (automatically generated)
│   │   ├── server.js       # Entry point for backend
│   │   └── .env.example    # Template for environment variables
│   └── Frontend/           # Frontend static pages
│       ├── css/            # Style sheets
│       ├── js/             # API client & UI logic
│       ├── index.html      # Authentication / Login page
│       └── dashboard.html  # Expense Dashboard page
└── run_backend.bat         # Batch script to start backend easily on Windows
```

---

## Local Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Install Dependencies
Open your terminal inside the `Expense Tracker/Backend` directory and install the necessary npm packages:
```bash
cd "Expense Tracker/Backend"
npm install
```

### Step 2: Configure Environment Variables
Copy the template `.env.example` file in the `Backend` directory to create a `.env` file:
```bash
cp .env.example .env
```
Inside `.env`, configure the port and secret keys (defaults are pre-configured):
```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

### Step 3: Run the Server
You can run the server in two ways:

#### Option A: Double-Click the batch script (Windows only)
Simply double-click the `run_backend.bat` file in the root folder of this project.

#### Option B: Use Terminal Commands
From the `Expense Tracker/Backend` directory, run:
```bash
npm start
```
Or for development with automatic restarts:
```bash
npm run dev
```

Once running, open your browser and navigate to:
**[http://localhost:5000](http://localhost:5000)**
