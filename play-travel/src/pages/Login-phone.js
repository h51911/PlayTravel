import React, { Component } from 'react';

import { Input, Icon } from 'antd';

import '../scss/login.scss';

// @connect(mapStateToProps, mapDispatchToProps)
class LoginPhone extends Component {
    state = {
        phone: '',
        code: '',
        isReg: false,
        focus0: false,
        focus1: false
    };
    inputPhone = (ev) => { this.setState({ phone: ev.target.value }); };
    inputPass = (ev) => { this.setState({ code: ev.target.value }); };
    focus0 = () => {
        this.phone.focus();
        this.setState({ focus0: true });
    };
    focus1 = () => {
        this.pass.focus();
        this.setState({ focus1: true });
    };
    blur0 = () => { this.setState({ focus0: false }); };
    blur1 = () => { this.setState({ focus1: false }); };
    getCode = () => {
        console.log('获取验证码');
    }
    toLogin = () => {
        if (/^1[3-9]\d{9}$/.test(this.state.phone)) {
            console.log('手机号通过');
            if (/^\d{6}$/.test(this.state.code)) {
                console.log('验证码通过');
            } else {
                console.log('请输入六位验证码');
            }
        }
        else
            console.log('请输入正确的手机号');
    };
    componentDidUpdate(prevProps, prevState) {
        if (/^\d{11}$/.test(this.state.phone) && /^\d{6}$/.test(this.state.code)) {
            if (this.state.isReg !== true)
                this.setState({ isReg: true });
        }
        else {
            if (this.state.isReg !== false)
                this.setState({ isReg: false });
        }
    }
    render() {
        let { phone, code, isReg, focus0, focus1 } = this.state;
        return <div className="page-login">
            <header className="login-header">
                <Icon type="left" className="link" />
                <h1 className="h1">手机号快捷登录</h1>
            </header>
            <main className="login-info">
                <div className="text-field" >
                    <label className="label" onClick={this.focus0}>
                        <p className={phone || focus0 ? 'text float' : 'text'}>手机号</p>
                        <Input type="text"
                            maxLength={11}
                            allowClear
                            value={phone}
                            ref={ele => this.phone = ele}
                            onChange={this.inputPhone}
                            onBlur={this.blur0} />
                    </label>
                </div>
                <div className="text-field">
                    <label className="label pass" onClick={this.focus1} >
                        <p className={code || focus1 ? 'text float' : 'text'}>手机验证码</p>
                        <Input type="text"
                            maxLength={6}
                            allowClear
                            value={code}
                            ref={ele => this.pass = ele}
                            onChange={this.inputPass}
                            onBlur={this.blur1} />
                    </label>
                    <div className="verify-code" onClick={getCode}>获取验证码</div>
                </div>
                <p className="tips">未注册过的手机号将自动创建为玩途旅行账户</p>
                <p className="p2">
                    <span className="login-type">账号密码登录</span>
                    <span className={isReg ? 'login-btn active' : 'login-btn'} onClick={this.toLogin}>登录</span>
                </p>
            </main>

        </div>
    }
}

export default LoginPhone;