const Distribution = require('../models/distribution');

// 返回所有物流信息
let queryDis = async (ctx, next) => {
    try {
        ctx.body = await Distribution.find();
    } catch (error) {
        ctx.body = {
            error: '查询订单发生错误'
        }
    }
}
// 根据orderid返回物流信息
let queryDisById = async (ctx, next) => {
    try {
        ctx.body = await Distribution.find();
    } catch (error) {
        ctx.body = {
            error: '查询订单发生错误'
        }
    }
}

module.exports = {
    queryDis,
    queryDisById
}

