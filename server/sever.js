//开启服务器

const express = require('express');
const {
    PORT
} = require('./backend/config.json'); //导入文件模块
let Routers = require('./backend/router'); //导入总路由中间件，默认index



let app = express();
app.use((req, res, next) => {
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
app.use(express.static('./')); //开启静态资源服务器
app.use(Routers);
app.listen(PORT, () => {
    console.log('服务器已开启，请访问：http://localhost:%s', PORT);
});