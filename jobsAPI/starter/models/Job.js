const { required, ref } = require("joi");
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please Provide the Compnay Name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Please Provide the Position Name"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"],
    default: "pending",
  },
  createBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please Provide User']
  }
},{timestamps:true});


module.exports = mongoose.model('Job', JobSchema)