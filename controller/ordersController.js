const Order = require('../models/order');

// 根据传入的 orderid 删除订单
let deleteOrder = async (ctx, next) => {
    try {
        let orderID = ctx.query.orderid;
        let orderName = ctx.query.ordername;
        console.log('要删除的orderID: ' + orderID)
        ctx.body = await Order.deleteOne({
            '_id': orderID,
            'name': orderName
        }, err => {
            if (err) {
                console.log(`删除订单发生错误${err}`);
            }
            console.log(`已删除订单号为: ${orderID},订单名称为: ${orderName}`)
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
            if (err) {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
}


// wx qr
let wxqr = async (ctx, next) => {
    try {
        ctx.body = {
            appId: 'wxae0097c0c8c31ef1',
            msg: 'wx'
        }


    } catch (error) {
        if (err) {
            console.log(err);
        }
    }
}

// 前台提交订单写入数据库
let commitorders = async (ctx, next) => {
    try {
        let data = ctx.request.body.orders;
        for (let i = 0; i < data.length; i++) {
            let order = new Order(data[i]);
            await order.save(err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`新订单写入，名称为：${data[i].name}`);
                }
            })
        }

        ctx.body = {
            msg: 'commitorders'
        }


    } catch (error) {
        if (err) {
            console.log(err);
        }
    }
}

module.exports = {
    deleteOrder,
    queryOrders,
    addNewOrder,
    wxqr,
    commitorders
}