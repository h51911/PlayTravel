const express = require('express');//模块访问：缓存
let { formatData } = require('../utils/formatData');//自定义模块


const Router = express.Router();

let { mongo } = require('../db');//引入操作数据库的模块


//查询
Router.get('/', async (req, res) => {
    let result = await mongo.find('lists', req.query);//调用封装好的find方法，查询数据并返回给前端 [{},{},{}]
    // console.log( req.query);
    if (result.length) {
        //成功
        res.send(formatData({ data: result }));
    } else {
        //失败
        res.send(formatData({ code: 0 }));
    }

});

//添加订单
Router.get('/addGood',async (req,res)=>{
    console.log(req.query);
    let result = await mongo.create('order',[req.query])
    if (result.insertedCount) {
        //成功
        res.send(formatData());
    } else {
        //失败
        res.send(formatData({ code: 0 }));
    }
});

//新增旅游项目
Router.get('/addPro',(req,res)=>{
    // let {product_id,cn_name,alias,min_price,from_date,to_date} = req.query;
    res.send(88)
    // let digi = {};
    // digi.product_id = product_id;
    // digi.alias = alias;
    // digi.min_price = min_price;
    // digi.from_date = from_date;
    // digi.to_date = to_date;
    // let res1 = await mongo.find('lists',cn_name);
    // if(res1.length){
    //     let {products}= res1;
    //     if(Array.isArray(products)){
    //         products.push(digi);
    //     }else{
    //         let products=[];
    //         products.push(digi);
    //     }
        
    //     let res3 = await mongo.update('lists',{cn_name},{$set:{products}})
    //     if(res3.modifiedCount){
    //       //成功
    //       res.send(formatData());
    //     } else {
    //         //失败
    //         res.send(formatData({ code: 0 }));
    //     }
    // }else{
    //     let digiarr = [];
    //     digiarr.push(digi);
    //     let res2 = await mongo.create('lists',[cn_name,digiarr])
    //     if(res2.insertedCount){
    //         //成功
    //         res.send(formatData());
    //     } else {
    //         //失败
    //         res.send(formatData({ code: 0 }));
    //     }
    // }
})






module.exports = Router;