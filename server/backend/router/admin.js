/* 
 * 管理员登录
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

//验证用户名是否存在 /admin/check
Router.route('/check').get(async (req, res) => {
    let result = await mongo.find('Administrator', req.query);
    if (result.length)
        //找到
        res.send(formatData({
            code: 0,
            message: "该账号已注册"
        }));
    else
        res.send(formatData({
            message: "该账号未注册"
        }));
});

//管理员登陆 /admin/login
Router.route('/login').post(async (req, res) => {
    let {
        name,
        psw,
        keep
    } = req.body;
    let result = await mongo.find('Administrator', {
        name,
        psw
    });
    // console.log(result);
    if (result.length) {
        let token = '';
        if (keep) {
            //生成token
            token = create(name, 604800);
        }
        res.send(formatData({
            authorization: token
        }));
    } else
        res.send(formatData({
            code: 0
        }));
});
// name: admin, psw: 123456

// 验证token
Router.post('/verify', (req, res) => {
    let {
        token
    } = req.body;
    // console.log(token);
    let result = verify(token);
    // console.log(result);//校验是否通行
    if (result) //可以直接登陆
        res.send(formatData());
    else
        res.send(formatData({
            code: 0
        }))
});

module.exports = Router;