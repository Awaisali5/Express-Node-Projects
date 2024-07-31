const express = require('express');

const router= express.Router();

const {getallTasks, createTask, updateTask,deleteTask,getTask} = require('../controllers/tasksController')


router.route('/').get(getallTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router;


