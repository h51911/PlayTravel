const express = require('express');//模块访问：缓存
let { formatData } = require('../utils/formatData');//自定义模块


const Router = express.Router();

let { mongo } = require('../db');//引入操作数据库的模块


//查询订单
Router.get('/', async (req, res) => {
    // console.log(req)
    let result = await mongo.find('order', req.query);//调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
    console.log(result);
    if (result.length) {
        //成功
        res.send(formatData({ data: result }));
    } else {
        //失败
        res.send(formatData({ code: 0 }));
    }

});
//删除订单
Router.get('/deleteorder', async (req, res) => {
    let result = await mongo.remove('order', req.query);//调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
    // console.log( req.query);
    if (result.deletedCount) {
        res.send(formatData({
            message: `成功删除了${result.deletedCount}条数据`
        }));
    } else {
        //失败
        res.send(formatData({ code: 0 }));
    }

});


//取消订单
Router.get('/cancelorder', async (req, res) => {
    // let result = await mongo.update('order', req.query, { $set: { status_id: "7", status_name: '取消订单' } });//调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
    console.log(req.query);
    let result = await mongo.update('order', req.query, { status_id: "7", status_name: '订单取消' })
    console.log(result)

    if (result.modifiedCount) {
        res.send(formatData({ message: `成功修改了${result.deletedCount}条数据` }))
    } else {
        res.send(formatData({ code: 0 }))
    }

});

module.exports = Router;
