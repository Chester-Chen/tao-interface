'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _mongoose2.default.connection; // var mongoose = require('mongoose');

var Schema = _mongoose2.default.Schema;

_mongoose2.default.connect('mongodb://localhost:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });
db.on('error', function () {
    console.log('error');
});

db.once('open', function () {
    console.log('open  success!');
});

// 学生约束
var stuSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    address: String
});

// 创建学生model

var StuModel = new _mongoose2.default.model('people', stuSchema, 'people');

// StuModel.create({
//     name: "chester",
//     age: 33,
//     gender: "female",
//     address: "guagnzhou"
// }, function(err) {
//     if(!err) {
//         console.log("insert success!")
//     }
// });

var temp = 2;

StuModel.updateOne({ name: 'chester' }, { $set: { age: temp } }, function (err) {
    if (!err) console.log('update success');
});
