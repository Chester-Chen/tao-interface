const user = require('../models/user');

const login = async (ctx, next) => {
    try {
        // const body = JSON.stringify(ctx.request.body);
        const msg = ctx.request.body.values;
        const password = msg.password;
        console.log(msg);
        /**
         * findOne  return 一个 query 
         * 返回一个匹配项,无匹配项,返回 null
         */
        await user.findOne({
            name: msg.user
        }).then(user => {
            console.log(user);
            if (!user) { // 用户不存在
                return ctx.body = {
                    status: 404,
                    msg: '用户名不存在'
                };
            }
            if (user.password == password) { // 密码正确
                ctx.body = {
                    status: 200,
                    msg: '密码正确!'
                }
            } else { // 密码错误
                ctx.body = {
                    status: 403,
                    msg: '密码错误!'
                }
            }
        })
    } catch (error) {
        if (error) throw error;
    }
}

const register = async (ctx, next) => {
    try {
        ctx.body = await alert('register')
    } catch (error) {

    }
}



module.exports = {
    login,
    register
}