import React, { Component } from 'react';
import My from '../api/myweb';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import '../scss/login.css';

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { name, psw, keep } = values;
                let { data } = await My.post('/admin/login', { name, psw, keep });
                if (data.code) {
                    localStorage.setItem('TOKEN_WANTU_BG', JSON.stringify({
                        admin: name,
                        isLogin: true,
                        authorization: data.authorization
                    }));
                    message.success('登录成功!');
                    this.props.history.push('/home');
                } else
                    message.error('用户名或密码错误');
            }
        });
    };
    componentWillUnmount() {
        this.setState = (state, callback) => { return; }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return <div id="login">
            <h1>玩途旅行 - 后台管理系统</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
                            placeholder="Name"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('psw', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('keep', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox className="f5">记住密码</Checkbox>)}
                    <span className="login-form-forgot f5"> 忘记密码？ </span>
                    <Button type="primary" htmlType="submit" className="login-form-button"> 登录 </Button>
                </Form.Item>
            </Form>
        </div>
    }
}

export default Form.create()(Login);