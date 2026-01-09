import Expense from '../models/Expense.js';

// @desc    Get Expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
       const expenses = await Expense.find({}).populate('user', 'name');
       res.json(expenses);
    } else {
       const expenses = await Expense.find({ user: req.user._id });
       res.json(expenses);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Expense
// @route   POST /api/expenses
// @access  Private
const createExpense = async (req, res) => {
  try {
    const { merchant, date, amount, category } = req.body;
    let receiptUrl = '';
    
    if (req.file) {
      receiptUrl = req.file.path;
    }

    const expense = await Expense.create({
      user: req.user._id,
      merchant,
      date,
      amount,
      category,
      receiptUrl
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getExpenses, createExpense };
