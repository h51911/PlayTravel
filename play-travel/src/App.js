import React, {Component ,Suspense, lazy } from "react";

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './css/base.css'
import './scss/App.css';
import './icon/iconfont.css';
import 'antd/dist/antd.css';

import My from './api/myweb';
 const Destination = lazy(() =>import('./pages/Destination'));
 const Discover = lazy(() => import('./pages/Discover'));
 const Mine = lazy(() => import('./pages/Mine'));
 const LoginPhone = lazy(() => import('./pages/Login-phone'));
 const LoginPass = lazy(() => import('./pages/Login-pass'));
 const Account = lazy(() => import('./pages/Account'));
 const SetPass = lazy(() => import('./pages/Set-pass'));
 const Order = lazy(() => import('./pages/Order'));
 const Orderdetail = lazy(() => import('./pages/Orderdetail'));
 const List = lazy(() => import('./pages/List'));
 const Detail = lazy(() => import('./pages/Detail'));
 const Dately = lazy(() => import('./pages/Date'));
 const Person = lazy(() => import('./pages/Person'));
// import { withStorage } from './utils/hoc';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hide: false,
      selecteditem: '/discover',
      menu: [
        {
          name: 'discover',
          path: '/discover',
          text: '发现',
          icon: 'icon-faxian_empy'
        },
        {
          name: 'destination',
          path: '/destination',
          text: '目的地',
          icon: 'icon-mudedi'
        },
        {
          name: 'order',
          path: '/order',
          text: '订单',
          icon: 'icon-icon-contract'
        },
        {
          name: 'mine',
          path: '/mine',
          text: '我的',
          icon: "icon-wode"
        }
      ]

    }
    this.changeMenu = this.changeMenu.bind(this);
  };
  changeMenu(current) {
    let path = this.state.menu[current].path;
    if (path !== this.state.selecteditem) {
      if (!localStorage.getItem("TOKEN") && ['/mine', '/order'].some(val => val === path)) {
        this.props.history.push({ pathname: '/login-phone', query: { from: this.state.selecteditem } })
      } else {
        this.setState({
          selecteditem: path,
          ...this.menu
        })
        this.props.history.push(path);
      }
    }
  }
  isHidden = () => {
    let path = this.props.location.pathname;
    let arr_hide = ['/login-phone', '/login-pass', '/account', '/set-pass',];
    let selecteditem = '/' + path.split('/')[1];
    if (selecteditem === "/list") {
      selecteditem ="/destination"
    }
    // console.log(selecteditem);
    if (arr_hide.some(val => val === path)) {
      if (this.state.hide !== true)
        this.setState({ hide: true });
    } else if (this.state.hide !== false) {
      this.setState({ hide: false });
    }
    // 底部高亮
    if (selecteditem !== this.state.selecteditem) {
      this.setState({ selecteditem});
    }
  };
  isToken = async () => {
    let path = this.props.location.pathname;
    let arr_login = ['/mine', '/order'];
    if (localStorage.getItem("TOKEN")) {
      // 本地已登录
      let { authorization } = JSON.parse(localStorage.getItem("TOKEN"));
      let { data } = await My.post('/users/verify', { token: authorization });
      if (!data.code) {
        localStorage.removeItem("TOKEN");
      }
    } else if (arr_login.some(val => val === path)) {
      this.props.history.push({ pathname: '/login-phone', query: this.props.location.query });
    }
  };
  componentDidMount() {
    // console.log(this);
    this.isHidden();
    this.isToken();
  };
  componentDidUpdate() {
    this.isHidden();
    this.isToken();
    // console.log(this.props.history.location.pathname);
    // let pathname = this.props.history.location.pathname;
    // let selecteditem = '/' + pathname.split('/')[1];
    // console.log(selecteditem);
    // this.setState({
    //   selecteditem
    // })
  }
  render() {
    let { menu, selecteditem, hide } = this.state

    return <div className="app">
      <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path='/destination' component={Destination} />
        <Route path='/discover' component={Discover} />
        <Route path='/mine' component={Mine} />
        <Route path='/login-phone' component={LoginPhone} />
        <Route path='/login-pass' component={LoginPass} />
        <Route path='/order/:id' component={Orderdetail} />
        <Route path='/account' component={Account} />
        <Route path='/set-pass' component={SetPass} />DatelyDately
        <Route path='/order' component={Order} />
        <Route path='/list/:code' component={List} />
        <Route path='/detail/:id' component={Detail} />
        <Route path='/date/:id' component={Dately} />
        <Route path='/person/:id' component={Person} />
        <Route path='/notfound' render={() => <h1>你访问的页面不存在</h1>} />
        <Redirect from='/' to='discover' exact />
        <Redirect to='notfound' />
      </Switch>
      </Suspense>
      <div className={["footer", hide ? 'hide' : 'show'].join(' ')} >
        <ul className="nav-menu">
          {
            menu.map((item, index) => {
              return <li key={item.name} className={selecteditem === item.path ? "active" : ''} onClick={this.changeMenu.bind(this, index)} >
                <span className={'iconfont icon ' + item.icon}></span>
                <span className="font">{item.text}</span>
              </li>
            })
          }

        </ul>
      </div>

    </div >
  }
}
// App = withStorage(withRouter(App));
App = withRouter(App);
export default App;