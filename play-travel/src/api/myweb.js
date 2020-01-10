import axios from 'axios';
import Qs from 'qs';

const My = axios.create({
    // baseURL: 'http://localhost:8087'
    baseURL: 'http://10.3.140.156:8087'
});

export const get = async (url, params, config = {}) => {
    let {
        data
    } = await My.get(url, {
        ...config,
        params
    })

    return data;
}
axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //配置请求头
export const post = async (url, query) => {
    return My.post(url, Qs.stringify(query));
}

export default {
    get,
    post
}