const express = require("express");
const Expense = require("./src/models/Expense");
const auth = require("./src/middleware/auth");

const router = express.Router();

// Create expense
router.post("/", auth, async (req, res, next) => {
  try {
    const { title, amount, category, date, note } = req.body || {};
    if (!title || amount === undefined || !category || !date) {
      return res.status(400).json({ message: "title, amount, category, date are required" });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      title: String(title).trim(),
      amount: Number(amount),
      category,
      date: new Date(date),
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

    const filter = { userId: req.user.id };

    if (category) filter.category = category;

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { note: { $regex: q, $options: "i" } },
      ];
    }

    const expenses = await Expense.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (e) {
    next(e);
  }
});

// Delete expense
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const exp = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!exp) return res.status(404).json({ message: "Expense not found" });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
