require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./src/routes/auth.routes");
const expenseRoutes = require("./src/routes/expense.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Serve Frontend static files
app.use(express.static(path.join(__dirname, "../Frontend")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Fallback to index.html for SPA behavior
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is live at http://localhost:${PORT}`);
  console.log(`ℹ️ Frontend: http://localhost:${PORT}`);
  console.log(`ℹ️ Database: Local JSON file (No MongoDB needed!)`);
});
