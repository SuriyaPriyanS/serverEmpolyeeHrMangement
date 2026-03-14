import User from '../models/User.js';
import notificationService from '../utils/notificationService.js';

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({}).select('-password');
    res.json({
      employees: employees.map(emp => ({
        ...emp._doc,
        id: emp._id
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new employee (Admin/HR only)
// @route   POST /api/employees
// @access  Private/Admin/HR
const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role, department, status, salary, joinDate } = req.body;
    let avatar = '';

    if (req.file) {
      avatar = req.file.path;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Assuming password is hashed before this point or handled by the User model pre-save hook
    // For the purpose of this edit, we'll use 'password' as 'hashedPassword' as per the snippet's comment.
    const hashedPassword = password; // Placeholder: In a real app, hash the password here.

    const employee = await User.create({
      name,
      email,
      password: hashedPassword, // In real world send a temp password
      role: role || 'Employee',
      department,
      designation, // Added from snippet
      status, // Kept from original, not in snippet but not explicitly removed
      salary,
      joinDate, // Kept from original, not in snippet but not explicitly removed
      avatar: avatarUrl, // Uses avatarUrl
    });

    if (employee) {
      // Send Welcome Notification
      // Note: In a real app we would send the generated password or a reset link.
      // Here we assume the password passed is the initial one.
      try {
        await notificationService.sendWelcomeNotification(employee, password);
      } catch (err) {
        console.error("Failed to send welcome email", err);
      }

      res.status(201).json({
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department, // Kept from original
        avatar: employee.avatar
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin/HR (or Self for some fields)
const updateEmployee = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.department = req.body.department || user.department;
      user.status = req.body.status || user.status;
      user.salary = req.body.salary || user.salary;
      user.joinDate = req.body.joinDate || user.joinDate;

      if (req.body.password) {
        user.password = req.body.password;
      }
      
      if (req.file) {
        user.avatar = req.file.path;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        department: updatedUser.department,
        avatar: updatedUser.avatar,
      });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'Employee removed' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
