const express = require('express');
const router = express.Router();

const { createTask, updateTask, getAllTask, deleteTask } = require('../controllers/taskController');

router.route('/').post(createTask);
router.route('/').get(getAllTask);
router.route('/:id').patch(updateTask);
router.route('/:id').delete(deleteTask);

module.exports = router;