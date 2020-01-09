import React, { Component } from 'react';
import My from '../api/myweb'
import {
    Table
} from 'antd';

import 'antd/dist/antd.css';



class Order extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        data: [],
        columns : [{
                title: 'ID',
                dataIndex: 'product_id',
            },
            {
                title: '用户',
                dataIndex: 'user',
            },
            {
                title: '项目',
                dataIndex: 'alias',
            },
            {
                title: '价格',
                dataIndex: 'min_price',
            },
            {
                title: '订单时间',
                dataIndex: 'from_date',
            },
            {
                title: '订单生成时间',
                dataIndex: 'to_date',
            },
        ]
    };

    async componentDidMount() {
        let {
            data
        } = await My.get('/home/order');
        // console.log(data);
        let newdata=[];
        data.forEach((item,idx) => {
                    newdata.push({
                        key: idx,
                        product_id: item.product_id,
                        user: item.user,
                        alias: item.product_name,
                        min_price: item.total,
                        to_date: item.date_added,
                        from_date: item.tour_date
                    })
        })
        // console.log(newdata)
        this.setState({
            data: newdata,
        })
        
    }

    onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
            });
          },
        },
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
        return (
            < div id = "orderlist" >
                <h2 style={{ fontSize:'20px',textAlign:'left',fontFamily:'楷体',paddingLeft:'10px'}}>玩途旅行订单列表</h2>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />;
            </div>
        )
    }
}
export default Order;