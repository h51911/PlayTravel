// * 利用生成器函数实现业务逻辑
// * redux-saga在执行生成器函数时自动执行next()

// import { call, apply, put, takeEvery, takeLatest } from 'redux-saga/effects';
// import { message } from 'antd';

// import Api from '../../api';

// function* getStock({ payload }) {
//     let { datas } = yield call(Api.get, {
//         act: 'goods',
//         op: 'goods_detail',
//         goods_id: payload.goods_id
//     });
//     // console.log(payload.goods_qty, datas.goods_info.goods_storage)
//     if (payload.goods_qty > datas.goods_info.goods_storage) {
//         payload.goods_qty = datas.goods_info.goods_storage;
//         message.error('库存不足');
//     }
//     yield put({
//         type: 'CHANGE_QTY',
//         payload
//     })
// }

// function* rootSaga() {
//     // console.log('rootSaga')
//     // 监听用户指令
//     // yield takeEvery("CHANGE_QTY_ASYNC", getStock);
//     yield takeLatest("CHANGE_QTY_ASYNC", getStock);//防抖
// }

// export default rootSaga;
