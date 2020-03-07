const Order = require('../models/order');

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
        
    }
}



let queryOrders = async (ctx, next) => {
    try {
        ctx.body = await Order.find();
    } catch (error) {
        ctx.body = {
            error: '查询订单发生错误'
        }
    }
}




module.exports = {
    deleteOrder,
    queryOrders
}

