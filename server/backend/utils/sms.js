const Core = require('@alicloud/pop-core');

// n位随机数，输出res为字符串
function randNum(n) {
    let res = '';
    for (let i = 0; i < n; i++) {
        res += String(parseInt(Math.random() * 10));
    }
    return res;
};
// let sendCode = randNum(6);

// 发送验证码
async function sms(phone, code) {
    var client = new Core({
        accessKeyId: '',
        accessKeySecret: '',
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });

    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": phone, //要发送的用户手机号
        "SignName": "玩途旅行", //APP名称
        "TemplateCode": "SMS_177553456", //短信模板ID
        "TemplateParam": `{'code':'${code}'}`
    }

    var requestOption = {
        method: 'POST'
    };

    try {
        let result = await client.request('SendSms', params, requestOption);
        return result;
    } catch (err) {
        return err;
    }


    //   .then((result) => {
    //         // if (result.Code === "OK")
    //         return result.Code;
    // console.log(JSON.stringify(result));
    // {"Message":"OK","RequestId":"05627179-8D9F-467C-B42C-5B77BD547D05","BizId":"522006376672446518^0","Code":"OK"}

    // data: {
    // Message: '触发分钟级流控Permits:1',
    // RequestId: '3E908AE8-CCFD-48D4-9582-E18C727ACB69',
    // Code: 'isv.BUSINESS_LIMIT_CONTROL'
    //   }
    //     }, (ex) => {
    //         // console.log(ex);
    //         return "false";
    //     });
}

module.exports = {
    randNum,
    sms
};
