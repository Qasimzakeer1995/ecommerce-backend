const mongoose = require('mongoose');

const usertSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
});

module.exports = mongoose.model('user', usertSchema, 'users');