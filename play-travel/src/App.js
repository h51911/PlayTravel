import React, { Component } from 'react';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Destination from './pages/Destination';
import Discover from './pages/Discover';
import Mine from './pages/Mine';
import LoginPhone from './pages/Login-phone';
import LoginPass from './pages/Login-pass';
import Account from './pages/Account';
import SetPass from './pages/Set-pass';
import Order from './pages/Order';
import Orderdetail from './pages/Orderdetail';
import List from './pages/List';
import Detail from './pages/Detail';
import Dately from './pages/Date';
import './css/base.css'
import './scss/App.css';
import './icon/iconfont.css';
 

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
      this.setState({
        selecteditem: path,
        ...this.menu
      })
      this.props.history.push(path);
    }
  }
  isHidden = () => {
    let path = this.props.location.pathname;
    let arr_hide = ['/login-phone', '/login-pass', '/account', '/set-pass'];
    if (arr_hide.some(val => val === path)) {
      if (this.state.hide !== true)
        this.setState({ hide: true });
    } else if (this.state.hide !== false) {
      this.setState({ hide: false });
      if (path !== this.state.selecteditem)
        this.setState({ selecteditem: path });
    }

  }
  componentDidMount() {
    this.isHidden();
  };
  componentDidUpdate() {
    this.isHidden();
  }
  render() {
    let { menu, selecteditem, hide } = this.state

    return <div className="app">
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
        <Route path='/list' component={List} />
        <Route path='/detail' component={Detail} />
        <Route path='/date' component={Dately} />
        <Route path='/notfound' render={() => <h1>你访问的页面不存在</h1>} />
        <Redirect from='/' to='discover' exact />
        <Redirect to='notfound' />
      </Switch>
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
App = withRouter(App)
export default App;



