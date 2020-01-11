import React from 'react';
import { Table } from 'antd';
import My from '../api/myweb'


class Destination extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    data :[],
    columns:[{
            title: 'ID',
            dataIndex: 'pid',
        },
        {
            title: '地区',
            dataIndex: 'title',
        },
        {
            title: '城市',
            dataIndex: 'city',
        },
        {
            title: '城市标示',
            dataIndex: 'code',
        },
    ]
    };
    
    async componentDidMount() {
        let {
            data
        } = await My.get('/area/city');
        // console.log(data);
        let newdata=[];
        data.forEach(item => {
            item.subs.forEach(ite => {
                newdata.push({
                    key: ite.id,
                    pid:ite.pid,
                    title: item.title,
                    city: ite.title,
                   code:ite.code
                })
            })
        })
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
      return (<div id="destination">
          <h2 style={{ fontSize:'20px',textAlign:'left',fontFamily:'楷体',paddingLeft:'10px'}}>玩途旅行目的城市列表</h2>
          <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
      </div>)
          }
    }
    
export default Destination;