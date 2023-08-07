const mongoose = require('mongoose');
const schema = mongoose.Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true, minlength:6},
   email: String,
   fullname: String
});

module.exports = mongoose.model("User", schema);
