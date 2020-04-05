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

module.exports = {
    tokenVertify
}