import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';

import './scss/App.css';
import 'antd/dist/antd.css';

class App extends Component {
  token = () => {
    let path = this.props.location.pathname;
    if (!localStorage.getItem("TOKEN") && !/^\/login$/.test(path))
      this.props.history.push('/login');
  }
  componentDidMount() {
    this.token();
  }
  componentDidUpdate() {
    this.token();
  }
  render() {
    let token = localStorage.getItem("TOKEN");
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/notfound' render={() => <h1>你访问的页面不存在</h1>} />
          <Redirect from='/' to={token ? 'home' : 'login'} exact />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

App = withRouter(App);
export default App;
