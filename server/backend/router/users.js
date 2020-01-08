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
const { formatData } = require('../utils/formatData'); //数据处理模块
let { mongo } = require('../db'); //引入操作数据库的模块
let { create, verify } = require('../utils/token'); //生成token
let { randNum, sms } = require('../utils/sms'); //短信
let sendCode = null; //验证码

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
    let result = await mongo.find('users', req.query);
    if (result.length)
        res.send(formatData({
            data: result
        }));
    else
        res.send(formatData({
            code: 0
        }));
});

//注册 /users/reg
Router.route('/reg').post(async (req, res) => {
    let result = await mongo.create('users', [req.body]);
    if (result.insertedCount)
        res.send(formatData());
    else
        res.send(formatData({
            code: 0
        }));
});


//验证用户名是否存在 /users/check
Router.route('/check').get(async (req, res) => {
    let result = await mongo.find('users', req.query);
    if (result.length)
        //找到，不给注册
        res.send(formatData({
            code: 0
        }));
    else
        res.send(formatData({
            message: `inexistence`
        }));
});

// 删除 /del
Router.route('/del').post(async (req, res) => {
    let { phone } = req.body;
    let result = await mongo.remove('users', {
        phone
    });
    // console.log(result)
    if (result.deletedCount)
        res.send(formatData({
            message: `成功删除了${result.deletedCount}条数据`
        }));
    else
        res.send(formatData({
            code: 0
        }));
});

// 删除 /dels
Router.route('/dels').post(async (req, res) => {
    let { delarr } = req.body;
    let result = '';
    delarr.forEach(async item => {
        result = await mongo.remove('users', {
            _id: item
        });
    });
    if (result.insertedCount)
        res.send(formatData({
            message: `删除了${result.insertedCount}条数据`
        }));
    else
        res.send(formatData({
            code: 0
        }));
});

//验证原密码 users/pass
Router.route('/pass').post(async (req, res) => {
    let { phone, password } = req.body;
    let result = await mongo.find('users', { phone, password });
    if (result.length) {
        res.send(formatData({
            message: "原密码正确"
        }));
    } else
        res.send(formatData({ code: 0 }));
});

// 修改密码
Router.route('/edit').post(async (req, res) => {
    let { phone, password, email } = req.body;
    let result = await mongo.update('users', { phone }, { password, email });
    if (result.modifiedCount)
        res.send(formatData({
            message: "修改成功"
        }));
    else
        res.send(formatData({
            code: 0
        }));
});

// 发送验证码 users/code
Router.route('/code').post(async (req, res) => {
    let { phone } = req.body;
    sendCode = randNum(6);
    let result = await sms(phone, sendCode);
    // console.log(result, sendCode);
    if (result.Code == "OK") {
        res.send(formatData({
            message: "发送成功"
        }));
    } else
        res.send(formatData({
            code: 0,
            message: result.Message
        }));
});

// 验证码登录 users/verifycode
Router.route('/verifycode').post(async (req, res) => {
    let { phone, code } = req.body;
    let result = code == sendCode;
    // console.log(result);
    if (result) {
        let token = create(phone, 604800);
        res.send(formatData({
            authorization: token
        }));
    } else
        res.send(formatData({
            code: 0
        }));
});

//登陆 users/login
Router.route('/login').post(async (req, res) => {
    let { phone, password } = req.body;
    let result = await mongo.find('users', {
        phone,
        password
    });
    if (result.length) {
        let token = create(phone, 604800);
        res.send(formatData({ authorization: token }));
    } else
        res.send(formatData({ code: 0 }));
});

// 验证token
Router.post('/verify', (req, res) => {
    let { token } = req.body;
    let result = verify(token);
    // console.log(result);//校验是否通行
    if (result) //可以直接登陆
        res.send(formatData({ message: "Token有效" }));
    else
        res.send(formatData({ code: 0, message: "Token失效" }));
});

module.exports = Router;