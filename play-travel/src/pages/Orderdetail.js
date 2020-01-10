import React, { Component } from 'react';
import '../icon/iconfont.css'
import { get } from '../api/myweb'
import '../scss/Orderdetail.css'
import Item from 'antd/lib/list/Item';


class Orderdetail extends Component {
    state = {
        data: []
    }

    async componentDidMount() {
        let { id } = this.props.match.params
        let { data } = await get('/order', { 'order_id': id })
        this.setState({
            data,
        })
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        let data = this.state.data[0]
        console.log(data)
        if (data) {
            return (
                <div className="orderdetail">
                    <div className="container">
                        <div className="detail_top">
                            <h2>{data.product_name}</h2>
                            <p className='order_id'>订单号:{data.order_id}</p>
                            <p className='order_date'>订单日期:{data.date_added}</p>
                            <div className="pay_process ">
                                <p className="pay_state clearfix">
                                    <span className='payment fl'>{data.status_name}</span>
                                    <span className='payment_limit fr'>请在{data.payment_time_limit}前支付</span>
                                </p>

                                <ul className="pay_steps">
                                    <li className='steps_1'>
                                        <span className='iconfont icon-check2'></span>
                                        <p>下单</p>
                                    </li>
                                    <li className='steps_2'>
                                        <span className='iconfont icon-check2'></span>
                                        <p>付款</p>
                                    </li>
                                    <li className='steps_3'>
                                        <span className='iconfont icon-check2'></span>
                                        <p>预定处理中</p>
                                    </li>
                                    <li className='steps_4'>
                                        <span className='iconfont icon-check2'></span>
                                        <p>已出票/发货</p>
                                    </li>
                                    <div className='pay_line'></div>
                                </ul>
                            </div>
                            <button className="pay_button">去支付</button>
                        </div>
                        <div className="detail_content">
                            <div className="order_message">
                                <h2>订单信息</h2>
                                <div className="order_message_content">
                                    <span className='iconfont icon-icon-contract icon'></span>
                                    <h3>订单信息</h3>
                                    <p className='order_message_date'>日期:{Item.tour_date}</p>
                                    <p className="order_message_count">数量:成人×{data.man_num}</p>
                                    <p className="order_message_choice">套餐选择: 新加坡S.E.A海洋馆+海事博物馆（电子票）(S.E.A海洋馆成人票+海事博物馆1张)</p>
                                </div>

                                <div className="order_contact_message">
                                    <span className='iconfont icon-circle-people icon'></span>
                                    <h3>联系人信息</h3>
                                    <p className='order_message_name'>姓名 : {data.man_name}</p>
                                    <p className="order_message_phone">手机号 : {data.man_phone}</p>
                                    <p className="order_message_email">电子邮箱 :{data.man_email}</p>
                                </div>
                                <div className="order_contact_mainmessage">
                                    <span className='iconfont icon-circle-people icon'></span>
                                    <h3>主要出行人信息</h3>
                                    <p className='order_message_mainname'>中文姓名 : {data.man_name}</p>
                                    <p className="order_message_mainphone">手机号 :  {data.man_phone}</p>
                                    <p className="order_message_mainemail">电子邮箱 : {data.man_email}</p>
                                </div>
                            </div>
                            <div className="price_message">
                                <h2>价格明细</h2>
                                <div className="price_message_content">
                                    <span className='iconfont icon-biaodancaozuo-jiagemingxi icon'></span>
                                    <h3>价格明细</h3>
                                    <p className="price_detail_message clearfix">
                                        <span className='fl span_1'>成人</span>
                                        <span className="fr span_1">￥{data.total}×{data.man_num}</span>
                                    </p>
                                    <p className="price_pay_methods clearfix">
                                        <span className="fl span_2">支付方式</span>
                                        <span className="fr span_2">Paypal支付（WAP）</span>
                                    </p>
                                    <p className="price_all_total clearfix">
                                        <span className='fl span_3'>总额</span>
                                        <span className='fr span_4'>￥{(data.total * data.man_num).toFixed(2)}</span>
                                    </p>

                                </div>
                            </div>


                            <div className="use_message">

                                <h2>使用信息及退换</h2>
                                <div className="use_message_change">
                                    <span className="iconfont icon-biaodancaozuo-jiagemingxi icon"></span>
                                    <h3>退换政策</h3>
                                    <p className="not_allow_change">该商品下单后将不允许退订</p>
                                </div>
                                <div className="contact_phone">
                                    <span className="iconfont icon-biaodancaozuo-jiagemingxi icon"></span>
                                    <h3>联系电话</h3>
                                    <p className="local_phone">玩途当地电话:400-660-0010</p>
                                </div>
                            </div>
                            <div className="help_message">
                                <h2>需要帮助</h2>
                                <p className="need_help_title">如果你有任何疑问,随时联系玩途客服</p>
                                <div className="in_china_phone">
                                    <span className="iconfont icon-biaodancaozuo-jiagemingxi icon">
                                    </span>
                                    <p className="phone_content">
                                        国内 400-660-0010
                                    </p>
                                </div>
                                <div className="out_china_phone">
                                    <span className="iconfont icon-biaodancaozuo-jiagemingxi icon">
                                    </span>
                                    <p className="phone_content">
                                        国际 0086-21-61515220
                                    </p>
                                </div>
                            </div>

                            <button className="detail_cancel_order">取消订单</button>
                        </div>
                    </div>
                </div >
            )

        } else {
            return <></>
        }

    }
}
export default Orderdetail