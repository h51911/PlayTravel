/*
    - 连接mongoDB
    - 进行数据的处理：find() update() remove() creat()
    - 关闭数据库 :close()
*/

const {
    MongoClient
} = require('mongodb'); //引入第三方模块
const {
    MongoUrl,
    ColName
} = require('../config.json');


/**
 * @description: 1.连接数据库
 * @return: object {数据库，连接}
 */
async function connect() {
    let client = await MongoClient.connect(MongoUrl, {
        useUnifiedTopology: true
    }); //不写回调，返回promise对象
    let db = client.db(ColName);
    return {
        db,
        client
    };
}

//1.连接数据库
//2.找到集合
//3.插入数据到集合
//4.关闭数据库
//5.返回结果

/**
 * @description: 增
 * @param {string} 集合名字 colname
 * @param {array} 数组      data
 * @return: object
 */

 //插入
async function create(colname, data) {
    // console.log(data);
    let {
        db,
        client
    } = await connect();
    let col = db.collection(colname); //无自建
    let result = await col.insertMany(data);
    client.close();
    return result;
}
// create('Administrator', [{
//     name: 'root',
//     psw: 'root'
// }]);

/**
 * @description: 删 
 * @param {string} 集合名字 colname
 * @param {object} 条件     query
 * @return: object
 */
async function remove(colname, query) {
    let {
        db,
        client
    } = await connect();
    let col = db.collection(colname);
    let result = await col.deleteMany(query);
    client.close();
    return result;
}
// remove('Administrator', {
//     name: 'root'
// });


/**
 * @description: 改
 * @param {string} 集合名字 colname
 * @param {object} 条件     query
 * @param {object} 数据     newdata
 * @return: object
 */

async function update(colname, query, newdata) {
    // console.log('a', query, newdata)
    let {
        db,
        client
    } = await connect();
    let col = db.collection(colname);
    let result = await col.updateMany(query, {
        $set: newdata
    });
    client.close();
    return result;
}

//测试接口
// update('Administrator', {
//     name: 'admin'
// }, {
//     $set: {
//         psw: '123456'
//     }
// });


/**
 * @description: 查
 * @param {string} 集合名字 colname
 * @param {object} 条件     query
 * @return: object
 */

 //排序
 //paixu：为排序的属性，例：{id：1/-1}
async function paixu(colname, qurey, paixu) {
    // console.log(paixu);
    try {
        let {
            db,
            client
        } = await connect();
        let col = db.collection(colname);
        let result = await col.find(qurey).sort(paixu).toArray();
        // console.log(result)
        client.close();
        return result;
    } catch {
        return err;
    };
}

//查找功能 find()
async function find(colname, qurey) {
    try {
        let {
            db,
            client
        } = await connect();
        let col = db.collection(colname);
        let result = await col.find(qurey).toArray();
        // console.log(result)
        client.close();
        return result;
    } catch {
        return err;
    }
}

//分页查询，findnum
//index：数据初始下标
//num：每页的数据数
async function findnum(colname, qurey, index, num) {
    try {
        let {
            db,
            client
        } = await connect();

        let col = db.collection(colname);

        let result = await col.find(qurey).skip(index).limit(num).toArray();

        client.close();
        // console.log(result);
        return result;
    } catch (err) {
        // Console.log(err);
    }
}

//模糊查询
async function mohu(colname, qurey) {
    let { title } = qurey;
    console.log(title)
    try {
        let {
            db,
            client
        } = await connect();
        let col = db.collection(colname);
        let name = new RegExp(title);
        let result = await col.find({title:name}).limit(10).toArray();
        console.log(name)
        console.log(result)
        client.close();
        return result;
    } catch {
        return err;
    }
}
// async function findlist(colname, qurey) {
//     try {
//         let {
//             db,
//             client
//         } = await connect();
//         let col = db.collection(colname);
//         let result = await col.find(qurey).limit(4).toArray();
//         // console.log(result)
//         client.close();
//         return result;
//     } catch {
//         return err;
//     }
// }
// find('Administrator', {
//     name: "admin",
//     psw: "123"
// });

module.exports = {
    create,
    remove,
    update,
    find,
    findnum,
    paixu,
    mohu
    // findlist
};