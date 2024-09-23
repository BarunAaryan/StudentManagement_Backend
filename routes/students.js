const express = require('express');
const auth = require('../middleware/auth');
const Student = require('../models/Student');

const router = express.Router();

// Get all students
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find().select('-__v');
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new student (teacher only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const { name, marks } = req.body;
    const newStudent = new Student({ name, marks });
    const student = await newStudent.save();
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update student marks (teacher only)
router.patch('/:id', auth, async (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

//adding commit just for backend detection
