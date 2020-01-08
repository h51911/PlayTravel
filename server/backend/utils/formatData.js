/*  
    数据处理模块
    提示信息格式化处理：
    {
        code ：0/1  =>  失败/成功,
        mes : 'fail/success',
        data : [{},{}]
    }
*/

function formatData(opt) {
    let defaultData = {
        code: 1,
        msg: 'success'
    }

    //替补方案
    if (opt) {
        Object.assign(defaultData, opt);
        if (opt.code == 0) {
            defaultData.msg = 'fail'
        }
    }
    // console.log(defaultData);
    return defaultData;
}

// formatdata(); //默认值,成功
// formatdata({ code: 0 });//失败的
// formatdata({ data: [1, 2, 3] });//成功并且有数据返回

module.exports = {
    formatData
}