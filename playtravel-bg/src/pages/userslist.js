import React, { Component } from 'react';
import My from '../api/myweb'
import { Table } from 'antd';

import 'antd/dist/antd.css';



class Users extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        data: [],
        columns: [{
            title: '用户ID',
            dataIndex: 'account',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '密码',
            dataIndex: 'password',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        ]
    };

    async componentDidMount() {
        let { data } = await My.get('/users');
        // console.log(data);
        let newdata = [];
        data.forEach((item, idx) => {
            newdata.push({
                key: idx,
                account: item.phone,
                phone: item.phone,
                password: item.password,
                email: item.email
            })
        })
        // console.log(newdata)
        this.setState({
            data: newdata,
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => { return; }
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
            <div id="userslist">
                <h2 style={{ fontSize: '20px', textAlign: 'left', fontFamily: '楷体', paddingLeft: '10px' }}>玩途旅行用户列表</h2>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />;
            </div>
        )
    }
}
export default Users;