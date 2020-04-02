const user = require('../models/user');

/**
 * @description: 用户名存在返回true 否则发挥false
 */
//  function userIsExist(ctx) {
//     try {
//         const data = ctx.request.body;
//         console.log('user: ', data.values);
//         let temp =  user.findOne({
//             name: data.values.user
//         }).then(res => {
//             console.log('1');
//             if (res) {
//                 return true;
//             }
//         });
//         console.log('temp: ', temp);
//       return temp ? true : false;
//     } catch (error) {
//         if (error) throw error;
//     }
// }

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
            user: msg.user
        }).then(user => {
            console.log(user);
            if (!user) { // 用户不存在
                console.log(`用户: ${msg.user}, 不存在!`);
                return ctx.body = {
                    status: 404,
                    msg: '用户名不存在'
                };
            }
            if (user.password == password) { // 密码正确
                console.log(`用户: ${msg.user}, 登录成功!`);
                ctx.body = {
                    status: 200,
                    msg: '登录成功!'
                }
            } else { // 密码错误
                console.log(`用户: ${msg.user}, 密码输入错误!`);
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
        const data = ctx.request.body;
        const temp = new user(data.values);
        console.log('user: ', data.values);
        if (await user.findOne({
                user: data.values.user
            }).then(res => {
                if (res) {
                    return true;
                }
            })) {
            console.log('用户名已存在!');
            ctx.body = {
                status: 403,
                msg: '用户名已存在!'
            }
        } else {
            await temp.save().then(res => {
                if (res) {
                    console.log('注册成功!');
                }
            }).catch(err => {
                console.log(err);
            });
            ctx.body = {
                status: 200,
                msg: '注册成功!'
            };

        }

    } catch (error) {
        if (error) throw error;
    }
}



module.exports = {
    login,
    register
}