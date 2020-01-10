// commonJS模块规范的js配置
module.exports = {
    presets:['@babel/preset-react'],
    plugins:[
        '@babel/plugin-syntax-dynamic-import',
        ['import',{
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css" // `style: true` 会加载 less 文件
            }]
    ]
}