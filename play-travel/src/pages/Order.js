import React, { Component } from 'react';
import '../scss/Orderlist.css';


class Order extends Component {
    render() {
        return <div className="order_list">
            <div className="order_nav">
                <h2>我的订单</h2>
                <ul className="nav_item">
                    <li className="active"><span>全部订单</span></li>
                    <li><span>待付款</span></li>
                    <li><span>处理中</span></li>
                    <li><span>已确认</span></li>
                    <li><span>已退订</span></li>
                </ul>
            </div>
            <div className="order_item">
                <div className="single_item">
                    <div className="item_top">
                        <p className="clearfix first_line ">
                            <span className="item_status">未支付</span>
                            <span className="item_price">￥1698</span>
                        </p>
                        <p className="second_line clearfix">
                            <span className='order_num fl'>订单号:1344410</span>
                            <span className="pay_limit fr">请在16:37前支付</span>
                        </p>
                    </div>
                    <div className="item_center">
                        <p className="item_title">【3天2晚】厦门海悦山庄酒店（含早+下午茶+儿童乐园+观光车店内游+亲子房布置）</p>
                        <p className="item_time">出行日期:2020-01-16</p>
                        <p className="item_mount">购买数量:套餐份数×1</p>
                        <p></p>
                    </div>

                    <div className="item_footer">
                        <span className="cancel_order">取消订单</span>
                        <span className="to_pay">去支付</span>
                    </div>
                </div>

            </div>
        </div>

    }
}

export default Order