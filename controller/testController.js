const jwt = require('jsonwebtoken');


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
    
    console.log('支付成功', ctx.query);
    ctx.body = {
        msg: '支付成功'
    }
}

module.exports = {
    tokenVertify,
    payTip
}