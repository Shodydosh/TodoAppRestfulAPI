const express = require('express');
const router = express.Router();

const { createTask, updateTask, getAllTask, deleteTask, getSingleTasks } = require('../controllers/taskController');

router.route('/').post(createTask);
router.route('/').get(getAllTask);
router.route('/:id').get(getSingleTasks);
router.route('/:id').patch(updateTask);
router.route('/:id').delete(deleteTask);

module.exports = router;