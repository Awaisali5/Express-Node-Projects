const mongoose= require('mongoose');


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide the Name'],
        trim: true,
        maxlength: [120, 'Name can not be more than 20 Letter'],
    },
    completed: {
        type:Boolean,
        default:false,
    }
})



module.exports = mongoose.model('Task', TaskSchema)