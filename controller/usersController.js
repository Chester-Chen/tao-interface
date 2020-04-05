const user = require('../models/user');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/tokenUtils.js');


const login = async (ctx, next) => {
    try {
        const msg = ctx.request.body.values;
        const password = msg.password;
        const token = ctx.request.body.token;

        console.log('login token:', token);

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
                    msg: '登录成功!',
                    token: generateToken(user)
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