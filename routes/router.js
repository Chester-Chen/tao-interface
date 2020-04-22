const router = require('koa-router')();

// controller
const goodsController = require('../controller/goodsController');
const ordersController = require('../controller/ordersController');
const distributionController = require('../controller/distributionController');
const usersController = require('../controller/usersController');
const testController = require('../controller/testController');


router.get('/', async (ctx) => {
    ctx.body = 'router test';
    console.log(ctx.href);
})

// test
router.post('/test', testController.tokenVertify)
router.get('/test', testController.payTip)

// 商品
router.get('/addgoods', goodsController.addGoods);
router.get('/querygoods', goodsController.queryGoods);

// 订单
router.get('/queryorders', ordersController.queryOrders);   // 查询所有顶顶那
router.get('/delorder', ordersController.deleteOrder);      // 删除订单
router.post('/addneworder', ordersController.addNewOrder);      // 添加订单
router.post('/update_order_by_orderid', ordersController.updateOrderByOrderid);      // 添加订单


// 物流
router.get('/querydis', distributionController.queryDis);      // 返回所有物流信息
router.get('/querydisbyid', distributionController.queryDisById);      // 根据orderid返回物流信息

// 登录及注册
router.post('/login', usersController.login);
router.post('/register', usersController.register);

// 用户管理
router.get('/queryusers', usersController.queryAllUsers);

// wx qr
router.get('/wxpay', ordersController.wxqr);
router.post('/commitorders', ordersController.commitorders);


module.exports = router;