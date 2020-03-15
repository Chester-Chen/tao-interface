const router = require('koa-router')();

// controller
const goodsController = require('../controller/goodsController');
const ordersController = require('../controller/ordersController');


router.get('/', async (ctx) => {
    ctx.body = 'router test';
    console.log(ctx.href);
})

// 商品
router.get('/addgoods', goodsController.addGoods);

router.get('/querygoods', goodsController.queryGoods);


// 订单

router.get('/queryorders', ordersController.queryOrders);   // 查询所有顶顶那

router.get('/delorder', ordersController.deleteOrder);      // 删除订单

router.post('/addneworder', ordersController.addNewOrder);      // 添加订单




module.exports = router;