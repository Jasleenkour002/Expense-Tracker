# 💰 Expense Tracker

A lightweight, full-stack Expense Tracker web application. The application features a secure **Node.js & Express** backend coupled with a highly responsive, clean **Vanilla HTML, CSS, and JavaScript** frontend.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## ✨ Features

- **🔐 Secure Authentication**: Sign up and log in safely using hashed passwords (via `bcryptjs`) and secure session tracking (via JSON Web Tokens).
- **📊 Interactive Dashboard**: A clean and responsive dashboard to view, add, and filter your daily expenses.
- **📁 Mock Local Database**: Uses a local file-based database (`data.json`) for zero-setup execution (no external MongoDB server configuration required).
- **⚡ Fast and Lightweight**: Minimal resource usage with fast API response times.

---

## 📂 Project Architecture

```text
Expense Tracker/
├── Expense Tracker/
│   ├── Backend/            # Express.js backend API
│   │   ├── src/            # Application logic (Controllers, Models, Routes)
│   │   ├── data.json       # Local database storage (Auto-generated on launch)
│   │   ├── server.js       # Express server entry point
│   │   └── .env.example    # Configuration variables template
│   └── Frontend/           # Frontend static client files
│       ├── css/            # Style definitions
│       ├── js/             # API client services & dashboard render logic
│       ├── index.html      # Authentication portal (Login/Register)
│       └── dashboard.html  # Main budget & expense dashboard
└── run_backend.bat         # Windows launcher script
```

---

## 🚀 Local Installation & Setup

Follow these simple steps to run the application on your computer:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Install Dependencies
Navigate to the backend directory and install the required npm packages:
```bash
cd "Expense Tracker/Backend"
npm install
```

### 3. Setup Configuration
Duplicate the template configuration file:
```bash
cp .env.example .env
```
*(Optionally, open `.env` in any editor to change ports or configure keys.)*

---

## 💻 Running the Application

Choose **one** of the methods below to start the server:

### Method A: One-Click Startup (Windows)
Double-click the `run_backend.bat` file in the root of the project.

### Method B: Via Terminal
From the `Expense Tracker/Backend` folder, run:
```bash
npm start
```
For developers, start the app with auto-restart on code change:
```bash
npm run dev
```

Once running, navigate to **[http://localhost:5000](http://localhost:5000)** in your web browser.

---

> [!NOTE]
> When starting the backend for the first time, a new database file (`data.json`) is automatically generated inside the `Backend` directory.
