/**
 * Token的生成与校验
 * @param {String} data         加密数据
 * @param {Number} expiresIn    有效期（单位:s）
 */
const jwt = require('jsonwebtoken');


let secret = 'admin'; //私钥

function create(data, expiresIn) { //生成token
    let token = jwt.sign({
        data
    }, secret, {
        expiresIn
    });
    // console.log(token);
    return token;
}
// create(123, 60)

function verify(token) {
    let res;
    try {
        let result = jwt.verify(token, secret);
        // console.log('token校验：', result)
        res = true;
    } catch (err) {
        res = false;
    }
    return res;
}
// verify(create(123))

module.exports = {
    create,
    verify
}