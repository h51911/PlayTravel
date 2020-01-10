import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';


class Addgood extends React.Component {
    state = {
        dataSource: [],
    };

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
                        <Input placeholder="输入项目id" id="error1" style={{ width: '500px' }} />
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
                        />
                    </Form.Item>
                    <Form.Item label="日期" style={{ marginBottom: 0, display: 'flex' }}>
                        <Form.Item
                            // validateStatus="error"
                            // help="Please select the correct date"
                            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                        >
                            <DatePicker />
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                            <DatePicker />
                        </Form.Item>
                    </Form.Item>
                    <Button type="primary" block style={{ width: '250px' }}>
                        添加项目
                </Button>
                    <Button type="danger" block style={{ width: '250px', marginLeft: '20px' }}>
                        重置
                </Button>
                </Form>
            </div>
        );
    }
}

export default Addgood;