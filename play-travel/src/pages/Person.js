import React, { Component } from 'react';
// import { connect } from 'dva';

import '../css/base.css';
import '../scss/Person.scss';

import { Icon,Form, Input } from 'antd';
import 'antd/dist/antd.css';

// const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = Form;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};




class Person extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const { form } = this.props;
        const { getFieldDecorator,getFieldError,getFieldsError,isFieldTouched} = form;
        const usernameError = isFieldTouched('username')&&getFieldError('username');
        const phoneError = isFieldTouched('phone')&&getFieldError('phone');
        const emailError = isFieldTouched('email')&&getFieldError('email');
        return(
            <div className="person">
                {/* 订单信息展示 */}
                <div className="msg">
                    <p className="fz32">上海迪士尼乐园门票(电子票)</p>
                    <p className="disfx mgb">
                        <span className="disb mgr fz18 gray width160">套餐选择:</span>
                        <span className="disb fz18 lh30 black">迪士尼乐园(一日票)迪士尼乐园(一日票)迪士尼乐园(一日票)迪士尼乐园(一日票)</span>
                    </p>
                    <p className="mgb">
                        <span className="mgr gray fz18">观看演出日期:</span>
                        <span className="black fz18">2020-01-16</span>
                    </p>
                    <p className="mgb">
                        <span className="mgr gray fz18">购买数量:</span>
                        <span className="black fz18">1人</span>
                    </p>
                </div>


                {/* 联系人信息 */}
                <div>
                <p>请输入联系人信息</p>
                <Form {...formItemLayout} >
                    <Form.Item  
                    hasFeedback
                    validateStatus={usernameError?'error':''}
                    help={usernameError?'请输入姓名':''}
                    // extra={phoneError?'请输入姓名':''}
                    >
                    {getFieldDecorator('username', {
                      rules: [
                          { required: true, message: '请输入姓名!' }
                    ],
                    })(
                      <Input
                        placeholder="请输入联系人姓名"
                        // style={{padding:'vw(40)'}}
                        id="username"
                      />,
                    )}
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      validateStatus={phoneError?'error':''}
                      help={phoneError?'请输入正确的手机号!':''}
                    >
                      {getFieldDecorator('phone', {
                      rules: [
                          { required: true, message: '请输入手机号!' },
                          {pattern:/^1[3456789]\d{9}$/,message: '请输入正确的手机号!'}
                    ],
                    })(
                      <Input
                        placeholder="请输入手机号码"
                        id="phone"
                      />,
                    )}
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      validateStatus={emailError?'error':''}
                      help={emailError?'请输入正确的邮箱地址!':''}
                    >
                      {getFieldDecorator('email', {
                      rules: [
                          { required: true, message: '请输入邮箱!' },
                          {pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,message: '请输入正确的邮箱地址!'}
                    ],
                    })(
                      <Input
                        placeholder="请输入邮箱地址"
                        id="email"
                      />,
                    )}
                    </Form.Item>
                </Form>

                </div>

                {/* 立即购买 */}
                <div className="buyNow">
                    <div className="advisory">
                    <Icon type="message" />
                    <p>咨询</p>
                    </div>
                    <div className="buy" onClick={this.click}>
                        立即购买
                    </div>
                </div>
            </div>
        )
    }
}

// Person.propTypes = {
// };

const page = Form.create()(Person);
// export default connect()(page);
export default page;