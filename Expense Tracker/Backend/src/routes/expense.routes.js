const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

// Create expense
router.post("/", auth, async (req, res, next) => {
  try {
    const { title, amount, category, date, note } = req.body || {};
    if (!title || amount === undefined || !category || !date) {
      return res.status(400).json({ message: "title, amount, category, date are required" });
    }

    const expense = await db.expenses.create({
      userId: req.user.id,
      title: String(title).trim(),
      amount: Number(amount),
      category,
      date: new Date(date).toISOString(),
      note: note ? String(note).trim() : "",
    });

    res.status(201).json(expense);
  } catch (e) {
    next(e);
  }
});

// List expenses (with filters)
router.get("/", auth, async (req, res, next) => {
  try {
    const { from, to, category, q } = req.query;

    const query = { userId: req.user.id };

    if (category) query.category = category;

    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = from;
      if (to) query.date.$lte = to;
    }

    if (q) {
      query.$or = [
        { title: { $regex: q } },
        { note: { $regex: q } },
      ];
    }

    const expenses = await db.expenses.find(query);
    res.json(expenses);
  } catch (e) {
    next(e);
  }
});

// Delete expense
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const exp = await db.expenses.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!exp) return res.status(404).json({ message: "Expense not found" });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
