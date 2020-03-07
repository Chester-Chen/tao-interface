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

router.get('/queryorders', ordersController.queryOrders);

router.get('/delorder', ordersController.deleteOrder);




module.exports = router;