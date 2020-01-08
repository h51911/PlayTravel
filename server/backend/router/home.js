/** 
 * 用户管理
 * 查询是否存在
 * 注册
 * 登陆
 * 修改密码
 * 查询所有用户
 */
const express = require('express'); //模块访问：缓存
const Router = express.Router(); //路由
const {
    formatData
} = require('../utils/formatData'); //数据处理模块
let {
    mongo
} = require('../db'); //引入操作数据库的模块
let {
    create,
    verify
} = require('../utils/token'); //生成token
let {
    sendCode,
    sms
} = require('../utils/sms'); //短信

// CORS请求头
Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") { //特殊请求：发送了请求头的那些请求
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
});

// 查询所有 /users
Router.route('/').get(async (req, res) => {
    // console.log(666);
    let result = await mongo.find('home', req.query);
    let result1 = await mongo.find('groups', req.query);
    let result2 = await mongo.find('block', req.query);
    let data = {
        bannerimg: result[0].banner_list,
        hots: result[1].hots,
        groups: result1,
        block: result2
    };
    if (result.length && result1.length && result2.length)
        res.send(formatData({
            data: data
        }));
    else
        res.send(formatData({
            code: 0
        }));
});

Router.get('/order', async (req, res) => {
    let result = await mongo.find('order', req.query);//调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
    // console.log( req.query);
    if (result.length) {
        //成功
        res.send(formatData({ data: result }));
    } else {
        //失败
        res.send(formatData({ code: 0 }));
    }

});
module.exports = Router;