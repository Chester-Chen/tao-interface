const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// 创建约束
var orderSchema = new Schema({
    // orderID: null        // 订单号暂未添加
    id: Number,
    num: Number,
    price: Number,
    desc: {type: String, required: true},
    name: String,
});


// 创建model
/**
 * 第一个参数为modelname， 集合名的映射
 */
const orders = new mongoose.model('orders', orderSchema);

module.exports = orders;




