const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	fullname: {
		type: String,
		required: true,
	},
	grade: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Student", studentSchema);
