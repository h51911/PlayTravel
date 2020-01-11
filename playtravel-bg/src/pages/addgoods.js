import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import myweb from '../api/myweb';

class Addgood extends React.Component {
    state = {
      product_id:"",
      cn_name:"",
      alias:"",
      min_price:"",
      from_date:"",
      to_date:"",
      priceError:true,
      start:"",
      end:""
    };

    id=(e)=>{
      this.setState({
        product_id:e.target.value
      })
    }
    city=(e)=>{
      this.setState({
        cn_name:e.target.value
      })
    }
    play=(e)=>{
      this.setState({
        alias:e.target.value
      })
    }
    price=(e)=>{
      let reg = new RegExp(/^([1-9][0-9]*)+(.[0-9]{1,2})?$/)
      if(reg.test(e.target.value)){
        this.setState({
          min_price:e.target.value,
          priceError:true
        })
      }else{
        this.setState({
          min_price:"",
          priceError:false
        })
      }
      
    }
    startDate=(date,datestring)=>{
      this.setState({
        from_date:datestring,
        start:date['_d']
      })
    }
    endDate=(date,datestring)=>{
      this.setState({
        to_date:datestring,
        end:date['_d']
      })
    }

    submit=()=>{
      let {product_id,cn_name,alias,min_price,from_date,to_date,priceError,start,end} = this.state;
      if(product_id && cn_name && alias && min_price && from_date && to_date){
        if(priceError){
          if(end-start){
            let result = myweb.get('/list/addPro',{
              product_id,
              cn_name,
              alias,
              min_price,
              from_date,
              to_date
            })
            if(result){
              this.setState({
                product_id:"",
                cn_name:"",
                alias:"",
                min_price:"",
                from_date:"",
                to_date:""
              })
            }else{
              alert('提交错误，请重新提交');
            }
          }else{
            alert('结束时间应在开始时间以后，请重新确认并提交');
          }
        }else{
          alert('价格格式输入不正确，请输入非零开头的最多带两位小数的数字');
        }
      }else{
        alert('请将信息填写完整');
      }
    }

    reset=()=>{
      this.setState({
        product_id:"",
        cn_name:"",
        alias:"",
        min_price:"",
        from_date:"",
        to_date:""
      })
    }
    
    render() {
        return (
            <div id="addgood">
                <h2 style={{ fontSize: '20px', textAlign: 'left', fontFamily: '楷体', paddingLeft: '10px' }}>添加游玩项目</h2>
                <Form style={{ padding: '12px' }} >
                    <Form.Item
                        style={{ display: 'flex' }}
                        label="ID"
                    // validateStatus="error"
                    // help="Should be combination of numbers & alphabets"
                    >
                        <Input 
                        placeholder="输入项目id" 
                        id="error1" 
                        style={{ width: '500px' }} 
                        value={this.state.product_id}
                        onChange={e=>this.id(e)}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ display: 'flex' }}
                        label="城市"
                    // validateStatus="error"
                    // help="Should be combination of numbers & alphabets"
                    >
                        < Input placeholder="输入游玩城市"
                            id="error2"
                            style={{ width: '500px' }}
                            onChange={e=>this.city(e)}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ display: 'flex' }}
                        label="项目"
                    // validateStatus="error"
                    // help="Should be combination of numbers & alphabets"
                    >
                        < Input placeholder="输入游玩项目"
                            id="error3"
                            style={{ width: '500px' }}
                            onChange={e=>this.play(e)}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ display: 'flex' }}
                        label="价格"
                    // validateStatus="error"
                    // help="Should be combination of numbers & alphabets"
                    >
                        < Input placeholder="输入项目价格"
                            id="error4"
                            style={{ width: '500px' }}
                            onChange={e=>this.price(e)}
                        />
                    </Form.Item>
                    <Form.Item label="日期" style={{ marginBottom: 0, display: 'flex' }}>
                        <Form.Item
                            // validateStatus="error"
                            // help="Please select the correct date"
                            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                        >
                            <DatePicker onChange={this.startDate} />
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                            <DatePicker onChange={this.endDate} />
                        </Form.Item>
                    </Form.Item>
                    <Button type="primary" block style={{ width: '250px' }} onClick={this.submit}>
                        添加项目
                </Button>
                    <Button type="danger" onClick={this.reset} block style={{ width: '250px', marginLeft: '20px' }}>
                        重置
                </Button>
                </Form>
            </div>
        );
    }
}

export default Addgood;