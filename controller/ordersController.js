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
        // console.log(await Order.find());
        ctx.body = await Order.find();
    } catch (error) {
        ctx.body = {
            error: '查询订单发生错误'
        }
    }
}

/**
 * @description 分页返回订单
 * @param {Number} pageNum 第几页
 * @param {Number} pageSize 每页数量
 */
let queryOrdersByPage = async (ctx, next) => {
    let pageNum = ctx.query.pageNum > 1 ? ctx.query.pageNum : 1;
    // console.log(pageNum);
    let pageSize = 10;
    try {
        await Order.find().limit(pageSize).skip((pageNum - 1) * pageSize)
            .then((res) => {
                ctx.body = {
                    paginationOrders: res
                };
            })
    } catch (error) {
        ctx.body = {
            error: '查询订单发生错误'
        }
    }
}

// 后台管理员添加新订单
let addNewOrder = async (ctx, next) => {
    try {
        let temp = ctx.request.body.data.newOrderForm
        let order = new Order(temp)
        await order.save().then(value => {
            console.log('value: ', value);
            ctx.body = {
                status: 200,
                msg: '订单添加成功！'
            }
        }).catch(reaseon => {
            console.log('reaseon: ', reaseon);
            ctx.body = {
                status: 409,
                msg: '订单字段输入有误！请仔细检查！'
            }
        })
    } catch (error) {
        console.log(error);
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
                    console.log(`前台新订单写入，名称为：${data[i].name}`);
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

// 后台管理修改订单信息
let updateOrderByOrderid = async (ctx, next) => {
    try {
        const form = ctx.request.body.form;
        console.log('修改后的订单数据：', form);
        await Order.updateOne({
            "_id": form._id
        }, {
            $set: {
                "_id": form._id,
                "id": form.id,
                "name": form.name,
                "num": form.num,
                "price": form.price
            }
        }, (err) => {
            if (err) {
                return ctx.body = {
                    title: '错误',
                    status: 403,
                    msg: '订单修改发生错误！'
                }
            }
            console.log(`后台修改了订单为${form._id}的数据`);
            return ctx.body = {
                title: '成功',
                status: 200,
                msg: '订单修改成功'
            }
        })

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
    commitorders,
    updateOrderByOrderid,
    queryOrdersByPage
}