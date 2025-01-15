const { Attendance, Employee } = require("../models");

//function to mark attendance
exports.markAttendance = async (req, res) => {
  const employeeId = req.user.id;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Photo is required!",
    });
  }

  const photo = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  try {
    const attendance = await Attendance.create({ employeeId, photo });
    console.log(attendance);

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully!",
      data: {
        attendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//function to get attendance by employee
exports.getAttendanceByEmployee = async (req, res) => {
  const employeeId = req.user.id;

  try {
    const attendance = await Attendance.findAll({
      where: { employeeId },
      include: {
        model: Employee,
        attributes: ["name", "email"],
        as: "employee",
      },
    });

    if (!attendance.length) {
      return res.status(404).json({
        success: false,
        message: "No attendance found for this employee.",
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

    console.log(attendanceData);

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
