const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const router = require('./routes/router')

const mongoUtil = require('./config/mongo')
mongoUtil.connect();


// middlewares
app.use(bodyparser());

// app.use(cors());

app.use(async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    ctx.set("Content-Type", "application/json;charset=utf-8");
    ctx.set("Access-Control-Allow-Credentials", true);
    await next();
})

app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, function (ctx) {
    console.log(`listening at port 3000`);
});