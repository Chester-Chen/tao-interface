const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// 创建约束
var goodSchema = new Schema({
    id: Number,
    thumb: String,
    num: Number,
    price: Number,
    desc: String,
    name: String,
    selected: Boolean,
    sold: Number
});

// var goodSchema = new Schema({
//     name: String,
//     title: String,
//     price: Number,
//     desc: String,
//     url: String
// });

// db.tao.insert({
//     name: '荣耀5',
//     title: '商品标题',
//     price: 5678,
//     desc: '商品描述',
//     url: 'test url'
// })

/**
 * 第一个参数为modelname， 集合名的映射
 */
const good = new mongoose.model('goods', goodSchema);

module.exports = good;




