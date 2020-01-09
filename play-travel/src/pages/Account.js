import React, { Component } from 'react';

import { Icon, message } from 'antd';

import '../scss/mine.scss';

class Account extends Component {
    state = {
        phone: ''
    };
    toEdit = () => {
        this.props.history.push('/set-pass');
    };
    componentDidMount() {
        if (localStorage.getItem("TOKEN")) {
            let phone = JSON.parse(localStorage.getItem("TOKEN")).account;
            phone = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
            this.setState({ phone });
        } else
            this.props.history.push('/login-phone');
    }
    render() {
        let { phone } = this.state;
        return (<div className="account">
            <h1>我的账号</h1>
            <main className="">
                <section className="list-row">
                    <div className="acc-icon"><span className="icon iconfont">&#xe6c2;</span></div>
                    <div className="row-con">
                        <p className="p1">手机号</p>
                        <p className="p2">{phone}</p>
                    </div>
                    <div className="item-edit">
                        <span>修改</span>
                        <Icon type="right" />
                    </div>
                </section>
                <section className="list-row">
                    <div className="acc-icon"><span className="icon iconfont">&#xe628;</span></div>
                    <div className="row-con">
                        <p className="p1">邮箱</p>
                        <p className="p2">绑定邮箱,可使用邮箱密码登录</p>
                    </div>
                    <div className="item-edit">
                        <span>关联</span>
                        <Icon type="right" />
                    </div>
                </section>
                <section className="list-row">
                    <div className="acc-icon"><span className="icon iconfont">&#xe640;</span></div>
                    <div className="row-con">
                        <p className="p1">账号密码</p>
                        <p className="p2">***********</p>
                    </div>
                    <div className="item-edit" onClick={this.toEdit}>
                        <span>修改</span>
                        <Icon type="right" />
                    </div>
                </section>
            </main>
        </div>)
    }
};

export default Account;