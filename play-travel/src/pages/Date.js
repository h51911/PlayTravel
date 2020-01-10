import React, { Component } from 'react';
import moment from 'moment';

import '../css/base.css';
import '../scss/Date.scss';

import { Icon, Calendar, Alert } from 'antd';
import 'antd/dist/antd.css'



class Dately extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: moment(),
      selectedValue: moment(),
      num: 1,
      id:""
    }

    this.onSelect = this.onSelect.bind(this)
    this.onPanelChange = this.onPanelChange.bind(this)
    this.cutNum = this.cutNum.bind(this)
    this.addNum = this.addNum.bind(this)
    this.onChange = this.onChange.bind(this)
    this.click = this.click.bind(this)
  }
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  //   加
  addNum() {
    let num = this.state.num;
    num++;
    this.setState({
      num
    })
  }

  //   减
  cutNum() {
    let num = this.state.num;
    num--;
    if (num <= 1) {
      num = 1;
      this.setState({
        num
      })
    } else {
      this.setState({
        num
      })
    }
  }

  onChange() {
    console.log(this.state.num);
  }

  click() {
    console.log(this.state.num);
    console.log(this.state.selectedValue.format('YYYY-MM-DD'));
  }

  click(){
    console.log(this.state.num);
    console.log(this.state.selectedValue.format('YYYY-MM-DD'));
    let data = JSON.parse(localStorage.getItem('data'))
    data.man_num = this.state.num;
    data.tour_date = this.state.selectedValue.format('YYYY-MM-DD');

    localStorage.setItem('data',JSON.stringify(data));
    let {match:{params}} = this.props;
    this.props.history.push('/person/'+params.id)
    
  }
  componentDidMount() {
    //   获取当前日期
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    let value = moment(`${currentdate}`);
    this.setState({
      value
    })
  }

  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}

  render() {
    const { value, selectedValue, num } = this.state;
    return (
      <div className="date">

        {/* 选择人数 */}
        <div className="population">
          <div>
            请选择出行人数
                    </div>
          <div>
            <Icon type="minus-circle" onClick={this.cutNum} />
            <input type="text" value={num} onChange={this.onChange} />
            <Icon type="plus-circle" onClick={this.addNum} />
          </div>
        </div>

        {/* 日历 */}
        <div className="calendar">
          <Alert
            message={`你选择的日期为: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
          />
          <Calendar
            value={value}
            onSelect={this.onSelect}
            onPanelChange={this.onPanelChange}
          />
        </div>

        {/* 立即购买 */}
        <div className="buyNow">
          <div className="advisory">
            <Icon type="message" />
            <p>咨询</p>
          </div>
          <div className="buy" onClick={this.click}>
          下一步
          </div>
        </div>
      </div>
    )
  }
}


export default Dately;