import React from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import '../scss/add-user.css';
import My from '../api/myweb';

class AddUser extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { phone, password, email } = values;
                let data = await My.get('/users/check', { phone });
                // console.log(data);
                if (data.code) {
                    let { data: reg } = await My.post('/users/reg', {
                        account: phone, phone, password, email
                    });
                    if (reg.code) {
                        message.info("新用户添加成功！");
                        this.props.form.resetFields();
                    } else
                        message.error("error：注册失败");
                } else
                    message.error("用户名已存在");
            }

        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };
    componentWillUnmount() {
        this.setState = (state, callback) => { return; }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="add-user" style={{}}>
                <h2 style={{ fontSize: '20px', textAlign: 'left', fontFamily: '楷体', paddingLeft: '10px' }}>添加新用户</h2>
                <Form style={{ width: '300px', margin: '0 auto' }} onSubmit={this.handleSubmit}  >
                    <Form.Item label="用户名" >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                                prefix={<Icon type="user-add" style={{ color: 'rgba(0,0,0,.5)' }} />}
                                placeholder="Name"
                                maxLength={11}
                                autoComplete="off"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="密码" >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
                                type="password"
                                placeholder="Password"
                                maxLength={16}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', {
                            rules: [{ type: 'email', message: '邮箱格式不正确' }],
                        })(
                            <Input
                                prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.5)' }} />}
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit">添加项目</Button>
                        <Button type="danger" style={{ marginLeft: '20px' }} onClick={this.handleReset}>重置</Button>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}

export default Form.create()(AddUser);