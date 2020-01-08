import React, { Component } from 'react';
import '../scss/Orderdetail.css'

class Orderdetail extends Component {


    render() {
        console.log(this.props)
        return (
            <div className="orderdetail">
                <div className="container">
                    <div className="detail_top">
                        <h2>新加坡S.E.A.海洋馆电子门票（电子票扫码入园）</h2>
                        <p className='order_id'>订单号:1346013</p>
                        <p className='order_date'>订单日期: 2020-01-08 14:05:00</p>
                        <div className="pay_process ">
                            <p className="pay_state clearfix">
                                <span className='payment fl'>未支付</span>
                                <span className='payment_limit fr'>请在2020-01-08 23:59:59前支付</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )


    }
}

export default Orderdetail