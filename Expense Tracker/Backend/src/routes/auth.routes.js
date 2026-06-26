const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Register
router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body || {};
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const emailKey = email.toLowerCase();
        const existing = await db.users.findOne({ email: emailKey });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await db.users.create({
            name,
            email: emailKey,
            passwordHash,
        });

        const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', {
            expiresIn: "7d",
        });

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (e) {
        next(e);
    }
});

// Login
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const emailKey = email.toLowerCase();
        const user = await db.users.findOne({ email: emailKey });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || 'secret', {
            expiresIn: "7d",
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
