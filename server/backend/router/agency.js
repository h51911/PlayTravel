const express = require('express');
const proxy = require('http-proxy-middleware');
const Router = express.Router(); //路由

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

Router.use('/', proxy({

    "target": "http://www.wantu.cn", //你要代理的网址
    "changeOrigin": true,
    // "pathRewrite": { //重写路径
    //     "^/itinerary": "/"
    // }
}));
module.exports = Router;