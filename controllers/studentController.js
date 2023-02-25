const Student = require("../model/Student");

const getStudent = async (req, res) => {
	if (!req?.params?.id)
		return res
			.status(400)
			.json({ message: "Missing Student ID in the request parameter." });

	try {
		const student = await Student.findById(req.params.id);

		if (!student)
			return res.status(400).json({
				message: `Student with an ID of ${req.params.id} is not found.`,
			});

		res.json(student);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getAllStudents = async (req, res) => {
	try {
		const students = await Student.find({}).lean();
		if (!students?.length) {
			return res.status(400).json({ message: "No students found." });
		}
		res.json(students);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createStudent = async (req, res) => {
	if (!req?.body?.fullname || !req?.body?.grade)
		return res.status(400).json({ message: "All fields are required." });

	const { fullname, grade } = req.body;

	if (!fullname) {
		return res.status(400).json({ message: "Full name is required." });
	}

	if (grade > 100 || grade < 0) {
		return res.status(400).json({ message: "Invalid grade." });
	}

	try {
		const result = await Student.create({
			fullname: fullname,
			grade: grade,
		});

		res.status(201).json(result);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const updateStudent = async (req, res) => {
	if (!req?.body?.id)
		return res
			.status(400)
			.json({ message: "Missing Student ID in the request parameter." });

	const student = await Student.findById(req.body.id);

	if (!student)
		return res
			.status(400)
			.json({ message: `Student with an ID of ${req.body.id} is not found.` });

	if (req.body.fullname) student.fullname = req.body.fullname;

	if (req.body.grade) student.grade = req.body.grade;

	try {
		const result = await student.save();

		res.json(result);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteStudent = async (req, res) => {
	if (!req?.body?.id)
		return res
			.status(400)
			.json({ message: "Missing Student ID in the request parameter." });

	const student = await Student.findById(req.body.id).exec();

	if (!student)
		return res
			.status(400)
			.json({ message: `Student with an ID of ${req.body.id} is not found.` });

	try {
		const result = await Student.deleteOne({ _id: req.body.id }).exec();

		res.json(result);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getStudent,
	getAllStudents,
	createStudent,
	updateStudent,
	deleteStudent,
};
