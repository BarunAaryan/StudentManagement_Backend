const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  marks: {
    English: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    Math: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    Hindi: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    Science: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    SocialScience: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  }
});

module.exports = mongoose.model('Student', StudentSchema);