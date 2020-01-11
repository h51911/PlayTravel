import React, { Component } from 'react';
import '../scss/Orderlist.css';
import '../icon/iconfont.css';
import { get } from '../api/myweb';




class Order extends Component {
    // console.log(this)
    state = {
        currentIdx: 0,
        data: [],
        deletebutton: false,
        navlist: ['全部订单', '待付款', '处理中', '已确认', '已退订'],
        datalist: [
            {
                order_id: "1346859",
                product_name: "【亲子玩乐】昆山裕元花园酒店（含早+欢迎水果，部分套餐可选蒙特利亲子乐园/自助晚餐）",
                total: "969.00",
                date_added: "2020-01-09 14:40:01",
                status_id: "7",
                status_name: "订单取消",
                product_id: "15332",
                pay_time_limit: "2020-01-09 15:10:01",

                tour_date: "2020-01-11",
                man_num: '2',
                man_name: "王雨辰",
                man_phone: "17722737541",
                man_email: "1461875470@qq.com",
                user: "王雨辰"
            }, {
                order_id: "1346869",
                product_name: "【亲子玩乐】昆山裕元花园酒店（含早+欢迎水果，部分套餐可选蒙特利亲子乐园/自助晚餐）",
                total: "969.00",
                date_added: "2020-01-09 14:40:01",
                status_id: "1",
                status_name: "未支付",
                product_id: "15332",
                pay_time_limit: "2020-01-09 15:10:01",

                tour_date: "2020-01-11",
                man_num: '2',
                man_name: "王雨辰",
                man_phone: "17722737541",
                man_email: "1461875470@qq.com",
                user: "王雨辰"
            },
            {
                order_id: "1346880",
                product_name: "【亲子玩乐】昆山裕元花园酒店（含早+欢迎水果，部分套餐可选蒙特利亲子乐园/自助晚餐）",
                total: "969.00",
                date_added: "2020-01-09 14:40:01",
                status_id: "1",
                status_name: "未支付",
                product_id: "15332",
                pay_time_limit: "2020-01-09 15:10:01",
                tour_date: "2020-01-11",
                man_num: '2',
                man_name: "王雨辰",
                man_phone: "17722737541",
                man_email: "1461875470@qq.com",
                user: "王雨辰"

            }

        ]
    }

    changeNav = (idx) => {
        if (idx === 0) {
            this.setState({
                data: this.state.datalist.length ? this.state.datalist : ""
            })
        } else if (idx === 1) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '1') : ''
            })
        } else if (idx === 2) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '2') : ''
            })
        } else if (idx === 3) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '3') : ''
            })
        } else if (idx === 4) {
            this.setState({
                data: this.state.datalist.filter(item => item.status_id === '1').length ? this.state.datalist.filter(item => item.status_id === '4') : ''
            })
        }


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


    getdata = async () => {
        let { data } = await get('/order')

        if (data) {
            data.sort((a, b) => {
                a = a.status_id * 1
                b = b.status_id * 1
                return a - b
            })
            this.setState({
                datalist: data,
                data
            })
        } else {
            this.setState({
                datalist: [],
                data: [],
            })
        }


    }

    confirmDelete = async (id) => {
        let data = await get('/order/deleteorder', {
            'order_id': id
        })
        console.log(666)
        if (data.code) {
            this.setState({
                deletebutton: false
            })
            this.getdata()
            console.log(888)
        }

    }

    // componentDidUpdate() {
    //     this.getdata()
    // }



    componentDidMount() {
        this.getdata()
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    getDetail = (id) => {
        this.props.history.push(`/order/${id}`)
    }

    gotoPay = (event) => {
        event.stopPropagation()
        console.log('去付款')
    }

    cancelOrder = async (id, event) => {

        console.log(id, event)
        event.stopPropagation()
        let result = window.confirm('确定要取消此订单么');
        if (result) {
            console.log(666)
            let result = await get('/order/cancelorder', { 'order_id': id })
            console.log(result)
            if (result.code) {
                this.getdata()
                window.alert('订单已取消')
            }

        }
    }




    render() {
        let { navlist, currentIdx, data } = this.state
        return < div className="order_list" >
            <div className="order_nav">
                <h2>我的订单</h2>
                <ul className="nav_item">
                    {navlist.map((item, index) => {
                        return <li className={index === currentIdx ? "active" : ""} key={item} onClick={this.changeNav.bind(this, index)}><span>{item}</span></li>
                    })}
                </ul>
            </div>
            {
                data.length ?
                    <div className="order_item">
                        {data.map((item) => {
                            return <div
                                className={item.status_id !== "1" ? "single_item single_item_overdue " : "single_item"}
                                key={item.order_id}
                                onClick={item.status_id === '1' ? this.getDetail.bind(this, item.order_id) : () => { }}

                            >
                                <div className="item_top">
                                    <p className="clearfix first_line ">
                                        <span className="item_status">{item.status_name}</span>
                                        <span className="item_price">￥{(item.total * item.man_num).toFixed(2)}</span>
                                    </p>
                                    <p className="second_line clearfix">
                                        <span className='order_num fl'>订单号:{item.order_id}</span>
                                        <span className="pay_limit fr">请在{item.pay_time_limit.slice(10, 16)}前支付</span>
                                    </p>
                                </div>
                                <div className="item_center">
                                    <p className="item_title">{item.product_name}</p>
                                    <p className="item_time">出行日期:{item.tour_date}</p>
                                    <p className="item_mount">购买数量:套餐份数×{item.man_num}</p>

                                </div>
                                <div className="item_footer">
                                    <span className="cancel_order" onClick={this.cancelOrder.bind(this, item.order_id)}>取消订单</span>
                                    <span className="to_pay" onClick={this.gotoPay}>去支付</span>
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
                        })}
                    </div> : <div className="noorder"><span className="iconfont icon-zanwuxiangguandingdan icon"></span>
                        <p>暂未找到相关订单</p></div>

            }
        </div>
    }
}

export default Order