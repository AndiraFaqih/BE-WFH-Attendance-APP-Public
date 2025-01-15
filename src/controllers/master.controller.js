const { Employee, Attendance } = require("../models");
const bcrypt = require("bcrypt");

//function to add employee
exports.addEmployee = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password fields are required.",
      });
    }

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({
        success: false,
        error: "Name must be between 3 and 50 characters.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long.",
      });
    }

    const validRoles = ["admin", "employee"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Role must be either "admin" or "employee".',
      });
    }

    const existingEmployee = await Employee.findOne({ where: { email } });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        error: "Employee email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    res.status(201).json({
      success: true,
      message: "Employee registered successfully!",
      data: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//function to get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    if (!employees.length) {
      return res.status(404).json({
        success: false,
        message: "No employees found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employees retrieved successfully!",
      data: {
        employees,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//function to update employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found.",
      });
    }

    if (name && (name.length < 3 || name.length > 50)) {
      return res.status(400).json({
        success: false,
        error: "Name must be between 3 and 50 characters.",
      });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: "Invalid email format.",
        });
      }
    }

    if (role) {
      const validRoles = ["admin", "employee"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({
          success: false,
          error: 'Role must be either "admin" or "employee".',
        });
      }
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.role = role || employee.role;

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      data: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//function to delete employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    await employee.destroy();
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//function to get all attendance
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
      include: {
        model: Employee,
        attributes: ["name", "email"],
        as: "employee",
      },
    });

    if (!attendance.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance found.",
      });
    }

    const formatDate = (date) => {
      const d = new Date(date);
      const dateStr = d.toLocaleDateString("id-ID");
      const timeStr = d.toLocaleTimeString("id-ID");
      return `${dateStr} ${timeStr}`;
    };

    const attendanceData = attendance.map((item) => {
      const { createdAt, ...rest } = item.toJSON();
      return {
        ...rest,
        attendanceTime: formatDate(createdAt),
        employee: rest.employee,
      };
    });

    res.status(200).json({
      success: true,
      message: "Attendance retrieved successfully!",
      data: {
        attendance: attendanceData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//function to get employee by id
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id, {
      attributes: {
        exclude: ["id", "password", "createdAt", "updatedAt"],
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully.",
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
