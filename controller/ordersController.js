const Order = require('../models/order');

// 根据传入的 orderid 删除订单
let deleteOrder = async (ctx, next) => {
    try {
        let orderID = ctx.query.orderid;
        let orderName = ctx.query.ordername;
        console.log('要删除的orderID: '+orderID)
        ctx.body = await Order.remove({'_id': orderID}, err => {
            if (err) {
                console.log(`删除订单发生错误${err}`);
            }
            console.log(`删除的订单号为: ${orderID},商品名称为: ${orderName}`)
        })
    } catch (error) {
        console.log(error);
    }
}

// 返回所有订单
let queryOrders = async (ctx, next) => {
    try {
        ctx.body = await Order.find();
    } catch (error) {
        ctx.body = {
            error: '查询订单发生错误'
        }
    }
}

// 添加新订单
let addNewOrder = async (ctx, next) => {
    try {
        let temp = ctx.request.body.data.newOrderForm
        let order = new Order(temp)
        // console.log(temp);
        // console.log(order);
        ctx.body = await order.save((err) => {
            if(err) {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    deleteOrder,
    queryOrders,
    addNewOrder
}

