const user = require('../models/user');
const jwt = require('jsonwebtoken');
const {
    generateToken
} = require('../utils/tokenUtils.js');

/**
 * @description 前台登录
 * @param {*} ctx 
 * @param {*} next 
 */
const login = async (ctx, next) => {
    try {
        const msg = ctx.request.body.values;
        const password = msg.password;
        const token = ctx.request.body.token;
        // console.log('login token:', token);

        /**
         * findOne  return 一个 query 
         * 返回一个匹配项,无匹配项,返回 null
         */
        await user.findOne({
            user: msg.user
        }).then(user => {
            // console.log(user);
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

/**
 * @description 前台注册
 * @param {*} ctx 
 * @param {*} next 
 */
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

/**后台操作 */

// 返回所有用户信息
let queryAllUsers = async (ctx, next) => {
    try {
        ctx.body = await user.find();
    } catch (error) {
        if (err) throw err;
        ctx.body = {
            error: '查询用户发生错误'
        }
    }
}

// 管理员修改用户密码
let updateUserPassword = async (ctx, next) => {
    try {
        const data = ctx.request.body.user
        const userName = data.userName;
        const userNewPassword = data.newPassword.pass;
        await user.updateOne({
            "user": userName
        }, {
            $set: {
                "password": userNewPassword
            }
        }, (err) => {
            if (err) {
                return ctx.body = {
                    title: '错误',
                    status: 403,
                    msg: '密码修改无效！'
                }
            }
            console.log(`管理员修改了用户：${userName} 的密码`);
            return ctx.body = {
                title: '成功',
                status: 200,
                msg: '密码修改成功！'
            }
        });

    } catch (error) {
        if (error)() => console.log(error);
    }
}

// 管理员删除网站用户
let delUser = async (ctx, next) => {
    try {
        const data = ctx.request.query;
        const _id = data.user_id;
        await user.deleteOne({
            "_id": _id
        }, err => {
            if (err) {
                return ctx.body = {
                    title: '错误',
                    status: 403,
                    msg: '删除用户时发生错误！'
                }
            }
            console.log(`删除了_id:${_id}, 用户名为: ${data.userName} 的用户！！`);
            return ctx.body = {
                title: '成功',
                status: 200,
                msg: '用户删除成功！'
            }
        });
    } catch (error) {
        if (error)() => console.log(error);
    }
}

/**
 * @description 分页返回用户
 * @param {Number} pageNum 第几页
 * @param {Number} pageSize 每页数量
 */
let queryUsersByPage = async (ctx, next) => {
    let pageNum = ctx.query.pageNum > 1 ? ctx.query.pageNum : 1;
    // console.log(pageNum);
    let pageSize = 10;
    try {
        await user.find().limit(pageSize).skip((pageNum - 1) * pageSize)
            .then((res) => {
                ctx.body = {
                    usersPageData: res
                };
            })
    } catch (error) {
        ctx.body = {
            error: '查询用户发生错误'
        }
    }
}

module.exports = {
    login,
    register,
    queryAllUsers,
    updateUserPassword,
    delUser,
    queryUsersByPage
}