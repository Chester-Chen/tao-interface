const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

const tokenVertify = async (ctx, next) => {
    const token = ctx.request.body.token;

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            throw err;
        } else {

            console.log('decode token', decoded);
        }
    });
    ctx.body = {
        msg: 'hello'
    }
}

const payTip = async (ctx, next) => {
    let time = ObjectId("5eb69e24b60a00005b0072fe").getTimestamp(); // ISO
    console.log(time.toUTCString());

    console.log('支付成功', ctx.query);
    ctx.body = {
        msg: '支付成功'
    }
}

module.exports = {
    tokenVertify,
    payTip
}