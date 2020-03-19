const mongoose = require('mongoose');
var Schema = mongoose.Schema;


// 创建约束
var childChildSchema = new Schema({
    datetime: String,
    remark: String
});
var childSchema = new Schema({
    company: String,
    com: String,
    no: String,
    status: String,
    status_detail: String,
    list: [childChildSchema]
});
var disSchema = new Schema({
    resultcode: String,
    reason: String,
    result: [childSchema],
    error_code: Number
});

// db.distributions.insertMany([{
//     "resultcode": "200",
//     "reason": "查询物流信息成功",
//     "result": {
//         "company": "EMS",
//         "com": "ems",
//         "no": "1186465887499",
//         "status": "1",
//         "status_detail": "PENDING",
//         "list": [{
//                 "datetime": "2016-06-15 21:44:04",
//                 "remark": "离开郴州市 发往长沙市【郴州市】",
//             },
//             {
//                 "datetime": "2016-06-15 21:46:45",
//                 "remark": "郴州市邮政速递物流公司国际快件监管中心已收件（揽投员姓名：侯云,联系电话:）【郴州市】",
//             },
//             {
//                 "datetime": "2016-06-16 12:04:00",
//                 "remark": "离开长沙市 发往贵阳市（经转）【长沙市】",
//             },
//             {
//                 "datetime": "2016-06-17 07:53:00",
//                 "remark": "到达贵阳市处理中心（经转）【贵阳市】",
//             },
//             {
//                 "datetime": "2016-06-18 07:40:00",
//                 "remark": "离开贵阳市 发往毕节地区（经转）【贵阳市】",
//             },
//             {
//                 "datetime": "2016-06-18 09:59:00",
//                 "remark": "离开贵阳市 发往下一城市（经转）【贵阳市】",
//             },
//             {
//                 "datetime": "2016-06-18 12:01:00",
//                 "remark": "到达  纳雍县 处理中心【毕节地区】",
//             },
//             {
//                 "datetime": "2016-06-18 17:34:00",
//                 "remark": "离开纳雍县 发往纳雍县阳长邮政支局【毕节地区】",
//             },
//             {
//                 "datetime": "2016-06-20 17:55:00",
//                 "remark": "投递并签收，签收人：单位收发章 *【毕节地区】",
//             }
//         ]
//     },
//     "error_code": 0
// }, {
//     "resultcode": "200",
//     "reason": "查询物流信息成功",
//     "result": {
//         "company": "SF",
//         "com": "sf",
//         "no": "1131666387445",
//         "status": "1",
//         "status_detail": "TAKING",
//         "list": [{
//                 "datetime": "2016-06-15 21:44:04",
//                 "remark": "离开广州市 发往北京市",
//             },
//             {
//                 "datetime": "2016-06-15 21:46:45",
//                 "remark": "广州市邮政速递物流公司国际快件监管中心已收件（揽投员姓名：马云,联系电话:）【广州市】",
//             },
//             {
//                 "datetime": "2016-06-16 12:04:00",
//                 "remark": "离开广州市 发往贵阳市（经转）【广州市】",
//             },
//             {
//                 "datetime": "2016-06-17 07:53:00",
//                 "remark": "到达南昌市处理中心（经转）【南昌市】",
//             },
//             {
//                 "datetime": "2016-06-18 07:40:00",
//                 "remark": "离开南昌市 发往毕节地区（经转）【南昌市】",
//             },
//             {
//                 "datetime": "2016-06-18 09:59:00",
//                 "remark": "离开南昌市 发往下一城市（经转）【南昌市】",
//             },
//             {
//                 "datetime": "2016-06-18 12:01:00",
//                 "remark": "到达  北京市 处理中心【北京地区】",
//             },
//             {
//                 "datetime": "2016-06-20 17:55:00",
//                 "remark": "投递并签收，签收人：单位收发章 *【毕节地区】",
//             }
//         ]
//     },
//     "error_code": 0
// }])

/**
 * 第一个参数为modelname， 集合名的映射
 */
const distribution = new mongoose.model('distributions', disSchema);

module.exports = distribution;