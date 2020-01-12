import React, { Component } from 'react';
import My from '../api/myweb'
import { Table, Input, InputNumber, Popconfirm, Form, message } from 'antd';
// import EditableCell from '../components/EditableCell';


const EditableContext = React.createContext();
class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}
function cancelDel() { message.info('取消删除'); }
class Users extends Component {
    state = {
        selectedRowKeys: [],
        data: [],
        editingKey: ''
    };
    columns = [
        {
            title: '用户ID',
            dataIndex: 'account',
            width: '20%',
            editable: true,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            width: '20%',
            editable: true,
        },
        {
            title: '密码',
            dataIndex: 'password',
            width: '20%',
            editable: true,
        },
        {
            title: 'email',
            dataIndex: 'email',
            width: '20%',
            editable: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                const { editingKey } = this.state;
                const editable = this.isEditing(record);
                return editable ? (
                    <span>
                        <EditableContext.Consumer>
                            {form => (
                                <span onClick={() => this.save(form, record.key)}
                                    style={{ marginRight: 8, color: '#55f', cursor: 'pointer' }}
                                >保存</span>
                            )}
                        </EditableContext.Consumer>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                            <span style={{ color: '#55f', cursor: 'pointer' }}>取消</span>
                        </Popconfirm>
                    </span>
                ) : (<>
                    <span disabled={editingKey !== ''}
                        onClick={() => this.edit(record.key)}
                        style={{ color: '#55f', cursor: 'pointer' }}>编辑</span>
                    <Popconfirm
                        title="是否删除本条数据?"
                        onConfirm={() => this.delete(record.key)}
                        onCancel={cancelDel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span style={{ color: '#55f', cursor: 'pointer', marginLeft: '10px' }} >删除</span>
                    </Popconfirm>

                </>);
            },
        },
    ];
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };
    save(form, key) {
        form.validateFields(async (error, row) => {
            if (error) {
                return;
            }
            // 数据库修改
            let { data: edit } = await My.post('/users/edit', row);
            if (edit.code)
                message.success(edit.message);
            else
                message.error('数据库修改失败');
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }
    async delete(key) {
        // this.setState({ editingKey: key });
        // console.log(key, this.state.data);
        let data = this.state.data;
        let newdata = data.filter((item, idx) => key !== item.key);
        let deldata = data.filter((item, idx) => key === item.key);
        // console.log(deldata);
        // 数据库删除
        let { data: del } = await My.post('/users/del', { phone: deldata[0].phone });
        if (del.code) {
            // 本地删除
            this.setState({ data: newdata });
            message.success(del.message);
        }
        else
            message.error('删除失败');
    }

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
        this.setState({ data: newdata });
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
        const components = {
            body: { cell: EditableCell }
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <div id="userslist" >
                <h2 style={{ fontSize: '20px', textAlign: 'left', fontFamily: '楷体', paddingLeft: '10px' }}>玩途旅行用户列表</h2>
                <EditableContext.Provider value={this.props.form} >
                    <Table
                        components={components}
                        bordered
                        rowSelection={rowSelection}
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            pageSize: 7,
                            onChange: this.cancel,
                        }}
                    />
                </EditableContext.Provider>
            </div>
        )
    }
}
export default Form.create()(Users);