const express = require('express');//模块访问：缓存
let { formatData } = require('../utils/formatData');//自定义模块


const Router = express.Router();

let { mongo } = require('../db');//引入操作数据库的模块


//查询所有用户 /users进入这里
Router.get('/', async (req, res) => {
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
