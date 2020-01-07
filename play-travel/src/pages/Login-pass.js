import React, { Component } from 'react';

import { Input, Icon, message } from 'antd';

import '../scss/login.scss';

class LoginPass extends Component {
    state = {
        accout: '',
        password: '',
        isReg: false,
        focus0: false,
        focus1: false
    };
    // 输入用户名和密码
    inputAccout = (ev) => { this.setState({ accout: ev.target.value }); };
    inputPass = (ev) => { this.setState({ password: ev.target.value }); };
    // 获取焦点
    focus0 = () => {
        this.accout.focus();
        this.setState({ focus0: true });
    };
    focus1 = () => {
        this.pass.focus();
        this.setState({ focus1: true });
    };
    // 失去焦点
    blur0 = () => { this.setState({ focus0: false }); };
    blur1 = () => { this.setState({ focus1: false }); };
    // 获取验证码
    getPassword = () => {
        console.log('获取验证码');
    };
    // 通过手机登录
    byPhone = () => { this.props.history.push('/login-phone'); };
    // 密码登录
    toLogin = () => {
        if (/^1[3-9]\d{9}$/.test(this.state.accout)) {
            if (/^\d{6,}$/.test(this.state.password)) {
                message.success('通过');
                localStorage.setItem('TOKEN', `{"account":"${this.state.accout}","isLogin":"true"}`);
                this.props.history.push('/discover');
            } else {
                message.info('请输入至少六位密码');
            }
        }
        else
            message.info('请输入正确的手机号');
    };
    componentDidUpdate(prevProps, prevState) {
        // 登录按钮的颜色
        if (/^\d{11}$/.test(this.state.accout) && /^\d{6,}$/.test(this.state.password)) {
            if (this.state.isReg !== true)
                this.setState({ isReg: true });
        }
        else {
            if (this.state.isReg !== false)
                this.setState({ isReg: false });
        }
    }
    render() {
        let { accout, password, isReg, focus0, focus1 } = this.state;
        return <div className="page-login">
            <header className="login-header">
                <div className="link"><Icon type="left" /></div>
                <h1 className="h1">帐号密码登录</h1>
            </header>
            <main>
                <div className="login-info">
                    <div className="text-field" >
                        <label className="label" onClick={this.focus0}>
                            <p className={accout || focus0 ? 'text float' : 'text'}>邮箱/手机号</p>
                            <Input type="text"
                                maxLength={11}
                                allowClear
                                value={accout}
                                ref={ele => this.accout = ele}
                                onChange={this.inputAccout}
                                onBlur={this.blur0} />
                        </label>
                    </div>
                    <div className="text-field">
                        <label className="label" onClick={this.focus1} >
                            <p className={password || focus1 ? 'text float' : 'text'}>密码</p>
                            <Input.Password
                                maxLength={16}
                                allowClear
                                value={password}
                                ref={ele => this.pass = ele}
                                onChange={this.inputPass}
                                onBlur={this.blur1} />
                        </label>
                    </div>
                </div>
                <p className="p2">
                    <span className="login-type" onClick={this.byPhone}>手机快捷登录</span>
                    <span className={isReg ? 'login-btn active' : 'login-btn'} onClick={this.toLogin}>登录</span>
                </p>
                <p className="forget">忘记密码？</p>
            </main>
        </div>
    }
}

export default LoginPass;