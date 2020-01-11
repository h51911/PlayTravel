import React, { Component } from 'react';
// import { connect } from 'dva';
import myweb from '../api/myweb';

import '../css/base.css';
import '../scss/Person.scss';

import { Form, Input } from 'antd';
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

        this.state={
          data:"",
          man_name:"",
          man_phone:"",
          man_email:"",
          error:[]
        }
        this.name=this.name.bind(this)
        this.phone=this.phone.bind(this)
        this.email=this.email.bind(this)
        this.submit=this.submit.bind(this)
    }


    componentDidMount(){
      let data = JSON.parse(localStorage.getItem('data'));
      this.setState({
         data
      })
    }

    name(a){
      // console.log(a);
      let man_name = a.props.value;
      this.setState({
        man_name
      })

      // let {errors} = (a.props.data-_field)
      let error = a.props["data-__field"].errors
      if(error){
        this.setState({
          error
        })
      }else{
        this.setState({
          error:[]
        })
      }
    }
    phone(b){
      // console.log(b);
      let man_phone = b.props.value;
      this.setState({
        man_phone
      })
      let error = b.props["data-__field"].errors
      if(error){
        this.setState({
          error
        })
      }else{
        this.setState({
          error:[]
        })
      }
    }
    email(c){
      // console.log(c);
      let man_email = c.props.value;
      this.setState({
        man_email
      })
      let error = c.props["data-__field"].errors
      if(error){
        this.setState({
          error
        })
      }else{
        this.setState({
          error:[]
        })
      }
    }

    async submit(){
      let data = JSON.parse(localStorage.getItem('data'));
      let {man_name,man_phone,man_email,error} = this.state;
      if(Boolean(man_name) && Boolean(man_phone) && Boolean(man_email)){
        if(error.length === 1){
          alert('请确认信息是否输入正确！');
        }else{
          data.man_name = man_name;
          data.man_phone = man_phone;
          data.man_email = man_email;
          let res = await myweb.get('/list/addGood',data)
          if(res.code){
            this.props.history.push('/order');
          }
        }
      }else{
        alert('确认信息是否全部输入完成！');
      }
     
    }

    componentWillUnmount = () => {
      this.setState = (state,callback)=>{
        return;
      };
    }

    render(){
        const { form } = this.props;
        const { getFieldDecorator,getFieldError,isFieldTouched} = form;
        const usernameError = isFieldTouched('username')&&getFieldError('username');
        const phoneError = isFieldTouched('phone')&&getFieldError('phone');
        const emailError = isFieldTouched('email')&&getFieldError('email');

        let {product_name,total,tour_date,man_num} =this.state.data

        return(
            <div className="person">
                {/* 订单信息展示 */}
                <div className="msg">
                    <p className="fz36">{product_name}</p>
                    <p className="disfx mgb">
                        <span className="disb mgr fz18 gray width200">套餐选择:</span>
                        <span className="disb fz18 lh30 black">{product_name}</span>
                    </p>
                    <p className="mgb">
                        <span className="mgr gray fz18">观看演出日期:</span>
                        <span className="black fz18">{tour_date}</span>
                    </p>
                    <p className="mgb">
                        <span className="mgr gray fz18">购买数量:</span>
                        <span className="black fz18">{man_num}人</span>
                    </p>
                </div>


                {/* 联系人信息 */}
                <div className="personMsg">
                <p>请输入联系人信息</p>
                <Form {...formItemLayout} >
                    <Form.Item  
                    hasFeedback
                    validateStatus={usernameError?'error':''}
                    help={usernameError?'请输入姓名':''}
                    // getFieldValue={this.value}
                    // onBlur={this.name}
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
                        ref={el => {this.username = el}}
                        onBlur={this.name.bind(this,this.username)}
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
                        ref={el => {this.phonenum = el}}
                        onBlur={this.phone.bind(this,this.phonenum)}
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
                        ref={el => {this.emails = el}}
                        onBlur={this.email.bind(this,this.emails)}
                      />,
                    )}
                    </Form.Item>
                </Form>

                </div>

                {/* 立即购买 */}
                <div className="buyNow">
                    <div className="advisory">
                    <p>{(total * man_num).toFixed()}</p>
                    <p>费用明细</p>
                    </div>
                    <div className="buy" onClick={this.submit}>
                        提交订单
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