//开启服务器

const express = require('express');
const {
    PORT
} = require('./backend/config.json'); //导入文件模块
let Routers = require('./backend/router'); //导入总路由中间件，默认index

let app = express();
app.use(express.static('./')); //开启静态资源服务器
app.use(Routers);
app.listen(PORT, () => {
    console.log('服务器已开启，请访问：http://localhost:%s', PORT);
});