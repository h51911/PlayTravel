//总路由，RESTful接口规范

const express = require('express'); //模块访问：缓存
const Router = express.Router(); //自带的中间件，路由设置
Router.use(express.urlencoded({
    extended: true
})); //扩展，获取req.body

// 引入子路由
const homeRouter = require('./home');
const areaRouter = require('./area');
const agencyRouter = require('./agency');
const usersRouter = require('./users');
const adminRouter = require('./admin');
const listRouter = require('./list');
const orderRouter = require('./order');

// 调用子路由
// Router.use('/goods', goodsRouter);
Router.use('/home', homeRouter);
Router.use('/area', areaRouter);
Router.use('/public', agencyRouter);
Router.use('/users', usersRouter);
Router.use('/admin', adminRouter);
Router.use('/list', listRouter);
Router.use('/order', orderRouter);

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

// 导出模块
module.exports = Router;