const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Employee } = require("../models");

//function to login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required.",
      });
    }

    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        id: employee.id,
        role: employee.role,
        name: employee.name,
        email: employee.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
