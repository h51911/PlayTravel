import React, { Component } from 'react';

import { Route, Swith, Redirect, withRouter } from 'react-router-dom';
import Destination from './pages/Destination';
import Discover from './pages/Discover';
import Mine from './pages/Mine';
import Order from './pages/Order';
import './scss/App.css';
// import './icon/iconfont.css';
// import './icon/iconfont.js';




class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="app">

      <span>你好</span>
    </div>
  }
}

export default App;



