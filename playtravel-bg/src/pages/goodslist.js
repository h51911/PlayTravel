import React, { Component } from 'react';
import My from '../api/myweb'
import {
    Table
} from 'antd';

import 'antd/dist/antd.css';



class Goods extends Component{
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        data: [],
        columns : [{
                title: 'ID',
                dataIndex: 'product_id',
            },
            {
                title: '城市',
                dataIndex: 'cn_name',
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
                title: '项目开始时间',
                dataIndex: 'from_date',
            },
            {
                title: '项目截止时间',
                dataIndex: 'to_date',
            },
        ]
    };

    async componentDidMount() {
        let {
            data
        } = await My.get('/list');
        // console.log(data);
        let newdata=[];
        data.forEach(item => {
            if (item.products) {
                item.products.forEach(ite => {
                    newdata.push({
                        key: ite.product_id,
                        product_id: ite.product_id,
                        cn_name: item.cn_name,
                        alias: ite.alias,
                        min_price: ite.min_price,
                        to_date: ite.to_date,
                        from_date: ite.from_date
                    })
                })
            }
            
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
            <div id="goodslist">
                <h2 style={{ fontSize:'20px',textAlign:'left',fontFamily:'楷体',paddingLeft:'10px'}}>玩途旅行项目列表</h2>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />;
            </div>
        )
    }
}
export default Goods;