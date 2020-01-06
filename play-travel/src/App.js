import React, { Component } from 'react';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Destination from './pages/Destination';
import Discover from './pages/Discover';
import Mine from './pages/Mine';
import Order from './pages/Order';
import './css/base.css'
import './scss/App.css';
import './icon/iconfont.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

    this.setState({
      selecteditem: path,
      ...this.menu
    })
    this.props.history.push(path);
  }

  render() {
    let { menu, selecteditem } = this.state

    return <div className="app">

      <Switch>
        <Route path='/destination' component={Destination} />
        <Route path='/discover' component={Discover} />
        <Route path='/mine' component={Mine} />
        <Route path='/order' component={Order} />
        <Route path='/notfound' render={() => <h1>你访问的页面不存在</h1>} />
        <Redirect from='/' to='discover' exact />
        <Redirect to='notfound' />
      </Switch>

      <div className="footer">
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



