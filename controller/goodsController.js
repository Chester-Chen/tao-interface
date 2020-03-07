const Good = require('../models/good');

let queryGoods = async (ctx, next) => {
    try {
        ctx.body = await Good.find();
        // console.log(ctx.body);
    } catch (error) {
        ctx.body = {
            error: '查看商品发生错误',
        }
    }
}

let addGoods = async (ctx, next) => {
    try {
        // ctx.body = await Good.insert();
        ctx.body = await alert('增加商品成功');

    } catch (error) {
        ctx.body = {
            error: '增加商品发生错误',
        }
    }
}



module.exports = {
    queryGoods,
    addGoods
}