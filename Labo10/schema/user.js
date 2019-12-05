const mongoose = require('mongoose');
const schema = new mongoose.Schema();
const user = mongoose.model('User', schema);

exports.model = user;