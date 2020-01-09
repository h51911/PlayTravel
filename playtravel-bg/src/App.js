import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Col, Row, Menu, Icon, Button, PageHeader } from 'antd';

import Goodslist from './pages/goodslist';
import Destination from './pages/destination';
import Order from './pages/orderlist';
import Addgood from './pages/addgoods';

import './scss/App.css';
import 'antd/dist/antd.css';


const { SubMenu } = Menu;
class App extends Component {
  constructor(props) {
    super(props);

    this.onOpenChange = this.onOpenChange.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
  }
  
  state = {
    openKeys: ['sub1'],
    routes :[
      {
        path: '/',
        breadcrumbName: '首页',
      },
      {
        path: '/goodlist',
        breadcrumbName: '项目管理',
      },
      {
        path: '/goodlist',
        breadcrumbName: '项目列表',
      },
    ]
  };
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  
  changeType(current) {
    // console.log(current)
    // console.log(current.item.props.children)
    this.props.history.push(current.key);
    let { routes } = this.state;
    routes[2] = {
      path: current.key,
      breadcrumbName: current.item.props.children,
    };
    this.setState({
      routes
    })
  }

  changeMenu(current) {
    // console.log(current.target.id)
    // console.log(current.target.innerHTML)

    this.props.history.push(current.target.id);
    let { routes } = this.state;
    routes[1] = {
      path: current.target.id,
      breadcrumbName: current.target.innerHTML
    };
    routes[2] = {
      path: '',
      breadcrumbName:''
    };
    this.setState({
      routes
    })
  }

  onOpenChange = openKeys => {
    // console.log(this.state.openKeys.indexOf('sub1'));
    let latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    let {routes}=this.state
    return (
      <div className="App">
        <Row>
          <Col span={4}>
            <Menu
              mode="inline"
              theme='dark'
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              style={{ width:' 100%',fontSize:'24px'}}
            >
              <Menu.Item key="100"
                style={{ height: '50px', fontSize: '20px', color: '#fff' }}
              onClick='none'>
                <Icon type="chrome" style={{ height: '50px', fontSize: '20px', color: '#fff' }}/>
                玩途旅行
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="project" />
                    <span id="/goodlist" onClick={this.changeMenu}>项目管理</span>
                  </span>
                }
              >
                <Menu.Item key="/goodlist" onClick={this.changeType.bind(this)}>项目列表</Menu.Item>
                <Menu.Item key="destination" onClick={this.changeType.bind(this)}>目的地列表</Menu.Item>
                <Menu.Item key="/add" onClick={this.changeType.bind(this)}>增加项目</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="user" />
                    <span id="/user" onClick={this.changeMenu}>用户管理</span>
                  </span>
                }
              >
                <Menu.Item key="5">用户列表</Menu.Item>
                <Menu.Item key="6">添加用户</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="unordered-list" />
                    <span id="/order" onClick={this.changeMenu}>订单管理</span>
                  </span>
                }
              >
                <Menu.Item key="order" onClick={this.changeType.bind(this)}>订单列表</Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
          <Col span={20} style={{display:'flex',flexDirection:'column',height:'100%'}}>
            
            <PageHeader
              title="后台管理系统"
              style={{
                height: '91px',
                border: '1px solid rgb(235, 237, 240)',
              }}
              extra={[
                <Button key="3">退出</Button>,
                <Button key="2">登录</Button>,
                <Button key="1" type="primary">
                  注册
                </Button>,
              ]}
              avatar={{ src: '../favicon.ipg' }}
              breadcrumb={{ routes }}
            >
            </PageHeader>
            <Switch>
              <Route path='/destination' component={Destination} />
              <Route path='/goodlist' component={Goodslist} />
              <Route path='/order' component={Order} />
              <Route path='/add' component={Addgood} />
              <Route path='/notfound' render={() => <h1>你访问的页面不存在</h1>} />
              <Redirect from='/' to='goodlist' exact />
              <Redirect to='notfound' />
            </Switch>
            {/* <Goodslist /> */}
            {/* <Destination /> */}
            {/* <Order /> */}
            {/* <Addgood /> */}
          </Col>
      </Row>
      </div>
      
    );
  }
}

App = withRouter(App)
export default App;
