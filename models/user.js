const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// 创建约束
var userSchema = new Schema({
    name: String,
    password: String
});


const user = new mongoose.model('users', userSchema);

module.exports = user;