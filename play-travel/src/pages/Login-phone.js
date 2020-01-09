import React, { Component } from 'react';
import My from '../api/myweb';

import { Input, Icon, message } from 'antd';
import '../scss/login.scss';

// @connect(mapStateToProps, mapDispatchToProps)
class LoginPhone extends Component {
    state = {
        phone: '',
        code: '',
        isReg: false, //正则验证
        focus0: false,
        focus1: false,
        count: true,
        msg: "获取验证码"
    };
    inputPhone = (ev) => { this.setState({ phone: ev.target.value }); };
    inputCode = (ev) => { this.setState({ code: ev.target.value }); };
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
    goBack = () => { this.props.history.go(-1); };
    getCode = async () => {
        if (/^1[3-9]\d{9}$/.test(this.state.phone)) {
            if (this.state.count) {
                this.setState({ count: false });
                let count = 60;
                let timer = setInterval(() => {
                    this.setState({ msg: `重新获取(${count--}s)` });
                    if (count <= 0) {
                        this.setState({ count: true, msg: "重新获取" });
                        clearInterval(timer);
                    }
                }, 1000);
                let { data } = await My.post('/users/code', { phone: this.state.phone });
                if (data.code)
                    message.success(data.message);
                else
                    message.error("error：" + data.message);
            } else
                message.info("您的手速太快了，请稍后重试");
        } else
            message.error('请输入正确的手机号');
    }
    // 通过密码
    byPass = () => { this.props.history.push({ pathname: '/login-pass', query: this.props.location.query }) };
    toLogin = async () => {
        if (/^1[3-9]\d{9}$/.test(this.state.phone)) {
            if (/^\d{6}$/.test(this.state.code)) {
                // 验证码登录
                let { data } = await My.post('/users/verifycode', {
                    phone: this.state.phone,
                    code: this.state.code
                });
                // 检验是否注册
                let check = await My.get('/users/check', {
                    phone: this.state.phone
                });
                if (data.code) {
                    if (check.code) {
                        // 未注册，自动注册
                        let { data: reg } = await My.post('/users/reg', {
                            account: this.state.phone,
                            phone: this.state.phone,
                            password: this.state.code,
                            email: ' '
                        });
                        if (reg.code)
                            message.info("已自动注册，初始密码为初次登录时的验证码");
                        else
                            message.error("error：注册失败");
                    }
                    message.success('登录成功');
                    this.props.history.push(this.props.location.query.from || '/discover');
                    localStorage.setItem('TOKEN', JSON.stringify({
                        account: this.state.phone,
                        isLogin: true,
                        authorization: data.authorization
                    }));
                } else
                    message.error("验证码输入有误");
            } else
                message.error('请输入六位验证码');
        }
        else
            message.error('请输入正确的手机号');
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
        let { phone, code, isReg, focus0, focus1, msg } = this.state;
        return <div className="page-login">
            <header className="login-header">
                <div className="link" onClick={this.goBack}><Icon type="left" /></div>
                <h1 className="h1">手机号快捷登录</h1>
            </header>
            <main>
                <div className="login-info">
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
                        <label className="label code" onClick={this.focus1} >
                            <p className={code || focus1 ? 'text float' : 'text'}>手机验证码</p>
                            <Input type="text"
                                maxLength={6}
                                allowClear
                                value={code}
                                ref={ele => this.pass = ele}
                                onChange={this.inputCode}
                                onBlur={this.blur1} />
                        </label>
                        <div className="verify-code" onClick={this.getCode}>{msg}</div>
                    </div>
                </div>
                <p className="tips">未注册过的手机号将自动创建为玩途旅行账户</p>
                <p className="p2">
                    <span className="login-type" onClick={this.byPass}>账号密码登录</span>
                    <span className={isReg ? 'login-btn active' : 'login-btn'} onClick={this.toLogin}>登录</span>
                </p>
            </main>
        </div>
    }
}

export default LoginPhone;