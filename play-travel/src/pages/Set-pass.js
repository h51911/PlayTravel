import React, { Component } from 'react';
import My from '../api/myweb';

import { Icon, Input, message } from 'antd';
import '../scss/mine.scss';

class SetPass extends Component {
    state = {
        password: '',
        newpass: '',
        confimpass: '',
        focus0: false,
        focus1: false,
        focus2: false
    };
    // 输入用户名和密码
    inputPass = (ev) => { this.setState({ password: ev.target.value }); };
    inputNewPass = (ev) => { this.setState({ newpass: ev.target.value }); };
    inputConfimPass = (ev) => { this.setState({ confimpass: ev.target.value }); };
    // 获取焦点
    focus0 = () => {
        this.password.focus();
        this.setState({ focus0: true });
    };
    focus1 = () => {
        this.newpass.focus();
        this.setState({ focus1: true });
    };
    focus2 = () => {
        this.confimpass.focus();
        this.setState({ focus2: true });
    };
    // 失去焦点
    blur0 = () => { this.setState({ focus0: false }); };
    blur1 = () => { this.setState({ focus1: false }); };
    blur2 = () => { this.setState({ focus2: false }); };
    // 修改密码
    setPass = async () => {
        if (this.state.password) {
            if (this.state.newpass) {
                if (this.state.confimpass) {
                    if (this.state.confimpass === this.state.newpass) {
                        let phone = JSON.parse(localStorage.getItem("TOKEN")).account;
                        let { data: verify } = await My.post('/users/pass', { phone, password: this.state.password });
                        if (verify.code) {
                            let { data: edit } = await My.post('/users/edit', { phone, password: this.state.newpass });
                            if (edit.code) {
                                message.success("修改成功，请重新登录");
                                this.props.history.push('/login-pass');
                            } else
                                message.error("error：修改失败");
                        } else
                            message.error("原密码不正确");
                    } else
                        message.error("新密码与确认密码不一致");
                } else
                    message.error("请确认密码");
            } else
                message.error("请输入新年密码");
        } else
            message.error("请输入原密码");
    }
    render() {
        let { password, newpass, confimpass, focus0, focus1, focus2 } = this.state;
        return (<div className="set-pass">
            <header className="login-header">
                <div className="link"><Icon type="left" /></div>
                <h1 className="h1">密码更改</h1>
            </header>
            <main>
                <div className="set-info">
                    <div className="text-field">
                        <label className="label" onClick={this.focus0} >
                            <p className={password || focus0 ? 'text float' : 'text'}>原密码</p>
                            <Input.Password
                                maxLength={16}
                                allowClear
                                value={password}
                                ref={ele => this.password = ele}
                                onChange={this.inputPass}
                                onBlur={this.blur0} />
                        </label>
                    </div>
                    <div className="text-field">
                        <label className="label" onClick={this.focus1} >
                            <p className={newpass || focus1 ? 'text float' : 'text'}>请输入新密码</p>
                            <Input.Password
                                maxLength={16}
                                allowClear
                                value={newpass}
                                ref={ele => this.newpass = ele}
                                onChange={this.inputNewPass}
                                onBlur={this.blur1} />
                        </label>
                    </div>
                    <div className="text-field">
                        <label className="label" onClick={this.focus2} >
                            <p className={confimpass || focus2 ? 'text float' : 'text'}>确认密码</p>
                            <Input.Password
                                maxLength={16}
                                allowClear
                                value={confimpass}
                                ref={ele => this.confimpass = ele}
                                onChange={this.inputConfimPass}
                                onBlur={this.blur2} />
                        </label>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}><span className="set-submit" onClick={this.setPass}>提交</span></div>
            </main>
        </div>)
    }
}
export default SetPass;