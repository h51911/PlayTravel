import React, { Component } from 'react';
import '../scss/Orderlist.css';


class Order extends Component {
    // console.log(this)
    state = {
        currentIdx: 0,
        deletebutton: false,
        navlist: ['全部订单', '待付款', '处理中', '已确认', '已退订'],
        datalist: [
            {
                order_id: "1345049",
                product_name: "湖州慧心谷绿奢度假村（含早+酒店活动）",
                total: "949.00",
                date_added: "2020-01-07 11:14:51",
                status_id: "1",
                status_name: "未支付",
                product_id: "15875",
                payment_time_limit: "2020-01-07 11:44:51",
                tour_date: "2020-01-15",

            },
            {
                order_id: "1344410",
                product_name: "【3天2晚】厦门海悦山庄酒店（含早+下午茶+儿童乐园+观光车店内游+亲子房布置）",
                total: "1698.00",
                date_added: "2020-01-06 16:07:15",
                status_id: "25",
                status_name: "已过支付有效期",
                product_id: "14443",
                payment_time_limit: "2020-01-06 16:37:15",
                tour_date: "2020-01-08",

            },
            {
                order_id: "1344420",
                product_name: "【3天2晚】厦门海悦山庄酒店（含早+下午茶+儿童乐园+观光车店内游+亲子房布置）",
                total: "1698.00",
                date_added: "2020-01-06 16:07:15",
                status_id: "25",
                status_name: "已过支付有效期",
                product_id: "14443",
                payment_time_limit: "2020-01-06 16:37:15",
                tour_date: "2020-01-08",
            }
        ],

    }

    changeNav = (idx) => {
        this.setState({
            currentIdx: idx,
        })
    }
    deleteItem = (id) => {
        this.setState({
            deletebutton: true
        })
    }
    cancelDelete = () => {
        this.setState({
            deletebutton: false
        })
    }
    confirmDelete = (id) => {
        let datalist = this.state.datalist.filter(item => item.order_id !== id)
        this.setState({
            datalist,
            deletebutton: false
        })
    }

    // getDetail = (id) => {
    //     this.props.history.push(`/order/${id}`)
    // }


    render() {
        let { navlist, currentIdx, datalist } = this.state
        return < div className="order_list" >
            <div className="order_nav">
                <h2>我的订单</h2>
                <ul className="nav_item">
                    {navlist.map((item, index) => {
                        return <li className={index === currentIdx ? "active" : ""} key={item} onClick={this.changeNav.bind(this, index)}><span>{item}</span></li>
                    })}
                </ul>
            </div>
            <div className="order_item">
                {/* {console.log(currentIdx)} */}
                {datalist.map((item) => {
                    if (currentIdx === 0) {
                        return <div
                            className={item.status_id === '25' ? "single_item_overdue single_item" : "single_item"}
                            key={item.order_id}
                        // onClick={this.getDetail.bind(this, item.order_id)}
                        >
                            <div className="item_top">
                                <p className="clearfix first_line ">
                                    <span className="item_status">{item.status_name}</span>
                                    <span className="item_price">￥{item.total}</span>
                                </p>
                                <p className="second_line clearfix">
                                    <span className='order_num fl'>订单号:{item.order_id}</span>
                                    <span className="pay_limit fr">请在{item.payment_time_limit.slice(10, 16)}前支付</span>
                                </p>
                            </div>
                            <div className="item_center">
                                <p className="item_title">{item.product_name}</p>
                                <p className="item_time">出行日期:{item.tour_date}</p>
                                <p className="item_mount">购买数量:套餐份数×1</p>

                            </div>
                            <div className="item_footer">
                                <span className="cancel_order">取消订单</span>
                                <span className="to_pay">去支付</span>
                                <p className="item_delete" onClick={this.deleteItem}><span className='iconfont icon-shanchu' ></span>删除订单</p>
                            </div>
                            <div className="deletepopup" style={{ display: this.state.deletebutton ? "block" : 'none' }}>
                                <div className="delete_mes">
                                    <h5 className="delete_title">删除订单</h5>
                                    <p className="delete_content">确定删除订单吗？删除后订单将不可恢复</p>
                                    <div className='delete_button'><span className="canceldelete" onClick={this.cancelDelete}>取消</span><span className="confirmdelete" onClick={this.confirmDelete.bind(this, item.order_id)}>删除</span></div>
                                </div>
                            </div>

                        </div>
                    }
                    else if (currentIdx === 1) {
                        if (item.status_id === '1') {
                            return <div className={item.status_id === '25' ? "single_item_overdue single_item" : "single_item"} key={item.order_id}>
                                <div className="item_top">
                                    <p className="clearfix first_line ">
                                        <span className="item_status">{item.status_name}</span>
                                        <span className="item_price">￥{item.total}</span>
                                    </p>
                                    <p className="second_line clearfix">
                                        <span className='order_num fl'>订单号:{item.order_id}</span>
                                        <span className="pay_limit fr">请在{item.payment_time_limit.slice(10, 16)}前支付</span>
                                    </p>
                                </div>
                                <div className="item_center">
                                    <p className="item_title">{item.product_name}</p>
                                    <p className="item_time">出行日期:{item.tour_date}</p>
                                    <p className="item_mount">购买数量:套餐份数×1</p>
                                    <p></p>
                                </div>
                                <div className="item_footer">
                                    <span className="cancel_order">取消订单</span>
                                    <span className="to_pay">去支付</span>
                                    <p className="item_delete" onClick={this.deleteItem.bind(this, item.order_id)}><span className='iconfont icon-shanchu'></span>删除订单</p>
                                </div>
                            </div>
                        }
                    }
                })}
            </div>
        </div >
    }
}

export default Order