import Expense from '../models/Expense.js';

// @desc    Get Expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    let expenses;
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
       expenses = await Expense.find({}).populate('user', 'name');
    } else {
       expenses = await Expense.find({ user: req.user._id });
    }

    const records = expenses.map(e => ({
      ...e._doc,
      id: e._id
    }));

    // Calculate basic stats for the frontend
    const totalAmount = records.reduce((acc, curr) => acc + curr.amount, 0);
    const pendingAmount = records.filter(e => e.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);

    res.json({
      records,
      stats: {
        pending: `$${pendingAmount.toLocaleString()}`,
        thisMonth: `$${totalAmount.toLocaleString()}`,
        avgProcessing: '2 Days',
        taxDeductible: `$${(totalAmount * 0.15).toLocaleString()}` // Mock calc
      }
    });
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
