const mongoose = require('mongoose');
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  priority: {
    type: Number,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model("Task", schema);
